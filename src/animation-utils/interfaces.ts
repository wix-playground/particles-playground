import {Dimensions, Particle, TextBoundaries} from "../interfaces";

type MovementFunctionParams = {
  particle: {[key: string]: any} & Particle;
  progress: number;
  textBoundaries: TextBoundaries;
  canvasDimensions: Dimensions;
}

export type MovementFunction = (params: MovementFunctionParams) => void;

export type EasingType = 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear' | 'quadratic-out' | 'ease-out-quart' | 'ease-in-out-quint';

export const EffectTypes = {
  BUILD: 'BUILD',
  SUPER_SWIRL: 'SUPER_SWIRL',
  OPPENHEIMER: 'OPPENHEIMER',
  SCANNING: 'SCANNING',
  EXPLOSION: 'EXPLOSION',
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
    // Phase timing - controls when horizontal movement transitions to vertical
    horizontalPhaseEnd: number,

    // Compression - controls the dramatic squeeze effect
    verticalCompressionFactor: number,

    // Scale - controls particle scaling during movement
    scalingBoost: number,

    // Bouncy easing - controls the signature bounce feel
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
  EXPLOSION: {
    explosionStrength: number, // Base explosion distance in pixels (default: 1000)
    deconstructionPhase: number, // Fraction of animation spent exploding outward (default: 0.4)
    orbitalRadius: number, // Size of final orbital settling wobble in pixels (default: 15)
    depthOffset: number, // Z-axis depth for 3D perspective effect (default: -500)
  }
}

export interface EffectOption<T extends EffectType> {
  factory: (config: EffectConfigurations[T]) => MovementFunction;
  defaultConfig: EffectConfigurations[T];
  commonControls: {
    startPosition: boolean;
  };
}
