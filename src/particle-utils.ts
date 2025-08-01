import {BubbleParticle, Particle} from './interfaces';
import {BUBBLE_PARTICLE_LIFETIME} from './constants';
import {getColorFromProgress} from './utils';

/**
 * Updates the position of a bubble particle with wind effects
 */
export const updateBubblePosition = (bubble: BubbleParticle): void => {
  // Update bubble position
  bubble.x += bubble.dx;
  bubble.y += bubble.dy;

  // Apply gentle wind effect
  bubble.dx += (Math.random() - 0.5) * 0.1;
  bubble.dy -= 0.02; // Slight upward drift
};

/**
 * Checks if a bubble particle has exceeded its lifetime
 */
export const isBubbleExpired = (
  bubble: BubbleParticle,
  requestAnimationFrameTime: number
): boolean => {
  const age = requestAnimationFrameTime - bubble.createdAt;
  return age >= bubble.lifetime;
};

/**
 * Calculates the blend factor between circle and image rendering for a particle
 */
export const getTransitionBlendFactor = (
  particle: Particle,
  revealProgress: number
): number => {
  // Check if reveal progress exceeds particle's threshold
  if (revealProgress > (particle.revealThreshold || 0.99)) {
    return 1; // Fully image
  }

  // Check if particle is within 5 pixels of target and progress > 85%
  if (revealProgress > 0.85) {
    const distanceToTarget = Math.sqrt(
      Math.pow(particle.x - particle.targetX, 2) +
      Math.pow(particle.y - particle.targetY, 2)
    );
    if (distanceToTarget <= 5) {
      // Create a smooth transition over the last 2% of reveal progress
      const threshold = particle.revealThreshold || 0.99;
      const transitionStart = threshold - 0.02;
      const transitionProgress = Math.max(0, (revealProgress - transitionStart) / 0.02);
      return Math.min(1, transitionProgress);
    }
  }

  return 0; // Fully circle
};

/**
 * Creates bubble particles at the specified position
 */
export const createBubbleParticles = (
  x: number,
  y: number,
  color: string,
  currentTime: number,
  count: number = 5
): BubbleParticle[] => {
  const bubbles: BubbleParticle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 2;
    bubbles.push({
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed - 1, // Slight upward bias
      radius: 2 + Math.random() * 5,
      color,
      opacity: 0.7 + Math.random() * 0.3,
      createdAt: currentTime,
      lifetime: BUBBLE_PARTICLE_LIFETIME,
    });
  }
  return bubbles;
};

/**
 * Draws a bubble particle on the canvas
 */
export const drawBubble = ({
  bubble,
  requestAnimationFrameTime,
  context,
  particleColors,
}: {
  bubble: BubbleParticle;
  requestAnimationFrameTime: number;
  context: OffscreenCanvasRenderingContext2D;
  particleColors: string[];
}): void => {
  // Calculate age based on animation time
  const age = requestAnimationFrameTime - bubble.createdAt;
  const lifeRatio = Math.min(1, age / bubble.lifetime);
  const opacity = bubble.opacity * (1 - lifeRatio);

  // Draw bubble
  context.beginPath();
  context.arc(
    Math.floor(bubble.x),
    Math.floor(bubble.y),
    bubble.radius,
    0,
    Math.PI * 2
  );
  context.fillStyle = getColorFromProgress(particleColors, lifeRatio);
  context.globalAlpha = opacity;
  context.fill();
};

/**
 * Draws an image particle on the canvas
 */
export const drawImageParticle = ({
  particle,
  context,
  particleRadius,
  imageBitmap,
}: {
  particle: Particle;
  context: OffscreenCanvasRenderingContext2D;
  particleRadius: number;
  imageBitmap: ImageBitmap;
}): void => {
  context.globalAlpha = particle.opacity || 1;
  context.drawImage(
    imageBitmap,
    particle.targetX,
    particle.targetY,
    particleRadius,
    particleRadius,
    Math.floor(particle.x),
    Math.floor(particle.y),
    particleRadius,
    particleRadius
  );
};

/**
 * Draws a circle particle on the canvas
 */
export const drawCircleParticle = ({
  particle,
  context,
  particleRadius,
  particleColors,
  revealProgress,
}: {
  particle: Particle;
  context: OffscreenCanvasRenderingContext2D;
  particleRadius: number;
  particleColors: string[];
  revealProgress: number;
}): void => {
  const radius = Math.floor(particleRadius * (particle.scale || 1));

  context.globalAlpha = particle.opacity || 1;
  context.beginPath();
  context.arc(
    Math.floor(particle.x) + radius / 2,
    Math.floor(particle.y) + radius / 2,
    radius / 2,
    0,
    2 * Math.PI
  );
  context.fillStyle = particleColors.length
    ? getColorFromProgress(particleColors, revealProgress)
    : particle.color;
  context.fill();
};

/**
 * Draws a blended particle (circle + image) on the canvas
 */
export const drawBlendedParticle = ({
  particle,
  blendFactor,
  context,
  particleRadius,
  particleColors,
  revealProgress,
  imageBitmap,
}: {
  particle: Particle;
  blendFactor: number;
  context: OffscreenCanvasRenderingContext2D;
  particleRadius: number;
  particleColors: string[];
  revealProgress: number;
  imageBitmap: ImageBitmap;
}): void => {
  const radius = Math.floor(particleRadius * (particle.scale || 1));

  // Draw circle with reduced opacity
  context.globalAlpha = (particle.opacity || 1) * (1 - blendFactor);
  context.beginPath();
  context.arc(
    Math.floor(particle.x) + radius / 2,
    Math.floor(particle.y) + radius / 2,
    radius / 2,
    0,
    2 * Math.PI
  );
  context.fillStyle = particleColors.length
    ? getColorFromProgress(particleColors, revealProgress)
    : particle.color;
  context.fill();

  // Draw image with increasing opacity
  context.globalAlpha = blendFactor;
  context.drawImage(
    imageBitmap,
    particle.targetX,
    particle.targetY,
    particleRadius,
    particleRadius,
    Math.floor(particle.x),
    Math.floor(particle.y),
    particleRadius,
    particleRadius
  );
};

/**
 * Draws a particle based on current settings and state
 */
export const drawParticle = ({
  particle,
  context,
  particleRadius,
  particleColors,
  revealProgress,
  imageBitmap,
  enableImageParticles,
}: {
  particle: Particle;
  context: OffscreenCanvasRenderingContext2D;
  particleRadius: number;
  particleColors: string[];
  revealProgress: number;
  imageBitmap: ImageBitmap;
  enableImageParticles: boolean;
}): void => {
  if (enableImageParticles) {
    // Always render as image bitmap throughout animation
    drawImageParticle({particle, context, particleRadius, imageBitmap});
  } else {
    const blendFactor = getTransitionBlendFactor(particle, revealProgress);

    if (blendFactor > 0 && blendFactor < 1) {
      // Blending mode: draw both circle and image with appropriate opacities
      drawBlendedParticle({
        particle,
        blendFactor,
        context,
        particleRadius,
        particleColors,
        revealProgress,
        imageBitmap,
      });
    } else if (blendFactor >= 1) {
      // Fully image
      drawImageParticle({particle, context, particleRadius, imageBitmap});
    } else {
      // Fully circle
      drawCircleParticle({
        particle,
        context,
        particleRadius,
        particleColors,
        revealProgress,
      });
    }
  }
};

export const isParticleAtTarget = (particle: Particle): boolean => {
  return (
    particle.x === particle.targetX &&
    particle.y === particle.targetY
  );
};
