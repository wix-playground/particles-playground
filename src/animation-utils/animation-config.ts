import {easingConfig} from "./easing-config";
import {EffectOption, EffectTypes} from "./interfaces";

const superSwirlEffectOption: EffectOption<'SUPER_SWIRL'> = {
  factory: (config) => {
    return (particle, animationProgress) => {
      const {swirlTurns, spiralDirection, easingType} = config;
      const t = Math.min(animationProgress, 1);

      const ease = easingConfig[easingType](t);

      // On first run: calculate offset vector and initial angle
      if (!particle._started) {
        const dx = particle.initialX - particle.targetX;
        const dy = particle.initialY - particle.targetY;

        particle._radius = Math.sqrt(dx * dx + dy * dy); // distance to target
        particle._angle = Math.atan2(dy, dx);            // angle around the target

        particle._started = true;
      }

      // Shrink radius from initial → 0
      const currentRadius = particle._radius * (1 - ease);

      // Rotate clockwise over time (more ease = more angle)
      const angle = particle._angle + (spiralDirection * 2 * Math.PI * swirlTurns * ease);

      // Position relative to target
      particle.x = particle.targetX + currentRadius * Math.cos(angle);
      particle.y = particle.targetY + currentRadius * Math.sin(angle);

      // Optional scale pulse or shrink
      particle.scale = 1 + 2 * (1 - ease); // start large, shrink to normal

      // Fade in as it approaches center
      particle.opacity = ease;

      // Color could shift too (optional)
      particle.color = `rgba(255,255,255,${particle.opacity})`;

      // Final snap
      if (t >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.opacity = 1;
        particle.scale = 1;
      }
    };
  },
  defaultConfig: {
    swirlTurns: 2,
    spiralDirection: 1,
    easingType: "ease-in-out"
  },
}

const buildEffectOption: EffectOption<'BUILD'> = {
  factory: (config) => {
    return (particle, animationProgress) => {
      const {horizontalPhaseEnd, bounceEndPoint, verticalCompressionFactor, decompressionStart, decompressionEasing, horizontalScaleShrink, verticalScaleShrink, scalingBoost, scalingPhaseEnd, bouncyIntensity, bouncyOffset} = config;

      // --- Initialization ---
      if (!particle.customProps) {
        particle.customProps = {
          originalScale: particle.scale,
          originalOpacity: particle.opacity,
        };
      }

      // --- Core Calculation ---
      const progress = animationProgress;

      // --- Animation Finalization ---
      if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.scale = particle.customProps.originalScale;
        particle.opacity = particle.customProps.originalOpacity;
        return particle;
      }

      // Configurable bouncy easing function
      const bouncyEaseOut = (t: number) => {
        const c4 = (2 * Math.PI) / 3;

        if (t === 0) return 0;
        if (t === 1) return 1;

        return Math.pow(2, -bouncyIntensity * t) * Math.sin((t * bouncyIntensity - bouncyOffset) * c4) + 1;
      };

      // --- Three-Phase Animation ---
      if (progress < horizontalPhaseEnd) {
        // Phase 1: Horizontal Movement
        const phaseProgress = progress / horizontalPhaseEnd;
        const easedProgress = bouncyEaseOut(phaseProgress);

        particle.x = particle.initialX + (particle.targetX - particle.initialX) * easedProgress;
        particle.y = particle.initialY;

        // Configurable scale effect
        const baseScale = particle.customProps.originalScale;
        const scaleEffect = 1 - Math.sin(phaseProgress * Math.PI) * horizontalScaleShrink;
        particle.scale = baseScale * scaleEffect;

      } else if (progress < bounceEndPoint) {
        // Phase 2: Vertical Movement
        const phaseProgress = (progress - horizontalPhaseEnd) / (bounceEndPoint - horizontalPhaseEnd);
        const easedProgress = bouncyEaseOut(phaseProgress);

        particle.x = particle.targetX;

        // Configurable compression
        const centerY = (particle.initialY + particle.targetY) / 2;
        const compressedY = centerY + (particle.targetY - centerY) * verticalCompressionFactor;

        // Configurable decompression
        const verticalTransition = phaseProgress < decompressionStart
          ? 0
          : (() => {
            const t = (phaseProgress - decompressionStart) / (1 - decompressionStart);
            return 1 - Math.pow(1 - t, decompressionEasing);
          })();

        const animatedY = particle.initialY + (compressedY - particle.initialY) * easedProgress;
        particle.y = animatedY + (particle.targetY - compressedY) * verticalTransition;

        // Configurable scale effects
        const baseScale = particle.customProps.originalScale;
        const scaleEffect = 1 - Math.sin(phaseProgress * Math.PI) * verticalScaleShrink;

        const scalingBoostAmount = phaseProgress < scalingPhaseEnd
          ? 1 + (1 - phaseProgress / scalingPhaseEnd) * scalingBoost
          : 1;

        particle.scale = baseScale * scaleEffect * scalingBoostAmount;
      }

      return particle;
    };
  },
  defaultConfig: {
    horizontalPhaseEnd: 0.4,
    bounceEndPoint: 1,
    verticalCompressionFactor: 0.45,
    decompressionStart: 0.6,
    decompressionEasing: 1.1,
    horizontalScaleShrink: 0.2,
    verticalScaleShrink: 0.1,
    scalingBoost: 0.3,
    scalingPhaseEnd: 0.5,
    bouncyIntensity: 10,
    bouncyOffset: 0.75,
    startPosition: "center"
  },
}

export const effectOptions = {
  [EffectTypes.SUPER_SWIRL]: superSwirlEffectOption,
  [EffectTypes.BUILD]: buildEffectOption,
} as const;
