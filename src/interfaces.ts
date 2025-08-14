import {EffectType, EffectConfigurations} from "./animation-utils/interfaces";

export interface Coordinates {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Particle extends Coordinates {
  targetX: number;
  targetY: number;
  initialX: number;
  initialY: number;
  scale: number;
  opacity: number;
  delay: number;
  color: string;
  revealProgress?: number;
  revealThreshold?: number;
  emittedBubbles?: boolean;
  reachedTarget?: boolean;
}

export interface BubbleParticle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
  opacity: number;
  createdAt: number; // Time when bubble was created
  lifetime: number; // How long the bubble should live (in ms)
}

export type StartPositionType =
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom'
  | 'left'
  | 'right'
  | 'random';

export enum Action {
  INITIALIZE = 'INITIALIZE',
  PLAY = 'PLAY',
  RESIZE_PARTICLE_RADIUS = 'RESIZE_PARTICLE_RADIUS',
  UPDATE_START_POSITION = 'UPDATE_START_POSITION',
  UPDATE_SELECTED_MOVEMENT_FUNCTION = 'UPDATE_SELECTED_MOVEMENT_FUNCTION',
  UPDATE_SELECTED_EFFECT = 'UPDATE_SELECTED_EFFECT',
  UPDATE_EFFECT_CONFIGURATION = 'UPDATE_EFFECT_CONFIGURATION',
  UPDATE_BITMAP = 'UPDATE_BITMAP',
  UPDATE_TEXT = 'UPDATE_TEXT',
  UPDATE_FONT = 'UPDATE_FONT',
  UPDATE_PARTICLE_COLORS = 'UPDATE_PARTICLE_COLORS',
  UPDATE_ANIMATION_DURATION = 'UPDATE_ANIMATION_DURATION',
  UPDATE_DELAY = 'UPDATE_DELAY',
  UPDATE_ENABLE_BUBBLES = 'UPDATE_ENABLE_BUBBLES',
  UPDATE_ENABLE_IMAGE_PARTICLES = 'UPDATE_ENABLE_IMAGE_PARTICLES',
  UPDATE_ENABLE_STATIC_MODE = 'UPDATE_ENABLE_STATIC_MODE',
  UPDATE_PARTICLE_GAP = 'UPDATE_PARTICLE_GAP',
  UPDATE_SIZE_INTERPOLATION_PERCENTAGE = 'UPDATE_SIZE_INTERPOLATION_PERCENTAGE',
  UPDATE_INTERPOLATION_OFFSET = 'UPDATE_INTERPOLATION_OFFSET',
  UPDATE_SIZE_INTERPOLATION_MAX = 'UPDATE_SIZE_INTERPOLATION_MAX',
}

export enum WorkerAction {
  INITIALIZED = 'INITIALIZED',
  UPDATE_APP_PROPS = 'UPDATE_APP_PROPS',
}

export type FontState = {
  fontFamily: FontFamily;
  fontSize: number;
  italic: boolean;
  weight: number;
  letterSpacing: number; // number in px
  textColor: string;
};

export const getUpdateFontMessage = (payload: FontState) => ({
  type: Action.UPDATE_FONT as const,
  payload,
});

export interface InitializeMessagePayload {
  canvas: OffscreenCanvas;
  dimensions: Dimensions;
  imageBitmap: ImageBitmap;
  appProps: AppProps;
}

export const getInitializeMessage = (payload: InitializeMessagePayload) => ({
  type: Action.INITIALIZE as const,
  payload,
});

export const getPlayMessage = () => ({
  type: Action.PLAY as const,
  payload: undefined,
});

export const getResizeParticleRadiusMessage = (payload: number) => ({
  type: Action.RESIZE_PARTICLE_RADIUS as const,
  payload,
});

export const getUpdateStartPositionMessage = (payload: StartPositionType) => ({
  type: Action.UPDATE_START_POSITION as const,
  payload,
});

export const getUpdateSelectedMovementFunctionMessage = (payload: {
  key?: string;
  movementFunctionCode?: string;
}) => ({
  type: Action.UPDATE_SELECTED_MOVEMENT_FUNCTION as const,
  payload,
});

export const getUpdateBitmapMessage = (payload: ImageBitmap) => ({
  type: Action.UPDATE_BITMAP as const,
  payload,
});

export const getUpdateTextMessage = (payload: string) => ({
  type: Action.UPDATE_TEXT as const,
  payload,
});

export const getUpdateParticleColorsMessage = (payload: string[]) => ({
  type: Action.UPDATE_PARTICLE_COLORS as const,
  payload,
});

export const getUpdateAnimationDurationMessage = (payload: number) => ({
  type: Action.UPDATE_ANIMATION_DURATION as const,
  payload,
});

export const getUpdateEnableBubblesMessage = (payload: boolean) => ({
  type: Action.UPDATE_ENABLE_BUBBLES as const,
  payload,
});

export const getUpdateEnableImageParticlesMessage = (payload: boolean) => ({
  type: Action.UPDATE_ENABLE_IMAGE_PARTICLES as const,
  payload,
});

export const getUpdateDelayMessage = (payload: number) => ({
  type: Action.UPDATE_DELAY as const,
  payload,
});

export const getUpdateEnableStaticModeMessage = (payload: boolean) => ({
  type: Action.UPDATE_ENABLE_STATIC_MODE as const,
  payload,
});

export const getUpdateParticleGapMessage = (payload: number) => ({
  type: Action.UPDATE_PARTICLE_GAP as const,
  payload,
});

export const getUpdateSizeInterpolationPercentageMessage = (payload: number) => ({
  type: Action.UPDATE_SIZE_INTERPOLATION_PERCENTAGE as const,
  payload,
});

export const getUpdateInterpolationOffsetMessage = (payload: number) => ({
  type: Action.UPDATE_INTERPOLATION_OFFSET as const,
  payload,
});

export const getUpdateSizeInterpolationMaxMessage = (payload: number) => ({
  type: Action.UPDATE_SIZE_INTERPOLATION_MAX as const,
  payload,
});

export const getUpdateSelectedEffectMessage = (payload: EffectType | null) => ({
  type: Action.UPDATE_SELECTED_EFFECT as const,
  payload,
});

export const getUpdateEffectConfigurationMessage = (payload: {
  effectType: EffectType;
  configuration: EffectConfigurations[EffectType];
}) => ({
  type: Action.UPDATE_EFFECT_CONFIGURATION as const,
  payload,
});

export type MainThreadMessage =
  | ReturnType<typeof getUpdateBitmapMessage>
  | ReturnType<typeof getUpdateTextMessage>
  | ReturnType<typeof getUpdateSelectedMovementFunctionMessage>
  | ReturnType<typeof getUpdateSelectedEffectMessage>
  | ReturnType<typeof getUpdateEffectConfigurationMessage>
  | ReturnType<typeof getUpdateStartPositionMessage>
  | ReturnType<typeof getResizeParticleRadiusMessage>
  | ReturnType<typeof getPlayMessage>
  | ReturnType<typeof getInitializeMessage>
  | ReturnType<typeof getUpdateFontMessage>
  | ReturnType<typeof getUpdateParticleColorsMessage>
  | ReturnType<typeof getUpdateAnimationDurationMessage>
  | ReturnType<typeof getUpdateDelayMessage>
  | ReturnType<typeof getUpdateEnableBubblesMessage>
  | ReturnType<typeof getUpdateEnableImageParticlesMessage>
  | ReturnType<typeof getUpdateEnableStaticModeMessage>
  | ReturnType<typeof getUpdateParticleGapMessage>
  | ReturnType<typeof getUpdateSizeInterpolationPercentageMessage>
  | ReturnType<typeof getUpdateInterpolationOffsetMessage>
  | ReturnType<typeof getUpdateSizeInterpolationMaxMessage>;

export const fontFamilies = [
  'Arial',
  'Pirata One',
  'Poppins',
  'Press Start 2P',
  'Modak',
  'UnifrakturMaguntia',
  'Junge',
  'Ojuju',
  'Syne',
  'Sora',
  'K2D',
  'Playfair',
  'Luxurious Script',
  'Fraunces',
  'Belinda',
  'DIN',
] as const;

export type FontFamily = (typeof fontFamilies)[number];

export interface AppProps {
  startPosition: StartPositionType;
  movementFunctionCode: string;
  selectedMovementFunction: string;
  selectedEffect: EffectType | null;
  effectConfigurations: {
    SUPER_SWIRL: EffectConfigurations['SUPER_SWIRL'];
    BUILD: EffectConfigurations['BUILD'];
    OPPENHEIMER: EffectConfigurations['OPPENHEIMER'];
    SCANNING: EffectConfigurations['SCANNING'];
    EXPLOSION: EffectConfigurations['EXPLOSION'];
    HELIX_SPIRAL: EffectConfigurations['HELIX_SPIRAL'];
    PERLIN: EffectConfigurations['PERLIN'];
  };
  particleRadius: number;
  text: string;
  font: FontState;
  particleColors: string[];
  animationDuration: number;
  delay: number;
  enableBubbles: boolean;
  enableImageParticles: boolean;
  enableStaticMode: boolean;
  particleGap: number;
  sizeInterpolationPercentage: number;
  interpolationOffset: number;
  sizeInterpolationMax: number;
}

export type TextBoundaries = Dimensions & {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};
