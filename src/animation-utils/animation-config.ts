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

const oppenheimerEffectOption: EffectOption<'OPPENHEIMER'> = {
  factory: (config) => {
    console.log('config', config);
    return (particle, progress) => {
      // Default configuration
      const {
        windStrength,        // 0-1: Overall wind intensity
        turbulenceScale,      // 0-100: Chaos/displacement amount
        oscillationAmount,   // 0-2: Swaying/flutter intensity
        settlingSpeed,       // 0-2: Speed of reaching target (1 = normal)
        particleWeight  // 0-2: Wind resistance (1 = normal, higher = more resistance)
      } = config;

      // Initialize custom properties for wind and snow turbulence if not already set
      if (!particle.windProps) {
        particle.windProps = {
          originalScale: particle.scale,
          originalOpacity: particle.opacity,
          // Define unique wind characteristics for each particle
          gustSensitivity: (0.5 + Math.random() * 1.5) / particleWeight, // Adjusted by weight
          gustFrequency: 1 + Math.random() * 2,
          turbulenceScale: (10 + Math.random() * 40) * (turbulenceScale / 25), // Scaled by config
          drift: (Math.random() - 0.5) * 2,
          weight: (0.3 + Math.random() * 0.7) * particleWeight, // Scaled by config
          flutterAmount: (Math.random() * 0.8 + 0.2) * oscillationAmount, // Scaled by config
          flutterSpeed: 3 + Math.random() * 6,
          delay: Math.random() * 0.15 / settlingSpeed, // Adjusted by settling speed
          // Different turbulence phase offsets for organic motion
          turbPhaseX: Math.random() * 1000,
          turbPhaseY: Math.random() * 1000,
          // Unique sine wave phasing for snowflake-like oscillations
          sinePhaseX: Math.random() * Math.PI * 2,
          sinePhaseY: Math.random() * Math.PI * 2,
          // Random opacity pulsing
          opacityPhase: Math.random() * Math.PI * 2,
          burstOpacity: Math.random() > 0.7
        };
      }

      // Apply individual delay to animation progress (affected by settling speed)
      let adjustedProgress = Math.max(0, (progress - particle.windProps.delay) / (1 - particle.windProps.delay));
      adjustedProgress = Math.min(1, Math.pow(adjustedProgress, 1 / settlingSpeed)); // Settling speed affects progression

      // Wind gust strength varies throughout animation (scaled by windStrength config)
      let currentWindStrength;
      if (adjustedProgress < 0.25) {
        // Building wind
        currentWindStrength = adjustedProgress * 4 * windStrength;
      } else if (adjustedProgress < 0.75) {
        // Strong, variable wind with gusts
        const gustPhase = (adjustedProgress - 0.25) / 0.5;
        currentWindStrength = windStrength + Math.sin(gustPhase * Math.PI * 3) * windStrength * 0.3;
        // Add micro-gusts
        currentWindStrength += Math.sin(gustPhase * Math.PI * 8) * windStrength * 0.15;
      } else {
        // Gradually settling wind
        currentWindStrength = windStrength * (1 - (adjustedProgress - 0.75) / 0.25);
      }

      // Base directional movement toward target (affected by settling speed)
      let baseX, baseY;
      const speedMultiplier = settlingSpeed;

      // Calculate direct path with easing
      if (adjustedProgress < 0.25) {
        const easeIn = Math.pow(adjustedProgress / 0.25, 2);
        baseX = particle.initialX + (particle.targetX - particle.initialX) * easeIn * 0.15 * speedMultiplier;
        baseY = particle.initialY + (particle.targetY - particle.initialY) * easeIn * 0.15 * speedMultiplier;
      } else if (adjustedProgress < 0.75) {
        const midProgress = (adjustedProgress - 0.25) / 0.5;
        const directionProgress = 0.15 + midProgress * 0.6 * speedMultiplier;
        baseX = particle.initialX + (particle.targetX - particle.initialX) * Math.min(directionProgress, 0.75);
        baseY = particle.initialY + (particle.targetY - particle.initialY) * Math.min(directionProgress, 0.75);
      } else {
        const finalProgress = (adjustedProgress - 0.75) / 0.25;
        const easeOut = 1 - Math.pow(1 - finalProgress, 3);
        const directionProgress = 0.75 + easeOut * 0.25;
        baseX = particle.initialX + (particle.targetX - particle.initialX) * directionProgress;
        baseY = particle.initialY + (particle.targetY - particle.initialY) * directionProgress;
      }

      // Calculate turbulence effects (scaled by turbulenceScale config)
      const turbulenceTime = adjustedProgress * 10;

      // Horizontal turbulence (X-axis) - scaled by config
      const turbX1 = Math.sin((turbulenceTime * 0.3 + particle.windProps.turbPhaseX) * particle.windProps.gustFrequency) * particle.windProps.turbulenceScale;
      const turbX2 = Math.sin((turbulenceTime * 0.7 + particle.windProps.turbPhaseX * 0.5) * particle.windProps.gustFrequency * 1.5) * particle.windProps.turbulenceScale * 0.5;
      const turbX3 = Math.sin((turbulenceTime * 1.1 + particle.windProps.turbPhaseX * 0.8) * particle.windProps.gustFrequency * 2.3) * particle.windProps.turbulenceScale * 0.3;

      // Vertical turbulence (Y-axis) - scaled by config
      const turbY1 = Math.cos((turbulenceTime * 0.4 + particle.windProps.turbPhaseY) * particle.windProps.gustFrequency) * particle.windProps.turbulenceScale * 0.8;
      const turbY2 = Math.cos((turbulenceTime * 0.9 + particle.windProps.turbPhaseY * 0.7) * particle.windProps.gustFrequency * 1.8) * particle.windProps.turbulenceScale * 0.4;
      const turbY3 = Math.cos((turbulenceTime * 1.3 + particle.windProps.turbPhaseY * 0.3) * particle.windProps.gustFrequency * 2.1) * particle.windProps.turbulenceScale * 0.25;

      // Combine turbulence effects
      const turbulenceX = (turbX1 + turbX2 + turbX3) * currentWindStrength * particle.windProps.gustSensitivity;
      const turbulenceY = (turbY1 + turbY2 + turbY3) * currentWindStrength * particle.windProps.gustSensitivity;

      // Add consistent drift patterns (scaled by wind strength)
      const driftX = 30 * Math.sin(adjustedProgress * Math.PI * 0.7) * particle.windProps.drift * currentWindStrength;

      // Add snowflake-like oscillations (scaled by oscillationAmount config)
      const oscillationAmplitude = 25 * currentWindStrength * particle.windProps.flutterAmount;
      const oscillationX = oscillationAmplitude * Math.sin(adjustedProgress * Math.PI * particle.windProps.flutterSpeed + particle.windProps.sinePhaseX);
      const oscillationY = oscillationAmplitude * 0.5 * Math.cos(adjustedProgress * Math.PI * particle.windProps.flutterSpeed * 0.7 + particle.windProps.sinePhaseY);

      // Calculate weight influence (affected by particleWeight config)
      const weightInfluence = 1 / particle.windProps.weight;

      // Apply all wind and turbulence effects to base position
      particle.x = baseX + (turbulenceX + oscillationX + driftX) / weightInfluence;
      particle.y = baseY + (turbulenceY + oscillationY) / weightInfluence;

      // Scale variations based on wind intensity
      const baseScale = particle.windProps.originalScale;
      const scaleVariation = Math.sin(adjustedProgress * Math.PI * particle.windProps.flutterSpeed * 1.5 + particle.windProps.sinePhaseX) * 0.15 * oscillationAmount;
      const gustEffect = Math.sin(adjustedProgress * Math.PI * 2) * 0.1 * currentWindStrength;

      particle.scale = baseScale * (1 + scaleVariation + gustEffect);

      // Opacity variations
      let opacityBase = particle.windProps.originalOpacity;
      let flickerEffect = 0;

      if (particle.windProps.burstOpacity) {
        flickerEffect = Math.sin(adjustedProgress * Math.PI * 20 + particle.windProps.opacityPhase) * 0.2 * currentWindStrength;
      } else {
        flickerEffect = Math.sin(adjustedProgress * Math.PI * 10 + particle.windProps.opacityPhase) * 0.1 * currentWindStrength;
      }

      let phaseOpacity;
      if (adjustedProgress < 0.1) {
        phaseOpacity = adjustedProgress / 0.1;
      } else if (adjustedProgress > 0.9) {
        phaseOpacity = 1;
      } else {
        phaseOpacity = 1 + flickerEffect;
      }

      particle.opacity = opacityBase * Math.min(1, Math.max(0.2, phaseOpacity));

      // Color variations (affected by wind strength)
      let hue = 0, saturation = 100, lightness = 70;

      if (!particle.origColor) {
        if (particle.color.startsWith('hsl')) {
          const hslMatch = particle.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
          if (hslMatch) {
            hue = parseInt(hslMatch[1], 10);
            saturation = parseInt(hslMatch[2], 10);
            lightness = parseInt(hslMatch[3], 10);
          }
        } else {
          hue = (220 + Math.random() * 40) % 360;
          saturation = 10 + Math.random() * 15;
          lightness = 70 + Math.random() * 20;
        }
        particle.origColor = {hue, saturation, lightness};
      } else {
        hue = particle.origColor.hue;
        saturation = particle.origColor.saturation;
        lightness = particle.origColor.lightness;
      }

      // Adjust color based on current wind intensity
      const windColorEffect = currentWindStrength * 20;
      const newHue = (hue + Math.sin(adjustedProgress * Math.PI * 3) * 5 * currentWindStrength) % 360;
      const newSaturation = Math.max(0, saturation - windColorEffect * 0.5);
      const newLightness = Math.min(100, lightness + windColorEffect * 0.3);

      particle.color = `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`;

      // Ensure particles complete their journey
      if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.scale = particle.windProps.originalScale;
        particle.opacity = particle.windProps.originalOpacity;
      }
    }

    // Gentle snow
    // animationFunction(particle, progress, {
    // windStrength: 0.3,
    // turbulenceScale: 15,
    // oscillationAmount: 0.8,
    // settlingSpeed: 0.8,
    // particleWeight: 1.2
    // });

    // // Blizzard
    // animationFunction(particle, progress, {
    // windStrength: 1.0,
    // turbulenceScale: 60,
    // oscillationAmount: 1.5,
    // settlingSpeed: 1.5,
    // particleWeight: 0.7
    // });

    // // Magical sparkles
    // animationFunction(particle, progress, {
    // windStrength: 0.4,
    // turbulenceScale: 5,
    // oscillationAmount: 2.0,
    // settlingSpeed: 0.6,
    // particleWeight: 0.5
    // });
  },
  defaultConfig: {
    windStrength: 1.0,
    turbulenceScale: 60,
    oscillationAmount: 1.5,
    settlingSpeed: 1.5,
    particleWeight: 0.7
  }
}

export const effectOptions = {
  [EffectTypes.SUPER_SWIRL]: superSwirlEffectOption,
  [EffectTypes.BUILD]: buildEffectOption,
  [EffectTypes.OPPENHEIMER]: oppenheimerEffectOption,
} as const;
