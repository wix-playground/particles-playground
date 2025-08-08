import {Dimensions, Particle} from "../interfaces";

export type MovementFunction = (particle: Particle & {
  [key: string]: any;
}, animationProgress: number, canvasDimensions: Dimensions) => void;

export type EasingType = 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear' | 'quadratic-out';

export const EffectTypes = {
  BUILD: 'BUILD',
  SUPER_SWIRL: 'SUPER_SWIRL',
  OPPENHEIMER: 'OPPENHEIMER',
} as const

export type EffectType = typeof EffectTypes[keyof typeof EffectTypes];


export type EffectConfigurations = {
  // SWIRL: {
  //   swirlTurns: number; // Controls how many revolutions the particle makes
  //   fadeInSpeed: number; // Controls how quickly the particles fade in
  //   // swirlDirection: 'clockwise' | 'counter-clockwise';
  // }
  SUPER_SWIRL: {
    swirlTurns: number; // Controls how many revolutions the particle makes
    spiralDirection: number // Could be: 1 for clockwise, -1 for counterclockwise, or random - Currently clockwise (positive rotation)
    easingType: EasingType
  }
  BUILD: {
    // Phase timing
    horizontalPhaseEnd: number,
    bounceEndPoint: number,

    // Compression controls
    verticalCompressionFactor: number,
    decompressionStart: number,
    decompressionEasing: number,

    // Scale effects
    horizontalScaleShrink: number,
    verticalScaleShrink: number,
    scalingBoost: number,
    scalingPhaseEnd: number,

    // Bouncy easing
    bouncyIntensity: number,
    bouncyOffset: number,
    startPosition: 'center'
  }
  OPPENHEIMER: {
    windStrength: number,
    turbulenceScale: number,
    oscillationAmount: number,
    settlingSpeed: number,
    particleWeight: number,
  }
}

export interface EffectOption<T extends EffectType> {
  factory: (config: EffectConfigurations[T]) => MovementFunction;
  defaultConfig: EffectConfigurations[T];
}
