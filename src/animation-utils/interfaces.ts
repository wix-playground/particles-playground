import {Particle, TextBoundaries} from "../interfaces";

export type MovementFunction = (particle: Particle & {
  [key: string]: any;
}, animationProgress: number, textBoundaries: TextBoundaries) => void;

export type EasingType = 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear' | 'quadratic-out';

export const EffectTypes = {
  BUILD: 'BUILD',
  SUPER_SWIRL: 'SUPER_SWIRL',
  OPPENHEIMER: 'OPPENHEIMER',
  SCANNING: 'SCANNING',
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
  SCANNING: {
    oscillationFrequency: number, // Number of complete back-and-forth scanning cycles (default: 3)
    settlementThreshold: number, // How close the scan line needs to be to settle a particle (default: 12)
    scanningRange: number, // How far beyond text boundaries the scan extends in pixels (default: 30)
    passDistribution: number, // Fraction of total passes used for particle distribution (default: 0.83, meaning 5/6 passes)
    settlementTiming: 'early' | 'distributed' | 'late', // When particles settle: early passes, distributed across passes, or late passes
  }
}

export interface EffectOption<T extends EffectType> {
  factory: (config: EffectConfigurations[T]) => MovementFunction;
  defaultConfig: EffectConfigurations[T];
}
