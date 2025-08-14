import {
  DEFAULT_FONT_STATE,
  DEFAULT_MOVEMENT_FUNCTION_KEY,
  DEFAULT_PARTICLE_COLOR,
  DEFAULT_PARTICLE_COLORS,
  DEFAULT_PARTICLE_RADIUS,
  DEFAULT_PARTICLES_TEXT,
  DEFAULT_START_POSITION,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_DELAY,
  DEFAULT_ENABLE_BUBBLES,
  DEFAULT_ENABLE_IMAGE_PARTICLES,
  DEFAULT_ENABLE_STATIC_MODE,
  DEFAULT_PARTICLE_GAP,
  DEFAULT_SIZE_INTERPOLATION_PERCENTAGE,
  DEFAULT_INTERPOLATION_OFFSET,
  DEFAULT_SIZE_INTERPOLATION_MAX,
  BUBBLE_PARTICLE_LIFETIME,
} from './constants';
import {
  Particle,
  BubbleParticle,
  StartPositionType,
  Action,
  WorkerAction,
  AppProps,
  Dimensions,
  MainThreadMessage,
  InitializeMessagePayload,
  TextBoundaries,
} from './interfaces';
import {getPredefinedMovementOptions} from './movement';
import {
  formatCode,
  getStartCoordinatesConfig,
  getTextBoundaries,
  getValidImageBlocks,
  getColorFromProgressCyclic,
} from './utils';
import {
  updateBubblePosition,
  isBubbleExpired,
  createBubbleParticles,
  drawBubble,
  drawParticle,
  isParticleAtTarget,
} from './particle-utils';
import {effectOptions} from './animation-utils/animation-config';

let customMovementFunction: (
  particle: Particle,
  animationStartTime: number,
  requestAnimationFrameTime: number,
  canvasDimensions: Dimensions,
  animationDuration: number,
  textBoundaries: TextBoundaries,
) => void;

const defaultAppProps: AppProps = {
  particleRadius: DEFAULT_PARTICLE_RADIUS,
  startPosition: DEFAULT_START_POSITION,
  selectedMovementFunction: DEFAULT_MOVEMENT_FUNCTION_KEY,
  selectedEffect: null,
  effectConfigurations: {
    SUPER_SWIRL: effectOptions.SUPER_SWIRL.defaultConfig,
    BUILD: effectOptions.BUILD.defaultConfig,
    OPPENHEIMER: effectOptions.OPPENHEIMER.defaultConfig,
    SCANNING: effectOptions.SCANNING.defaultConfig,
    EXPLOSION: effectOptions.EXPLOSION.defaultConfig,
    HELIX_SPIRAL: effectOptions.HELIX_SPIRAL.defaultConfig,
  },
  movementFunctionCode:
    getPredefinedMovementOptions()[DEFAULT_MOVEMENT_FUNCTION_KEY].code,
  text: DEFAULT_PARTICLES_TEXT,
  font: DEFAULT_FONT_STATE,
  particleColors: DEFAULT_PARTICLE_COLORS,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  delay: DEFAULT_DELAY,
  enableBubbles: DEFAULT_ENABLE_BUBBLES,
  enableImageParticles: DEFAULT_ENABLE_IMAGE_PARTICLES,
  enableStaticMode: DEFAULT_ENABLE_STATIC_MODE,
  particleGap: DEFAULT_PARTICLE_GAP,
  sizeInterpolationPercentage: DEFAULT_SIZE_INTERPOLATION_PERCENTAGE,
  interpolationOffset: DEFAULT_INTERPOLATION_OFFSET,
  sizeInterpolationMax: DEFAULT_SIZE_INTERPOLATION_MAX,
};

const workerState: {
  // Internal worker state
  workerParticles: Particle[];
  bubbleParticles: BubbleParticle[];
  imageBitmap: ImageBitmap | null;
  animationFrameId: number;
  frameCanvas: OffscreenCanvas | null;
  frameContext: OffscreenCanvasRenderingContext2D | null;
  mainCanvas: OffscreenCanvas | null;
  mainContext: ImageBitmapRenderingContext | null;
  validBlocks: Uint8Array<ArrayBuffer> | null;
  blockHeight: number;
  blockWidth: number;
  textBoundaries: TextBoundaries | null;
  // Main thread facing props
  appProps: AppProps;
  revealProgress: number;
} = {
  workerParticles: [],
  bubbleParticles: [],
  imageBitmap: null,
  animationFrameId: 0,
  frameCanvas: null,
  frameContext: null,
  mainCanvas: null,
  mainContext: null,
  validBlocks: null,
  blockHeight: 0,
  blockWidth: 0,
  appProps: defaultAppProps,
  revealProgress: 0,
  textBoundaries: null,
};

let startCoordinatesConfig: ReturnType<typeof getStartCoordinatesConfig>;

const initializeCanvas = async (canvas: OffscreenCanvas) => {
  workerState.mainCanvas = canvas;
  workerState.mainContext = workerState.mainCanvas.getContext(
    'bitmaprenderer'
  ) as ImageBitmapRenderingContext;

  workerState.frameCanvas = new OffscreenCanvas(
    workerState.mainCanvas.width,
    workerState.mainCanvas.height
  );
  workerState.frameContext = workerState.frameCanvas.getContext('2d', {
    willReadFrequently: true,
  })! as OffscreenCanvasRenderingContext2D;
};

const initialize = (data: InitializeMessagePayload) => {
  const {imageBitmap: _imageBitmap, canvas, dimensions, appProps} = data;
  workerState.imageBitmap = _imageBitmap;

  if (Object.keys(appProps).length) {
    const fontWithFallback = {...appProps.font, textColor: appProps.font.textColor ?? DEFAULT_FONT_STATE.textColor};
    workerState.appProps = {...defaultAppProps, ...appProps, font: fontWithFallback};
  };

  initializeCanvas(canvas);
  workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
  const {
    validBlocks: _validBlocks,
    blockHeight: _blockHeight,
    blockWidth: _blockWidth,
  } = getValidImageBlocks(
    workerState.frameContext!.getImageData(
      0,
      0,
      workerState.mainCanvas!.width,
      workerState.mainCanvas!.height
    ),
    workerState.appProps.particleRadius
  );

  workerState.textBoundaries = getTextBoundaries(workerState.workerParticles, workerState.appProps.particleRadius);

  workerState.validBlocks = _validBlocks;
  workerState.blockHeight = _blockHeight;
  workerState.blockWidth = _blockWidth;
  startCoordinatesConfig = getStartCoordinatesConfig({dimensions});

  workerState.workerParticles = generateParticles({
    validBlocks: workerState.validBlocks,
    radius: workerState.appProps.particleRadius,
    blockHeight: workerState.blockHeight,
    blockWidth: workerState.blockWidth,
    startPosition: workerState.appProps.startPosition,
    delay: workerState.appProps.delay,
  });
};



// Update generation to sort particles by X position for left-to-right reveal
const generateParticles = ({
  validBlocks,
  radius,
  blockHeight,
  blockWidth,
  startPosition,
  delay,
}: {
  validBlocks: Uint8Array<ArrayBuffer>;
  radius: number;
  blockHeight: number;
  blockWidth: number;
  startPosition: StartPositionType;
  delay: number;
}) => {
  const particles: Array<Particle> = [];

  for (let blockY = 0; blockY < blockHeight; blockY++) {
    for (let blockX = 0; blockX < blockWidth; blockX++) {
      const index = blockY * blockWidth + blockX;
      if (validBlocks[index]) {
        const x = blockX * radius;
        const y = blockY * radius;

        const particleDelay = Math.round(Math.random() * delay);

        const {x: initialX, y: initialY} =
          startCoordinatesConfig[startPosition as StartPositionType]();

        particles.push({
          targetX: x,
          targetY: y,
          x: initialX,
          y: initialY,
          initialX,
          initialY,
          scale: 1,
          opacity: 1,
          delay: particleDelay,
          color: DEFAULT_PARTICLE_COLOR,
          revealProgress: 0,
          revealThreshold: 0.97 + Math.random() * 0.02, // Between 0.97 and 0.99
          reachedTarget: false,
          emittedBubbles: false,
        });
      }
    }
  }

  return particles;
};



const renderBubbleParticles = (requestAnimationFrameTime: number) => {
  for (let i = workerState.bubbleParticles.length - 1; i >= 0; i--) {
    const bubble = workerState.bubbleParticles[i];

    updateBubblePosition(bubble);
    drawBubble({
      bubble,
      requestAnimationFrameTime,
      context: workerState.frameContext!,
      particleColors: workerState.appProps.particleColors,
    });

    // Remove dead bubbles
    if (isBubbleExpired(bubble, requestAnimationFrameTime)) {
      workerState.bubbleParticles.splice(i, 1);
    }
  }

  // Reset alpha for particle rendering
  workerState.frameContext!.globalAlpha = 1;
};



const updateParticlePosition = (
  particle: Particle,
  animationStartTime: number,
  requestAnimationFrameTime: number,
  textBoundaries: TextBoundaries
) => {
  customMovementFunction(
    particle,
    animationStartTime,
    requestAnimationFrameTime,
    {
      width: workerState.mainCanvas!.width,
      height: workerState.mainCanvas!.height,
    },
    workerState.appProps.animationDuration,
    textBoundaries,
  );
};

const handleBubbleEmission = (particle: Particle, requestAnimationFrameTime: number) => {
  if (
    !particle.emittedBubbles &&
    workerState.appProps.enableBubbles &&
    particle.x === particle.targetX &&
    particle.y === particle.targetY
  ) {
    particle.emittedBubbles = true;
    const bubbles = createBubbleParticles(
      particle.x,
      particle.y,
      particle.color,
      requestAnimationFrameTime,
      2 + Math.floor(Math.random() * 3)
    );
    workerState.bubbleParticles.push(...bubbles);
  }
};

/**
 * Handles static mode particle rendering with gaps, color cycling, and size interpolation
 */
const renderStaticModeParticle = (particle: Particle, elapsedTime: number): void => {
  // Position handling: apply gap or use target positions
  if (workerState.appProps.particleGap > 0) {
    // Apply gap by scaling positions from text center
    const textCenterX = (workerState.textBoundaries!.minX + workerState.textBoundaries!.maxX) / 2;
    const textCenterY = (workerState.textBoundaries!.minY + workerState.textBoundaries!.maxY) / 2;

    // Calculate offset from center
    const offsetX = particle.targetX - textCenterX;
    const offsetY = particle.targetY - textCenterY;

    // Scale the offset to create gaps (1.0 = no gap, higher = larger gaps)
    const gapScale = 1 + (workerState.appProps.particleGap / 50);

    particle.x = textCenterX + offsetX * gapScale;
    particle.y = textCenterY + offsetY * gapScale;
  } else {
    // No gap: use original target positions
    particle.x = particle.targetX;
    particle.y = particle.targetY;
  }

  // Generate consistent particle-specific offset (0-interpolationOffset ms)
  const particleHash = (particle.initialX * 9301 + particle.initialY * 49297) % 23;
  const particleOffset = (particleHash / 23) * workerState.appProps.interpolationOffset;
  const offsetElapsedTime = elapsedTime + particleOffset;

  // Color cycling with individual offset
  if (workerState.appProps.particleColors.length > 0) {
    const colorProgress = (offsetElapsedTime % workerState.appProps.animationDuration) / workerState.appProps.animationDuration;
    particle.color = getColorFromProgressCyclic(workerState.appProps.particleColors, colorProgress);
  }

  // Size interpolation for random particles
  if (workerState.appProps.sizeInterpolationPercentage > 0) {
    const randomValue = particleHash / 23; // Normalize to 0-1
    const shouldInterpolate = randomValue < (workerState.appProps.sizeInterpolationPercentage / 100);

    if (shouldInterpolate) {
      // Create a pulsing effect with individual offset: oscillate between 50% and configurable max size
      const maxScale = workerState.appProps.sizeInterpolationMax;
      const minScale = 0.5;
      const scaleRange = maxScale - minScale;
      const sizeProgress = Math.sin(offsetElapsedTime * 0.003) * (scaleRange / 2) + (minScale + maxScale) / 2;
      particle.scale = sizeProgress;
    } else {
      particle.scale = 1.0; // Default scale for non-interpolating particles
    }
  } else {
    particle.scale = 1.0; // Default scale when interpolation is disabled
  }
};

const renderMainParticles = (
  animationStartTime: number,
  requestAnimationFrameTime: number
): boolean => {
  const elapsedTime = requestAnimationFrameTime - animationStartTime;
  let allParticlesReached = true;

  workerState.workerParticles.forEach((particle) => {
    if (workerState.appProps.enableStaticMode) {
      renderStaticModeParticle(particle, elapsedTime);
    } else {
      // Use regular movement function
      updateParticlePosition(particle, animationStartTime, requestAnimationFrameTime, workerState.textBoundaries!);

    }

    // Do not render particles that are delayed
    if (particle.delay > elapsedTime) {
      return;
    }

    drawParticle({
      particle,
      context: workerState.frameContext!,
      particleRadius: workerState.appProps.particleRadius,
      particleColors: workerState.appProps.particleColors,
      revealProgress: workerState.revealProgress,
      imageBitmap: workerState.imageBitmap!,
      enableImageParticles: workerState.appProps.enableImageParticles,
      enableStaticMode: workerState.appProps.enableStaticMode,
    });
    handleBubbleEmission(particle, requestAnimationFrameTime);

    if (!isParticleAtTarget(particle) &&
      workerState.revealProgress >= 0.99) {
      allParticlesReached = false;
    }
  });

  return allParticlesReached;
};

const renderParticles = (
  animationStartTime: number,
  requestAnimationFrameTime: number
) => {
  workerState.frameContext!.clearRect(
    0,
    0,
    workerState.frameCanvas!.width,
    workerState.frameCanvas!.height
  );

  const elapsedTime = requestAnimationFrameTime - animationStartTime;
  workerState.revealProgress = Math.min(
    1,
    elapsedTime / workerState.appProps.animationDuration
  );

  renderBubbleParticles(requestAnimationFrameTime);

  const particlesReachedTarget = renderMainParticles(animationStartTime, requestAnimationFrameTime);

  const frameBitmap = workerState.frameCanvas!.transferToImageBitmap();
  workerState.mainContext!.transferFromImageBitmap(frameBitmap);

  const animationComplete = particlesReachedTarget && workerState.revealProgress >= 1;
  const totalAnimationTime = workerState.appProps.animationDuration +
    (workerState.appProps.enableBubbles ? BUBBLE_PARTICLE_LIFETIME : 0);
  const shouldStopAnimation = workerState.appProps.enableStaticMode
    ? false  // Never stop in static mode - endless loop
    : (animationComplete && elapsedTime >= totalAnimationTime);

  if (!shouldStopAnimation) {
    workerState.animationFrameId = requestAnimationFrame(
      (requestAnimationFrameTime) =>
        renderParticles(animationStartTime, requestAnimationFrameTime)
    );
  } else {
    if (workerState.animationFrameId) {
      cancelAnimationFrame(workerState.animationFrameId);
      workerState.bubbleParticles = [];
      workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
    }
  }
};

const play = () => {
  customMovementFunction = new Function(
    workerState.appProps.movementFunctionCode
  )();
  const startTime = performance.now();
  workerState.revealProgress = 0;
  workerState.bubbleParticles = [];
  // Reset emitted bubbles flag when playing again
  workerState.workerParticles.forEach((particle) => {
    particle.emittedBubbles = false;
  });
  renderParticles(startTime, startTime);
};

const resetState = () => {
  if (workerState.animationFrameId) {
    cancelAnimationFrame(workerState.animationFrameId);
  }

  workerState.bubbleParticles = [];
  workerState.revealProgress = 0;

  workerState.workerParticles = workerState.workerParticles.map(
    (particle) => {
      const initialCoordinates =
        startCoordinatesConfig[
          workerState.appProps.startPosition as StartPositionType
        ]();
      return {
        x: initialCoordinates.x,
        y: initialCoordinates.y,
        initialX: initialCoordinates.x,
        initialY: initialCoordinates.y,
        targetX: particle.targetX,
        targetY: particle.targetY,
        scale: 1,
        opacity: 1,
        delay: particle.delay,
        color: particle.color,
        revealProgress: 0,
        revealThreshold: particle.revealThreshold,
      };
    }
  );

  workerState.frameContext!.clearRect(
    0,
    0,
    workerState.frameCanvas!.width,
    workerState.frameCanvas!.height
  );
  const frameBitmap = workerState.frameCanvas!.transferToImageBitmap();
  workerState.mainContext!.transferFromImageBitmap(frameBitmap);

  if (workerState.animationFrameId) {
    cancelAnimationFrame(workerState.animationFrameId);
  }
}

self.onmessage = (event: MessageEvent<MainThreadMessage>) => {
  // TODO: move to reducer.ts, create a state
  // TODO: do type magic

  const {payload, type} = event.data;

  switch (type) {
    case Action.INITIALIZE: {
      initialize(payload);
      self.postMessage({
        type: WorkerAction.INITIALIZED,
        data: workerState.appProps,
      });
      break;
    }
    case Action.PLAY: {
      resetState()
      play();
      break;
    }
    case Action.RESIZE_PARTICLE_RADIUS: {
      workerState.appProps.particleRadius = payload;
      workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
      const {
        validBlocks: _validBlocks,
        blockHeight: _blockHeight,
        blockWidth: _blockWidth,
      } = getValidImageBlocks(
        workerState.frameContext!.getImageData(
          0,
          0,
          workerState.mainCanvas!.width,
          workerState.mainCanvas!.height
        ),
        workerState.appProps.particleRadius
      );

      workerState.validBlocks = _validBlocks;
      workerState.blockHeight = _blockHeight;
      workerState.blockWidth = _blockWidth;

      workerState.workerParticles = generateParticles({
        validBlocks: workerState.validBlocks,
        radius: workerState.appProps.particleRadius,
        blockHeight: workerState.blockHeight,
        blockWidth: workerState.blockWidth,
        startPosition: workerState.appProps.startPosition,
        delay: workerState.appProps.delay,
      });

      workerState.textBoundaries = getTextBoundaries(workerState.workerParticles, workerState.appProps.particleRadius);

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      if (workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_START_POSITION: {
      // TODO: fix start position for easing ??
      workerState.appProps.startPosition = payload;

      if (workerState.workerParticles.length) {
        workerState.workerParticles.forEach((particle) => {
          const initialCoordinates =
            startCoordinatesConfig[workerState.appProps.startPosition]();
          particle.initialX = initialCoordinates.x;
          particle.initialY = initialCoordinates.y;
          particle.x = initialCoordinates.x;
          particle.y = initialCoordinates.y;
        });

        self.postMessage({
          type: WorkerAction.UPDATE_APP_PROPS,
          data: workerState.appProps,
        });

        if (workerState.animationFrameId) {
          cancelAnimationFrame(workerState.animationFrameId);
          const startTime = performance.now();
          renderParticles(startTime, startTime);
        }
      } else {
        console.error(
          'updateStartPosition failed, particles were not initialized',
          {
            workerParticles: workerState.workerParticles,
          }
        );
      }
      break;
    }
    case Action.UPDATE_SELECTED_MOVEMENT_FUNCTION: {
      const {key, movementFunctionCode} = payload ?? {};
      if (key) {
        workerState.appProps.selectedMovementFunction = key;
      }
      if (movementFunctionCode !== undefined && movementFunctionCode !== null) {
        workerState.appProps.movementFunctionCode = movementFunctionCode;
        workerState.appProps.selectedEffect = null;
      }

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_TEXT: {
      workerState.appProps.text = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_FONT: {
      workerState.appProps.font = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_PARTICLE_COLORS: {
      workerState.appProps.particleColors = payload;

      // Remove setting particleColor as it doesn't exist in AppProps interface
      if (payload.length > 0) {
        // The particleColor property doesn't exist on AppProps
        // workerState.appProps.particleColor = payload[0];
      }

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      if (workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_BITMAP: {
      workerState.imageBitmap = payload;
      if (workerState.frameCanvas && workerState.mainCanvas) {
        workerState.frameCanvas.width = workerState.imageBitmap!.width;
        workerState.frameCanvas.height = workerState.imageBitmap!.height;
        workerState.mainCanvas.width = workerState.imageBitmap!.width;
        workerState.mainCanvas.height = workerState.imageBitmap!.height;

        // TODO: duplication here, remove it later
        workerState.frameContext!.drawImage(workerState.imageBitmap!, 0, 0);
        const {
          validBlocks: _validBlocks,
          blockHeight: _blockHeight,
          blockWidth: _blockWidth,
        } = getValidImageBlocks(
          workerState.frameContext!.getImageData(
            0,
            0,
            workerState.mainCanvas!.width,
            workerState.mainCanvas!.height
          ),
          workerState.appProps.particleRadius
        );
        workerState.textBoundaries = getTextBoundaries(workerState.workerParticles, workerState.appProps.particleRadius);

        workerState.validBlocks = _validBlocks;
        workerState.blockHeight = _blockHeight;
        workerState.blockWidth = _blockWidth;
        startCoordinatesConfig = getStartCoordinatesConfig({
          dimensions: {
            width: workerState.mainCanvas.width,
            height: workerState.mainCanvas.height,
          },
        });

        workerState.workerParticles = generateParticles({
          validBlocks: workerState.validBlocks,
          radius: workerState.appProps.particleRadius,
          blockHeight: workerState.blockHeight,
          blockWidth: workerState.blockWidth,
          startPosition: workerState.appProps.startPosition,
          delay: workerState.appProps.delay,
        });
      }
      break;
    }
    case Action.UPDATE_ANIMATION_DURATION: {
      workerState.appProps.animationDuration = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      // If animation is currently running, clear bubbles
      if (workerState.animationFrameId) {
        workerState.bubbleParticles = [];
      }
      break;
    }
    case Action.UPDATE_DELAY: {
      workerState.appProps.delay = payload;

      // Regenerate particles with new delay (if blocks are available)
      if (workerState.validBlocks) {
        workerState.workerParticles = generateParticles({
          validBlocks: workerState.validBlocks,
          radius: workerState.appProps.particleRadius,
          blockHeight: workerState.blockHeight,
          blockWidth: workerState.blockWidth,
          startPosition: workerState.appProps.startPosition,
          delay: workerState.appProps.delay,
        });
      }

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_ENABLE_BUBBLES: {
      workerState.appProps.enableBubbles = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_ENABLE_IMAGE_PARTICLES: {
      workerState.appProps.enableImageParticles = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_ENABLE_STATIC_MODE: {
      workerState.appProps.enableStaticMode = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      // Restart animation if currently running
      if (workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_PARTICLE_GAP: {
      workerState.appProps.particleGap = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      // Update particles immediately if in static mode and animation is running
      if (workerState.appProps.enableStaticMode && workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_SIZE_INTERPOLATION_PERCENTAGE: {
      workerState.appProps.sizeInterpolationPercentage = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      // Update particles immediately if in static mode and animation is running
      if (workerState.appProps.enableStaticMode && workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_INTERPOLATION_OFFSET: {
      workerState.appProps.interpolationOffset = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      // Update particles immediately if in static mode and animation is running
      if (workerState.appProps.enableStaticMode && workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_SIZE_INTERPOLATION_MAX: {
      workerState.appProps.sizeInterpolationMax = payload;

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });

      // Update particles immediately if in static mode and animation is running
      if (workerState.appProps.enableStaticMode && workerState.animationFrameId) {
        cancelAnimationFrame(workerState.animationFrameId);
        const startTime = performance.now();
        renderParticles(startTime, startTime);
      }
      break;
    }
    case Action.UPDATE_SELECTED_EFFECT: {
      workerState.appProps.selectedEffect = payload;
      if (payload && effectOptions[payload].getCode) {
        workerState.appProps.movementFunctionCode = formatCode(effectOptions[payload].getCode(workerState.appProps.effectConfigurations[payload] as any));
      }

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    case Action.UPDATE_EFFECT_CONFIGURATION: {
      const {effectType, configuration} = payload;
      (workerState.appProps.effectConfigurations as any)[effectType] = configuration;

      if (effectOptions[effectType].getCode) {
        workerState.appProps.movementFunctionCode = formatCode(effectOptions[effectType].getCode(configuration as any));
      }

      self.postMessage({
        type: WorkerAction.UPDATE_APP_PROPS,
        data: workerState.appProps,
      });
      break;
    }
    default:
      break;
  }
};
