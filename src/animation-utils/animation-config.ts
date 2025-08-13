import {easingConfig, easingConfigString} from "./easing-config";
import {EffectConfigurations, EffectOption, EffectTypes} from "./interfaces";

const superSwirlEffectOption: EffectOption<'SUPER_SWIRL'> = {
  factory: (config) => {
    return (particle, animationStartTime, currentTime, _canvasDimensions, animationDuration) => {
      const {swirlTurns, spiralDirection, easingType, affectOpacity, affectScale} = config;
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      const t = Math.min(progress, 1);

      const ease = easingConfig[easingType](t);

      // On first run: calculate offset vector and initial angle
      if (!particle._started) {
        const dx = particle.initialX - particle.targetX;
        const dy = particle.initialY - particle.targetY;

        particle._radius = Math.sqrt(dx * dx + dy * dy); // distance to target
        particle._angle = Math.atan2(dy, dx);            // angle around the target
        particle._turns = swirlTurns + Math.random();             // full spiral turns (can tweak)

        particle._started = true;
      }

      // Shrink radius from initial → 0
      const currentRadius = particle._radius * (1 - ease);

      // Rotate clockwise over time (more ease = more angle)
      const angle = particle._angle + (spiralDirection * 2 * Math.PI * particle._turns * ease);

      // Position relative to target
      particle.x = particle.targetX + currentRadius * Math.cos(angle);
      particle.y = particle.targetY + currentRadius * Math.sin(angle);

      // Optional scale pulse or shrink
      if (affectScale) {
        particle.scale = 1 + 2 * (1 - ease); // start large, shrink to normal
      } else {
        particle.scale = 1;
      }

      // Fade in as it approaches center
      if (affectOpacity) {
        particle.opacity = ease;
      } else {
        particle.opacity = 1;
      }

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
    easingType: "ease-in-out",
    affectOpacity: true,
    affectScale: true
  },
  commonControls: {
    startPosition: true,
    delay: true,
  },
  getCode: (config: EffectConfigurations['SUPER_SWIRL']) => `
    return (() => {
      const config = ${JSON.stringify(config, null, 2)};
      const {swirlTurns, spiralDirection, easingType, affectOpacity, affectScale} = config;
      const easingConfig = ${easingConfigString};

      return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const t = Math.min(progress, 1);
        const ease = easingConfig[easingType](t);

        // On first run: calculate offset vector and initial angle
        if (!particle._started) {
          const dx = particle.initialX - particle.targetX;
          const dy = particle.initialY - particle.targetY;

          particle._radius = Math.sqrt(dx * dx + dy * dy);          // distance to target
          particle._angle = Math.atan2(dy, dx);                     // angle around the target
          particle._turns = swirlTurns + Math.random();             // full spiral turns (can tweak)

          particle._started = true;
        }

        // Shrink radius from initial → 0
        const currentRadius = particle._radius * (1 - ease);

        // Rotate clockwise over time (more ease = more angle)
        const angle = particle._angle + (spiralDirection * 2 * Math.PI * particle._turns * ease);

        // Position relative to target
        particle.x = particle.targetX + currentRadius * Math.cos(angle);
        particle.y = particle.targetY + currentRadius * Math.sin(angle);

        // Optional scale pulse or shrink
        if (affectScale) {
          particle.scale = 1 + 2 * (1 - ease); // start large, shrink to normal
        } else {
          particle.scale = 1;
        }

        // Fade in as it approaches center
        if (affectOpacity) {
          particle.opacity = ease;
        } else {
          particle.opacity = 1;
        }

        // Color could shift too (optional)
        particle.color = \`rgba(255,255,255,\${particle.opacity})\`;

        // Final snap
        if (t >= 1) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.opacity = 1;
          particle.scale = 1;
        }
      }
    })()
  `,
}

const buildEffectOption: EffectOption<'BUILD'> = {
  factory: (config) => {
    return (particle, animationStartTime, currentTime, _canvasDimensions, animationDuration) => {
      const {horizontalPhaseEnd, verticalCompressionFactor, scalingBoost, bouncyIntensity, bouncyOffset} = config;
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      // Hardcoded values for removed properties (optimized for best visual impact)
      const bounceEndPoint = 1;
      const decompressionStart = 0.6;
      const decompressionEasing = 1.1;
      const horizontalScaleShrink = 0.2;
      const verticalScaleShrink = 0.1;
      const scalingPhaseEnd = 0.5;

      // --- Initialization ---
      if (!particle.customProps) {
        particle.customProps = {
          originalScale: particle.scale,
          originalOpacity: particle.opacity,
        };
      }

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
    verticalCompressionFactor: 0.45,
    scalingBoost: 0.3,
    bouncyIntensity: 10,
    bouncyOffset: 0.75,
    startPosition: "center"
  },
  commonControls: {
    startPosition: true,
    delay: true,
  },
  getCode: (config: EffectConfigurations['BUILD']) => ` 
    return (() => {
      const config = ${JSON.stringify(config, null, 2)};

      return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const {horizontalPhaseEnd, verticalCompressionFactor, scalingBoost, bouncyIntensity, bouncyOffset} = config;

        // Hardcoded values for removed properties (optimized for best visual impact)
        const bounceEndPoint = 1;
        const decompressionStart = 0.6;
        const decompressionEasing = 1.1;
        const horizontalScaleShrink = 0.2;
        const verticalScaleShrink = 0.1;
        const scalingPhaseEnd = 0.5;

        // --- Initialization ---
        if (!particle.customProps) {
          particle.customProps = {
            originalScale: particle.scale,
            originalOpacity: particle.opacity,
          };
        }

        // --- Animation Finalization ---
        if (progress >= 1) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.scale = particle.customProps.originalScale;
          particle.opacity = particle.customProps.originalOpacity;
          return particle;
        }

        // Configurable bouncy easing function
        const bouncyEaseOut = (t) => {
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
      }
    })()
  `,
}

const oppenheimerEffectOption: EffectOption<'OPPENHEIMER'> = {
  factory: (config) => {
    return (particle, animationStartTime, currentTime, _canvasDimensions, animationDuration) => {
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

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
      const opacityBase = particle.windProps.originalOpacity;
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
  },
  defaultConfig: {
    windStrength: 1.0,
    turbulenceScale: 60,
    oscillationAmount: 1.5,
    settlingSpeed: 1.5,
    particleWeight: 0.7
  },
  commonControls: {
    startPosition: true,
    delay: true,
  },
  getCode: (config: EffectConfigurations['OPPENHEIMER']) => `
    return (() => {
      const config = ${JSON.stringify(config, null, 2)};
      // Default configuration
      const {
        windStrength,        // 0-1: Overall wind intensity
        turbulenceScale,      // 0-100: Chaos/displacement amount
        oscillationAmount,   // 0-2: Swaying/flutter intensity
        settlingSpeed,       // 0-2: Speed of reaching target (1 = normal)
        particleWeight       // 0-2: Wind resistance (1 = normal, higher = more resistance)
      } = config;

      return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

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
        const opacityBase = particle.windProps.originalOpacity;
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
            const hslMatch = particle.color.match(/hsl\\((\\d+),\\s*(\\d+)%,\\s*(\\d+)%\\)/);
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

        particle.color = \`hsl(\${newHue}, \${newSaturation}%, \${newLightness}%)\`;

        // Ensure particles complete their journey
        if (progress >= 1) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.scale = particle.windProps.originalScale;
          particle.opacity = particle.windProps.originalOpacity;
        }
      }
    })()
  `
}

const scanningEffectOption: EffectOption<'SCANNING'> = {
  factory: (config) => {
    return (particle, animationStartTime, currentTime, _canvasDimensions, animationDuration, textBoundaries) => {
      const {oscillationFrequency, settlementThreshold, scanningRange, passDistribution, settlementTiming} = config
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      const totalPasses = oscillationFrequency * 2; // Each cycle has 2 passes (left-to-right and right-to-left)

      // One-time initialization
      if (particle.animation === undefined) {
        // Convert UUID string to a numeric hash for modulo operation
        particle.id = crypto.randomUUID();
        const uuidHash = (particle.id as string).split('').reduce((hash, char) => {
          return (hash << 5) - hash + char.charCodeAt(0);
        }, 0);
        const particleId = Math.abs(uuidHash);

        // Assign each particle to a specific pass based on passDistribution
        const usablePasses = Math.max(1, Math.floor(totalPasses * passDistribution));
        let assignedPass: number;

        // Apply settlement timing strategy
        if (settlementTiming === 'early') {
          // Most particles settle in first third of passes
          const earlyPasses = Math.max(1, Math.floor(usablePasses / 3));
          assignedPass = (particleId % earlyPasses) + 1;
        } else if (settlementTiming === 'late') {
          // Most particles settle in last third of passes
          const latePasses = Math.max(1, Math.floor(usablePasses / 3));
          const startPass = usablePasses - latePasses + 1;
          assignedPass = (particleId % latePasses) + startPass;
        } else {
          // Distributed across all usable passes
          assignedPass = (particleId % usablePasses) + 1;
        }

        particle.animation = {
          settled: false,
          assignedPass, // Which pass this particle should settle on
          currentPass: 0, // Track current pass number
        };

        particle.y = particle.targetY;
        particle.opacity = 1;
      }

      // If particle has already settled, don't move it
      if (particle.animation.settled) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        return particle;
      }

      // Wait for valid bounds
      const cutWidth = textBoundaries.maxX - textBoundaries.minX;
      if (cutWidth <= 0 || !isFinite(cutWidth)) {
        return particle;
      }

      // Create oscillation using sine wave (back and forth motion)
      const oscillationProgress = Math.sin(
        progress * oscillationFrequency * Math.PI * 2,
      );

      // Calculate which pass we're currently on by tracking oscillation cycles
      const passProgress = progress * totalPasses;
      const currentPass = Math.min(Math.floor(passProgress) + 1, totalPasses);

      // Update current pass tracking
      if (currentPass > particle.animation.currentPass) {
        particle.animation.currentPass = currentPass;
      }

      // Map sine wave (-1 to 1) to actual X positions
      const leftEdge = textBoundaries.minX - scanningRange;
      const rightEdge = textBoundaries.maxX + scanningRange;
      const cutX =
        leftEdge + ((oscillationProgress + 1) / 2) * (rightEdge - leftEdge);

      // Move unsettled particles with the cut
      particle.x = cutX;

      // Check if cut is passing over this particle's target location
      const distanceFromTarget = Math.abs(particle.x - particle.targetX);

      // Settle particle if we're on its assigned pass and the cut is close enough
      if (
        particle.animation.currentPass >= particle.animation.assignedPass &&
        distanceFromTarget <= settlementThreshold
      ) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.animation.settled = true;
      }
    }
  },
  defaultConfig: {
    oscillationFrequency: 3,
    settlementThreshold: 12,
    scanningRange: 30,
    passDistribution: 0.85,
    settlementTiming: 'distributed'
  },
  commonControls: {
    startPosition: false,  // SCANNING handles its own positioning logic
    delay: true,
  },
  getCode: (config: EffectConfigurations['SCANNING']) => `
    return (() => {
      const config = ${JSON.stringify(config, null, 2)};
      const {oscillationFrequency, settlementThreshold, scanningRange, passDistribution, settlementTiming} = config;

      return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration, textBoundaries) => {
        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const totalPasses = oscillationFrequency * 2; // Each cycle has 2 passes (left-to-right and right-to-left)

        // One-time initialization
        if (particle.animation === undefined) {
          // Convert UUID string to a numeric hash for modulo operation
          particle.id = crypto.randomUUID();
          const uuidHash = particle.id.split('').reduce((hash, char) => {
            return (hash << 5) - hash + char.charCodeAt(0);
          }, 0);
          const particleId = Math.abs(uuidHash);

          // Assign each particle to a specific pass based on passDistribution
          const usablePasses = Math.max(1, Math.floor(totalPasses * passDistribution));
          let assignedPass;

          // Apply settlement timing strategy
          if (settlementTiming === 'early') {
            // Most particles settle in first third of passes
            const earlyPasses = Math.max(1, Math.floor(usablePasses / 3));
            assignedPass = (particleId % earlyPasses) + 1;
          } else if (settlementTiming === 'late') {
            // Most particles settle in last third of passes
            const latePasses = Math.max(1, Math.floor(usablePasses / 3));
            const startPass = usablePasses - latePasses + 1;
            assignedPass = (particleId % latePasses) + startPass;
          } else {
            // Distributed across all usable passes
            assignedPass = (particleId % usablePasses) + 1;
          }

          particle.animation = {
            settled: false,
            assignedPass, // Which pass this particle should settle on
            currentPass: 0, // Track current pass number
          };

          particle.y = particle.targetY;
          particle.opacity = 1;
        }

        // If particle has already settled, don't move it
        if (particle.animation.settled) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          return particle;
        }

        // Wait for valid bounds
        const cutWidth = textBoundaries.maxX - textBoundaries.minX;
        if (cutWidth <= 0 || !isFinite(cutWidth)) {
          return particle;
        }

        // Create oscillation using sine wave (back and forth motion)
        const oscillationProgress = Math.sin(
          progress * oscillationFrequency * Math.PI * 2,
        );

        // Calculate which pass we're currently on by tracking oscillation cycles
        const passProgress = progress * totalPasses;
        const currentPass = Math.min(Math.floor(passProgress) + 1, totalPasses);

        // Update current pass tracking
        if (currentPass > particle.animation.currentPass) {
          particle.animation.currentPass = currentPass;
        }

        // Map sine wave (-1 to 1) to actual X positions
        const leftEdge = textBoundaries.minX - scanningRange;
        const rightEdge = textBoundaries.maxX + scanningRange;
        const cutX =
          leftEdge + ((oscillationProgress + 1) / 2) * (rightEdge - leftEdge);

        // Move unsettled particles with the cut
        particle.x = cutX;

        // Check if cut is passing over this particle's target location
        const distanceFromTarget = Math.abs(particle.x - particle.targetX);

        // Settle particle if we're on its assigned pass and the cut is close enough
        if (
          particle.animation.currentPass >= particle.animation.assignedPass &&
          distanceFromTarget <= settlementThreshold
        ) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.animation.settled = true;
        }
      }
    })()
  `
}

const explosionEffectOption: EffectOption<'EXPLOSION'> = {
  factory: (config) => {
    return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
      const {explosionStrength, deconstructionPhase, orbitalRadius, depthOffset} = config;
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      if (!particle.isInitialized) {
        particle.isInitialized = true;

        // 1. Define the DECONSTRUCTION (explosion) vector.
        // Each particle shatters away from its starting point into deep space.
        const explosionDistance = explosionStrength + Math.random() * explosionStrength * 0.5;
        const angle = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        particle.explodedPos = {
          x:
            particle.initialX +
            Math.cos(angle) * Math.sin(phi) * explosionDistance,
          y:
            particle.initialY +
            Math.sin(angle) * Math.sin(phi) * explosionDistance,
          z: depthOffset + Math.cos(phi) * explosionDistance, // Explode away from the viewer
        };

        // 2. Store final target position relative to the center.
        particle.finalPos = {
          x: particle.targetX,
          y: particle.targetY,
          z: 0,
        };
      }

      let currentPos;
      let baseOpacity = 1;

      // --- ACT I & II: Deconstruction and The Pull ---
      const deconstructionPhaseEnd = deconstructionPhase;
      if (progress < deconstructionPhaseEnd) {
        // Phase 1: Explode outwards from initial position.
        const phaseProgress = progress / deconstructionPhaseEnd;
        const easedPhaseProgress = easingConfig['ease-out-quart'](phaseProgress);
        currentPos = {
          x:
            particle.initialX +
            (particle.explodedPos.x - particle.initialX) * easedPhaseProgress,
          y:
            particle.initialY +
            (particle.explodedPos.y - particle.initialY) * easedPhaseProgress,
          z: 0 + (particle.explodedPos.z - 0) * easedPhaseProgress,
        };
        // Glow brightly on explosion
        baseOpacity = 1 + 1.5 * Math.sin(phaseProgress * Math.PI);
      } else {
        // Phase 2 & 3: Fly from the exploded point to the final target.
        const phaseProgress =
          (progress - deconstructionPhaseEnd) / (1 - deconstructionPhaseEnd);
        const easedPhaseProgress = easingConfig['ease-in-out-quint'](phaseProgress);
        currentPos = {
          x:
            particle.explodedPos.x +
            (particle.finalPos.x - particle.explodedPos.x) * easedPhaseProgress,
          y:
            particle.explodedPos.y +
            (particle.finalPos.y - particle.explodedPos.y) * easedPhaseProgress,
          z:
            particle.explodedPos.z +
            (particle.finalPos.z - particle.explodedPos.z) * easedPhaseProgress,
        };
        // Glow during high-speed travel
        baseOpacity = 1 + 0.8 * Math.sin(phaseProgress * Math.PI);

        // --- ACT III: Orbital Settling ---
        const settleProgress = Math.max(0, (phaseProgress - 0.7) / 0.3);
        if (settleProgress > 0) {
          const settleDecay = 1 - settleProgress; // The wobble shrinks over time.
          const settleAngle = settleProgress * Math.PI * 4; // 2 full orbital wobbles.
          const settleRadius = orbitalRadius * settleDecay * settleDecay;
          currentPos.x += Math.cos(settleAngle) * settleRadius;
          currentPos.y += Math.sin(settleAngle) * settleRadius;
        }
      }

      // --- Final 3D Projection ---
      const perspective = canvasDimensions.width * 1.2;
      const projectionScale = perspective / (perspective - currentPos.z);

      particle.x =
        (currentPos.x - canvasDimensions.width / 2) * projectionScale +
        canvasDimensions.width / 2;
      particle.y =
        (currentPos.y - canvasDimensions.height / 2) * projectionScale +
        canvasDimensions.height / 2;
      particle.scale = Math.max(0, projectionScale);
      particle.opacity = Math.max(0, Math.min(1, projectionScale)) * baseOpacity;

      // Snap to final state at the very end to guarantee perfect alignment.
      if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.scale = 1;
        particle.opacity = 1;
      }
    };

  },
  defaultConfig: {
    explosionStrength: 1000,
    deconstructionPhase: 0.4,
    orbitalRadius: 15,
    depthOffset: -500,
  },
  commonControls: {
    startPosition: true,
    delay: true,
  },
  getCode: (config: EffectConfigurations['EXPLOSION']) => `
    return (() => {
      const config = ${JSON.stringify(config, null, 2)};
      const {explosionStrength, deconstructionPhase, orbitalRadius, depthOffset} = config;
      const easingConfig = ${easingConfigString};

      return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        if (!particle.isInitialized) {
          particle.isInitialized = true;

          // 1. Define the DECONSTRUCTION (explosion) vector.
          // Each particle shatters away from its starting point into deep space.
          const explosionDistance = explosionStrength + Math.random() * explosionStrength * 0.5;
          const angle = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          particle.explodedPos = {
            x:
              particle.initialX +
              Math.cos(angle) * Math.sin(phi) * explosionDistance,
            y:
              particle.initialY +
              Math.sin(angle) * Math.sin(phi) * explosionDistance,
            z: depthOffset + Math.cos(phi) * explosionDistance, // Explode away from the viewer
          };

          // 2. Store final target position relative to the center.
          particle.finalPos = {
            x: particle.targetX,
            y: particle.targetY,
            z: 0,
          };
        }

        let currentPos;
        let baseOpacity = 1;

        // --- ACT I & II: Deconstruction and The Pull ---
        const deconstructionPhaseEnd = deconstructionPhase;
        if (progress < deconstructionPhaseEnd) {
          // Phase 1: Explode outwards from initial position.
          const phaseProgress = progress / deconstructionPhaseEnd;
          const easedPhaseProgress = easingConfig['ease-out-quart'](phaseProgress);
          currentPos = {
            x:
              particle.initialX +
              (particle.explodedPos.x - particle.initialX) * easedPhaseProgress,
            y:
              particle.initialY +
              (particle.explodedPos.y - particle.initialY) * easedPhaseProgress,
            z: 0 + (particle.explodedPos.z - 0) * easedPhaseProgress,
          };
          // Glow brightly on explosion
          baseOpacity = 1 + 1.5 * Math.sin(phaseProgress * Math.PI);
        } else {
          // Phase 2 & 3: Fly from the exploded point to the final target.
          const phaseProgress =
            (progress - deconstructionPhaseEnd) / (1 - deconstructionPhaseEnd);
          const easedPhaseProgress = easingConfig['ease-in-out-quint'](phaseProgress);
          currentPos = {
            x:
              particle.explodedPos.x +
              (particle.finalPos.x - particle.explodedPos.x) * easedPhaseProgress,
            y:
              particle.explodedPos.y +
              (particle.finalPos.y - particle.explodedPos.y) * easedPhaseProgress,
            z:
              particle.explodedPos.z +
              (particle.finalPos.z - particle.explodedPos.z) * easedPhaseProgress,
          };
          // Glow during high-speed travel
          baseOpacity = 1 + 0.8 * Math.sin(phaseProgress * Math.PI);

          // --- ACT III: Orbital Settling ---
          const settleProgress = Math.max(0, (phaseProgress - 0.7) / 0.3);
          if (settleProgress > 0) {
            const settleDecay = 1 - settleProgress; // The wobble shrinks over time.
            const settleAngle = settleProgress * Math.PI * 4; // 2 full orbital wobbles.
            const settleRadius = orbitalRadius * settleDecay * settleDecay;
            currentPos.x += Math.cos(settleAngle) * settleRadius;
            currentPos.y += Math.sin(settleAngle) * settleRadius;
          }
        }

        // --- Final 3D Projection ---
        const perspective = canvasDimensions.width * 1.2;
        const projectionScale = perspective / (perspective - currentPos.z);

        particle.x =
          (currentPos.x - canvasDimensions.width / 2) * projectionScale +
          canvasDimensions.width / 2;
        particle.y =
          (currentPos.y - canvasDimensions.height / 2) * projectionScale +
          canvasDimensions.height / 2;
        particle.scale = Math.max(0, projectionScale);
        particle.opacity = Math.max(0, Math.min(1, projectionScale)) * baseOpacity;

        // Snap to final state at the very end to guarantee perfect alignment.
        if (progress >= 1) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.scale = 1;
          particle.opacity = 1;
        }
      }
    })()
  `
}

const helixSpiralEffectOption: EffectOption<'HELIX_SPIRAL'> = {
  factory: (config) => {
    return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
      const {helixRadius, helixTurns, helixHeight, rotationSpeed, easingType, perspective, affectOpacity} = config;
      const elapsedTime = currentTime - animationStartTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      if (!particle.isInitialized) {
        particle.isInitialized = true;

        // Calculate initial position around the helix cylinder
        const angle = Math.random() * Math.PI * 2;
        const actualHelixRadius = (helixRadius / 100) * Math.min(canvasDimensions.width, canvasDimensions.height);
        const actualHelixHeight = (helixHeight / 100) * canvasDimensions.height;
        const heightOffset = (Math.random() - 0.5) * actualHelixHeight;

        // Store helix parameters
        particle.helixAngle = angle;
        particle.helixHeight = heightOffset;
        particle.helixPhase = Math.random() * Math.PI * 2; // Random phase for variation

        // Store initial 3D position on helix
        particle.helixStartPos = {
          x: canvasDimensions.width / 2 + Math.cos(angle) * actualHelixRadius,
          y: canvasDimensions.height / 2 + heightOffset,
          z: Math.sin(angle) * actualHelixRadius,
        };

        // Store calculated dimensions for use during animation
        particle.actualHelixRadius = actualHelixRadius;
        particle.actualHelixHeight = actualHelixHeight;

        // Store final target position
        particle.finalPos = {
          x: particle.targetX,
          y: particle.targetY,
          z: 0,
        };
      }

      const t = Math.min(progress, 1);
      const easedProgress = easingConfig[easingType](t);

      // Calculate current position along the helix
      const currentAngle = particle.helixAngle + (helixTurns * 2 * Math.PI * t * rotationSpeed);
      const currentHeight = particle.helixHeight * (1 - easedProgress);

      // Interpolate between helix path and final position
      const helixX = canvasDimensions.width / 2 + Math.cos(currentAngle) * particle.actualHelixRadius * (1 - easedProgress);
      const helixY = canvasDimensions.height / 2 + currentHeight;
      const helixZ = Math.sin(currentAngle) * particle.actualHelixRadius * (1 - easedProgress);

      // Blend from helix position to final target
      const currentPos = {
        x: helixX + (particle.finalPos.x - helixX) * easedProgress,
        y: helixY + (particle.finalPos.y - helixY) * easedProgress,
        z: helixZ + (particle.finalPos.z - helixZ) * easedProgress,
      };

      // Add subtle oscillation for more dynamic movement
      const oscillation = Math.sin(t * Math.PI * 4 + particle.helixPhase) * 10 * (1 - easedProgress);
      currentPos.x += oscillation * Math.cos(currentAngle + Math.PI / 2);
      currentPos.y += oscillation * 0.5;

      // Apply 3D perspective projection
      const perspectiveScale = perspective / (perspective - currentPos.z);

      particle.x = (currentPos.x - canvasDimensions.width / 2) * perspectiveScale + canvasDimensions.width / 2;
      particle.y = (currentPos.y - canvasDimensions.height / 2) * perspectiveScale + canvasDimensions.height / 2;
      particle.scale = Math.max(0.1, perspectiveScale);

      // Apply opacity based on settings
      if (affectOpacity) {
        // Fade in as particles approach their target
        particle.opacity = Math.max(0, Math.min(1, perspectiveScale)) * (0.3 + 0.7 * easedProgress);
      } else {
        // Keep opacity consistent, only affected by perspective
        particle.opacity = Math.max(0, Math.min(1, perspectiveScale));
      }

      // Add subtle color shifting based on depth
      const depthFactor = (currentPos.z + particle.actualHelixRadius) / (particle.actualHelixRadius * 2);
      const colorShift = Math.max(0.6, Math.min(1, depthFactor));
      particle.color = `rgba(${Math.floor(255 * colorShift)}, ${Math.floor(255 * colorShift)}, 255, ${particle.opacity})`;

      // Final snap to ensure perfect alignment
      if (t >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.scale = 1;
        particle.opacity = 1;
        particle.color = 'rgba(255, 255, 255, 1)';
      }
    };
  },
  defaultConfig: {
    helixRadius: 20, // 20% of min canvas dimension
    helixTurns: 3,
    helixHeight: 50, // 50% of canvas height
    rotationSpeed: 1,
    easingType: "ease-in-out-quint",
    perspective: 800,
    affectOpacity: false,
  },
  commonControls: {
    startPosition: false,
    delay: true,
  },
  getCode: (config: EffectConfigurations['HELIX_SPIRAL']) => `
    return (() => {
      const config = ${JSON.stringify(config, null, 2)};
      const {helixRadius, helixTurns, helixHeight, rotationSpeed, easingType, perspective, affectOpacity} = config;
      const easingConfig = ${easingConfigString};

      return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        if (!particle.isInitialized) {
          particle.isInitialized = true;

          // Calculate initial position around the helix cylinder
          const angle = Math.random() * Math.PI * 2;
          const actualHelixRadius = (helixRadius / 100) * Math.min(canvasDimensions.width, canvasDimensions.height);
          const actualHelixHeight = (helixHeight / 100) * canvasDimensions.height;
          const heightOffset = (Math.random() - 0.5) * actualHelixHeight;

          // Store helix parameters
          particle.helixAngle = angle;
          particle.helixHeight = heightOffset;
          particle.helixPhase = Math.random() * Math.PI * 2; // Random phase for variation

          // Store initial 3D position on helix
          particle.helixStartPos = {
            x: canvasDimensions.width / 2 + Math.cos(angle) * actualHelixRadius,
            y: canvasDimensions.height / 2 + heightOffset,
            z: Math.sin(angle) * actualHelixRadius,
          };

          // Store calculated dimensions for use during animation
          particle.actualHelixRadius = actualHelixRadius;
          particle.actualHelixHeight = actualHelixHeight;

          // Store final target position
          particle.finalPos = {
            x: particle.targetX,
            y: particle.targetY,
            z: 0,
          };
        }

        const t = Math.min(progress, 1);
        const easedProgress = easingConfig[easingType](t);

        // Calculate current position along the helix
        const currentAngle = particle.helixAngle + (helixTurns * 2 * Math.PI * t * rotationSpeed);
        const currentHeight = particle.helixHeight * (1 - easedProgress);

        // Interpolate between helix path and final position
        const helixX = canvasDimensions.width / 2 + Math.cos(currentAngle) * particle.actualHelixRadius * (1 - easedProgress);
        const helixY = canvasDimensions.height / 2 + currentHeight;
        const helixZ = Math.sin(currentAngle) * particle.actualHelixRadius * (1 - easedProgress);

        // Blend from helix position to final target
        const currentPos = {
          x: helixX + (particle.finalPos.x - helixX) * easedProgress,
          y: helixY + (particle.finalPos.y - helixY) * easedProgress,
          z: helixZ + (particle.finalPos.z - helixZ) * easedProgress,
        };

        // Add subtle oscillation for more dynamic movement
        const oscillation = Math.sin(t * Math.PI * 4 + particle.helixPhase) * 10 * (1 - easedProgress);
        currentPos.x += oscillation * Math.cos(currentAngle + Math.PI / 2);
        currentPos.y += oscillation * 0.5;

        // Apply 3D perspective projection
        const perspectiveScale = perspective / (perspective - currentPos.z);

        particle.x = (currentPos.x - canvasDimensions.width / 2) * perspectiveScale + canvasDimensions.width / 2;
        particle.y = (currentPos.y - canvasDimensions.height / 2) * perspectiveScale + canvasDimensions.height / 2;
        particle.scale = Math.max(0.1, perspectiveScale);

        // Apply opacity based on settings
        if (affectOpacity) {
          // Fade in as particles approach their target
          particle.opacity = Math.max(0, Math.min(1, perspectiveScale)) * (0.3 + 0.7 * easedProgress);
        } else {
          // Keep opacity consistent, only affected by perspective
          particle.opacity = Math.max(0, Math.min(1, perspectiveScale));
        }

        // Add subtle color shifting based on depth
        const depthFactor = (currentPos.z + particle.actualHelixRadius) / (particle.actualHelixRadius * 2);
        const colorShift = Math.max(0.6, Math.min(1, depthFactor));
        particle.color = \`rgba(\${Math.floor(255 * colorShift)}, \${Math.floor(255 * colorShift)}, 255, \${particle.opacity})\`;

        // Final snap to ensure perfect alignment
        if (t >= 1) {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.scale = 1;
          particle.opacity = 1;
          particle.color = 'rgba(255, 255, 255, 1)';
        }
      }
    })()
  `
}

export const effectOptions = {
  [EffectTypes.SUPER_SWIRL]: superSwirlEffectOption,
  [EffectTypes.BUILD]: buildEffectOption,
  [EffectTypes.OPPENHEIMER]: oppenheimerEffectOption,
  [EffectTypes.SCANNING]: scanningEffectOption,
  [EffectTypes.EXPLOSION]: explosionEffectOption,
  [EffectTypes.HELIX_SPIRAL]: helixSpiralEffectOption,
} as const;
