(function(){"use strict";const ot="random",N="DEV_EXAMPLE",st="WIX 🤠",V="#ffffff",rt=["#ff0000","#00ff00","#0000ff"],Q={fontFamily:"Arial",fontSize:90,italic:!1,weight:400,letterSpacing:0,textColor:V},ct=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,C=`/**
 * Define an animation function for moving a particle towards its target coordinates.
 *
 * @param {Object} particle - The particle object to be animated.
 * @param {number} particle.x - The current x-coordinate of the particle.
 * @param {number} particle.y - The current y-coordinate of the particle.
 * @param {number} particle.initialX - The initial x-coordinate for the particle.
 * @param {number} particle.initialY - The initial y-coordinate for the particle.
 * @param {number} particle.targetX - The target x-coordinate for the particle.
 * @param {number} particle.targetY - The target y-coordinate for the particle.
 * @param {number} particle.scale - The scale of the particle.
 * @param {number} particle.opacity - The opacity of the particle.
 * @param {string} particle.color - The color of the particle.
 * @param {number} animationStartTime - The timestamp when the animation started.
 * @param {number} currentTime - The current timestamp of the animation frame.
 * @param {Object} canvasDimensions - The dimensions of the canvas.
 * @param {number} canvasDimensions.width - Width of the canvas where particles are being rendered.
 * @param {number} canvasDimensions.height - Height of the canvas where particles are being rendered.
 * @param {number} animationDuration - The duration of the animation.
 * @returns {Function} A function to be called on each animation frame to update the particle's position.
 */
`,lt=`${C}
return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    /**
    * Write your movement animation code here to incrementally update particle position.
    * The particle is mutable here so you can add whatever properties you need to achieve your animation.
    */

    // Helper function for getting new position value.
    const getUpdatedPosition = (currentPosition, targetPosition, delta) => {
        const distance = Math.abs(currentPosition - targetPosition)
        if (distance <= delta) {
            return targetPosition
        } else {
            return currentPosition < targetPosition ? currentPosition + delta : currentPosition - delta
        }
    }

    // Elapsed time since the start of the animation.
    const totalElapsedTime = currentTime - animationStartTime

    const initialDelta = 1
    // After 1 second, the particles will move twice as fast.
    const delta = totalElapsedTime < 1000 ? initialDelta : initialDelta * 2

    // To keep the example simple, particle coordinates are updated by delta until target coordinates are reached.
    particle.x = getUpdatedPosition(particle.x, particle.targetX, delta)
    particle.y = getUpdatedPosition(particle.y, particle.targetY, delta)
}`,Z=1300;var y=(e=>(e.INITIALIZE="INITIALIZE",e.PLAY="PLAY",e.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",e.UPDATE_START_POSITION="UPDATE_START_POSITION",e.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",e.UPDATE_SELECTED_EFFECT="UPDATE_SELECTED_EFFECT",e.UPDATE_EFFECT_CONFIGURATION="UPDATE_EFFECT_CONFIGURATION",e.UPDATE_BITMAP="UPDATE_BITMAP",e.UPDATE_TEXT="UPDATE_TEXT",e.UPDATE_FONT="UPDATE_FONT",e.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",e.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",e.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",e.UPDATE_ENABLE_IMAGE_PARTICLES="UPDATE_ENABLE_IMAGE_PARTICLES",e))(y||{}),E=(e=>(e.INITIALIZED="INITIALIZED",e.UPDATE_APP_PROPS="UPDATE_APP_PROPS",e))(E||{});const ut=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
    * Linear easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"sineIn",definition:"const sineIn = (t) => 1 - Math.cos((t * Math.PI) / 2);",comment:`/**
    * Sine-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"sineOut",definition:"const sineOut = (t) => Math.sin((t * Math.PI) / 2);",comment:`/**
    * Sine-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"sineInOut",definition:"const sineInOut = (t) => -(Math.cos(Math.PI * t) - 1) / 2;",comment:`/**
    * Sine-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quadIn",definition:"const quadIn = (t) => t ** 2;",comment:`/**
    * Quadratic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quadOut",definition:"const quadOut = (t) => 1 - (1 - t) ** 2;",comment:`/**
    * Quadratic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quadInOut",definition:"const quadInOut = (t) => t < 0.5 ? 2 * t ** 2 : 1 - (-2 * t + 2) ** 2 / 2;",comment:`/**
    * Quadratic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"cubicIn",definition:"const cubicIn = t => t ** 3;",comment:`/**
    * Cubic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"cubicOut",definition:"const cubicOut = t => 1 - (1 - t) ** 3;",comment:`/**
    * Cubic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"cubicInOut",definition:"const cubicInOut = t => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);",comment:`/**
    * Cubic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quartIn",definition:"const quartIn = t => t ** 4;",comment:`/**
    * Quartic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quartOut",definition:"const quartOut = t => 1 - (1 - t) ** 4;",comment:`/**
    * Quartic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quartInOut",definition:"const quartInOut = t => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);",comment:`/**
    * Quartic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quintIn",definition:"const quintIn = t => t ** 5;",comment:`/**
    * Quintic-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quintOut",definition:"const quintOut = t => 1 - (1 - t) ** 5;",comment:`/**
    * Quintic-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"quintInOut",definition:"const quintInOut = t => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);",comment:`/**
    * Quintic-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"expoIn",definition:"const expoIn = t => (t === 0 ? 0 : 2 ** (10 * t - 10));",comment:`/**
    * Exponential-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"expoOut",definition:"const expoOut = t => (t === 1 ? 1 : 1 - 2 ** (-10 * t));",comment:`/**
    * Exponential-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"expoInOut",definition:`const expoInOut = t =>
  t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? 2 ** (20 * t - 10) / 2
    : (2 - 2 ** (-20 * t + 10)) / 2;`,comment:`/**
    * Exponential-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"circIn",definition:"const circIn = t => 1 - Math.sqrt(1 - t ** 2);",comment:`/**
    * Circular-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"circOut",definition:"const circOut = t => Math.sqrt(1 - (t - 1) ** 2);",comment:`/**
    * Circular-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"circInOut",definition:`const circInOut = t =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t ** 2)) / 2
    : (Math.sqrt(-(2 * t - 3) * (2 * t - 1)) + 1) / 2;`,comment:`/**
    * Circular-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"backIn",definition:"const backIn = t => 2.70158 * t ** 3 - 1.70158 * t ** 2;",comment:`/**
    * Back-in easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"backOut",definition:"const backOut = t => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;",comment:`/**
    * Back-out easing function.
    * @param t - The time value (between 0 and 1).
    * @returns The eased value.
    */`},{name:"backInOut",definition:`const backInOut = (t, k = 1.70158 * 1.525) =>
      t < 0.5
        ? ((2 * t) ** 2 * ((k + 1) * 2 * t - k)) / 2
        : ((2 * t - 2) ** 2 * ((k + 1) * (t * 2 - 2) + k) + 2) / 2;`,comment:`/**
    * Back-in-out easing function.
    * @param t - The time value (between 0 and 1).
    * @param k - The back factor (optional, default is 1.70158 * 1.525).
    * @returns The eased value.
    */`},{name:"elasticIn",definition:` const elasticIn = (x) => {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)}`,comment:""},{name:"elasticOut",definition:`const elasticOut = (x) =>{
    const c4 = (2 * Math.PI) / 3;

    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }`,comment:""},{name:"elasticInOut",definition:`const elasticInOut = (x) => {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }`,comment:""}],mt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);

    // Cubic ease-in-out for smooth animation timing
    const t = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    // Initialize control points if not already set
    if (!particle.controlPoint1X) {
        const deltaX = particle.targetX - particle.initialX;
        const deltaY = particle.targetY - particle.initialY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Create control points for a natural curved path
        const midX = (particle.initialX + particle.targetX) / 2;
        const midY = (particle.initialY + particle.targetY) / 2;

        // Offset control points perpendicular to the direct path
        const perpX = -deltaY / distance;
        const perpY = deltaX / distance;

        // Control points create an arc - adjust curvature based on distance
        const curvature = Math.min(distance * 0.3, 150);

        particle.controlPoint1X = particle.initialX + deltaX * 0.3 + perpX * curvature;
        particle.controlPoint1Y = particle.initialY + deltaY * 0.3 + perpY * curvature;

        particle.controlPoint2X = particle.targetX - deltaX * 0.3 + perpX * curvature * 0.5;
        particle.controlPoint2Y = particle.targetY - deltaY * 0.3 + perpY * curvature * 0.5;
    }

    // Cubic Bézier curve calculation: B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
    const oneMinusT = 1 - t;
    const oneMinusT2 = oneMinusT * oneMinusT;
    const oneMinusT3 = oneMinusT2 * oneMinusT;
    const t2 = t * t;
    const t3 = t2 * t;

    particle.x = oneMinusT3 * particle.initialX +
                 3 * oneMinusT2 * t * particle.controlPoint1X +
                 3 * oneMinusT * t2 * particle.controlPoint2X +
                 t3 * particle.targetX;

    particle.y = oneMinusT3 * particle.initialY +
                 3 * oneMinusT2 * t * particle.controlPoint1Y +
                 3 * oneMinusT * t2 * particle.controlPoint2Y +
                 t3 * particle.targetY;

    // Optional: Add rotation based on movement direction for enhanced visual effect
    if (progress > 0) {
        // Calculate tangent vector for rotation
        const tangentX = 3 * oneMinusT2 * (particle.controlPoint1X - particle.initialX) +
                        6 * oneMinusT * t * (particle.controlPoint2X - particle.controlPoint1X) +
                        3 * t2 * (particle.targetX - particle.controlPoint2X);

        const tangentY = 3 * oneMinusT2 * (particle.controlPoint1Y - particle.initialY) +
                        6 * oneMinusT * t * (particle.controlPoint2Y - particle.controlPoint1Y) +
                        3 * t2 * (particle.targetY - particle.controlPoint2Y);

        particle.rotation = Math.atan2(tangentY, tangentX);
    }

    // Scale effect - starts small, grows, then shrinks slightly at the end
    particle.scale = 0.5 + 0.7 * Math.sin(progress * Math.PI);

    // Opacity fades in and stays visible
    particle.opacity = Math.min(1, progress * 3);
};
`,dt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const progress = Math.min((currentTime - animationStartTime) / animationDuration, 1);

    // Initialize properties if not set
    if (!particle.hasInit) {
        particle.hasInit = true;
        particle.originalScale = particle.scale;
        particle.hueOffset = Math.random() * 360; // Random starting hue
        particle.pulseFrequency = 3 + Math.random() * 2; // Individual pulse frequency
    }

    if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        // Direct path with slight delay at beginning
        const adjustedProgress = Math.pow(progress, 0.7);
        particle.x = particle.initialX + (particle.targetX - particle.initialX) * adjustedProgress;
        particle.y = particle.initialY + (particle.targetY - particle.initialY) * adjustedProgress;
    }

    // Dramatic scale pulsation - goes from very small to very large
    const pulseWave = Math.sin(progress * Math.PI * particle.pulseFrequency);

    // Scale gets extremely large at pulse peaks
    if (pulseWave > 0) {
        // Exponential scale increase on positive pulses
        particle.scale = particle.originalScale * (1 + Math.pow(pulseWave, 2) * 15);
    } else {
        // Become very small on negative pulses
        particle.scale = particle.originalScale * 0.2;
    }

    // End at normal scale
    if (progress > 0.9) {
        const finalAdjustment = (progress - 0.9) / 0.1;
        particle.scale = particle.scale * (1 - finalAdjustment) + particle.originalScale * finalAdjustment;
    }

    // Rapid color cycling through entire spectrum
    const hue = (particle.hueOffset + progress * 720) % 360; // 2 complete color cycles
    const saturation = 100; // Full saturation
    const lightness = 50 + 30 * pulseWave; // Brightness changes with pulse

    particle.color = \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;

    // Opacity pulses oppositely to scale
    particle.opacity = 0.4 + 0.6 * (1 - Math.abs(pulseWave));
}`,ht=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const progress = Math.min((currentTime - animationStartTime) / animationDuration, 1);

    // Initialize properties if not set
    if (!particle.hasInit) {
        particle.hasInit = true;
        particle.originalScale = particle.scale;
        particle.timeDialation = 0.3 + Math.random() * 1.4; // How fast/slow time moves for this particle
        particle.temporalPhase = Math.random() * Math.PI * 2; // Phase in time wave
        particle.chronoField = Math.random() * 0.8; // Strength of temporal field
        particle.timeReversal = Math.random() > 0.8; // 20% chance of time reversal
        particle.quantumFluctuation = Math.random() * 0.5; // Quantum time uncertainty
        particle.lastPosition = {x: particle.initialX, y: particle.initialY};
        particle.timeEcho = []; // Trail of previous positions
        particle.maxEchos = 5 + Math.floor(Math.random() * 5);
    }

    // Apply time dilation to progress
    let temporalProgress = progress;
    if (particle.timeReversal && progress > 0.3 && progress < 0.8) {
        // Time reversal in middle section, but still progress overall
        const reversalStrength = Math.sin((progress - 0.3) / 0.5 * Math.PI);
        const baseProgress = Math.pow(progress, 1 / particle.timeDialation);
        temporalProgress = baseProgress * (1 - reversalStrength * 0.6);
    } else {
        temporalProgress = Math.pow(progress, 1 / particle.timeDialation);
    }

    // Add temporal fluctuations
    const timeWave = Math.sin(progress * Math.PI * 4 + particle.temporalPhase);
    const fluctuation = timeWave * particle.quantumFluctuation * 0.2;
    temporalProgress = Math.max(0, Math.min(1, temporalProgress + fluctuation));

    if (progress >= 1) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.scale = particle.originalScale;
        particle.opacity = 1;
    } else {
        // Calculate position based on temporal progress
        let timeX = particle.initialX + (particle.targetX - particle.initialX) * temporalProgress;
        let timeY = particle.initialY + (particle.targetY - particle.initialY) * temporalProgress;

        // Add chronofield distortion - space-time curvature
        const fieldStrength = particle.chronoField * (1 - Math.abs(progress - 0.5) * 2);
        const distortionAngle = progress * Math.PI * 6 + particle.temporalPhase;
        const distortion = Math.sin(distortionAngle) * fieldStrength * 15;

        timeX += distortion;
        timeY += Math.cos(distortionAngle) * distortion * 0.7;

        // Store position in time echo trail
        if (particle.timeEcho.length >= particle.maxEchos) {
            particle.timeEcho.shift(); // Remove oldest echo
        }
        particle.timeEcho.push({x: particle.x || timeX, y: particle.y || timeY, opacity: 1});

        particle.x = timeX;
        particle.y = timeY;

        // Temporal scaling - particles stretch through time
        const timeStretch = 1 + Math.abs(timeWave) * particle.chronoField * 0.5;
        const dialationScale = 1 + (particle.timeDialation - 1) * 0.3 * (1 - progress);
        particle.scale = particle.originalScale * timeStretch * dialationScale;

        // Opacity flickers due to temporal uncertainty
        const uncertainty = Math.sin(progress * Math.PI * 12) * particle.quantumFluctuation;
        particle.opacity = 0.6 + 0.4 * temporalProgress + uncertainty * 0.2;

        // Time reversal creates ghostly effect during reversal phase
        if (particle.timeReversal && progress > 0.3 && progress < 0.8) {
            const reversalStrength = Math.sin((progress - 0.3) / 0.5 * Math.PI);
            particle.opacity *= (1 - reversalStrength * 0.3); // More transparent during reversal
        }
    }

    // Color represents temporal state
    let hue, saturation, lightness;

    if (particle.timeReversal && progress > 0.3 && progress < 0.8) {
        // Time reversal - purple/violet spectrum during reversal phase
        const reversalStrength = Math.sin((progress - 0.3) / 0.5 * Math.PI);
        hue = 280 + temporalProgress * 40;
        saturation = 70 + particle.chronoField * 30 + reversalStrength * 20;
        lightness = 30 + temporalProgress * 50;
    } else if (particle.timeDialation > 1) {
        // Fast time - blue spectrum (blue shift)
        hue = 240 - temporalProgress * 60; // Blue to cyan
        saturation = 80 + particle.timeDialation * 20;
        lightness = 40 + temporalProgress * 40;
    } else {
        // Slow time - red spectrum (red shift)
        hue = 0 + temporalProgress * 60; // Red to yellow
        saturation = 70 + (1 - particle.timeDialation) * 30;
        lightness = 35 + temporalProgress * 45;
    }

    // Add temporal shimmer
    const shimmer = Math.sin(progress * Math.PI * 8 + particle.temporalPhase) * 15;
    lightness = Math.max(0, Math.min(100, lightness + shimmer * particle.chronoField));

    particle.color = \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;
}`,pt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const progress = Math.min((currentTime - animationStartTime) / animationDuration, 1);

    // Initialize elastic properties
    if (!particle.hasInit) {
        particle.hasInit = true;
        particle.elasticity = 0.6 + Math.random() * 0.3; // Bounce factor
        particle.damping = 0.95 + Math.random() * 0.04; // Energy loss per bounce
        particle.bounceCount = 0;
        particle.originalScale = particle.scale;
        particle.lastUpdateTime = animationStartTime;

        // Calculate initial velocity toward target (pixels per second)
        const dx = particle.targetX - particle.initialX;
        const dy = particle.targetY - particle.initialY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        particle.velocityX = (dx / distance) * 480; // pixels per second
        particle.velocityY = (dy / distance) * 480; // pixels per second

        // Create invisible barriers
        particle.barriers = [
            {x: particle.initialX + dx * 0.3, y: particle.initialY + dy * 0.3, normal: {x: 1, y: 0}},
            {x: particle.initialX + dx * 0.6, y: particle.initialY + dy * 0.6, normal: {x: 0, y: 1}},
            {x: particle.initialX + dx * 0.8, y: particle.initialY + dy * 0.8, normal: {x: -1, y: 1}}
        ];

        particle.currentX = particle.initialX;
        particle.currentY = particle.initialY;
        particle.bounceCooldown = {};
    }

    // Calculate actual deltaTime from the time parameters
    const deltaTime = (currentTime - particle.lastUpdateTime) / 1000; // Convert to seconds
    particle.lastUpdateTime = currentTime;

    if (progress < 0.95) {
        // Update position using actual deltaTime
        particle.currentX += particle.velocityX * deltaTime;
        particle.currentY += particle.velocityY * deltaTime;

        // Check for barrier collisions
        particle.barriers.forEach((barrier, index) => {
            const distanceToBarrier = Math.abs(
                (particle.currentX - barrier.x) * barrier.normal.x +
                (particle.currentY - barrier.y) * barrier.normal.y
            );

            // Use time-based bounce prevention instead of frame-based
            const bounceKey = \`bounce_\${index}\`;
            const cooldownDuration = 50; // 50ms cooldown

            if (distanceToBarrier < 15 && (!particle.bounceCooldown[bounceKey] || currentTime - particle.bounceCooldown[bounceKey] > cooldownDuration)) {
                // Calculate reflection
                const dotProduct = particle.velocityX * barrier.normal.x + particle.velocityY * barrier.normal.y;
                particle.velocityX -= 2 * dotProduct * barrier.normal.x * particle.elasticity;
                particle.velocityY -= 2 * dotProduct * barrier.normal.y * particle.elasticity;

                // Apply damping
                particle.velocityX *= particle.damping;
                particle.velocityY *= particle.damping;

                particle.bounceCount++;
                particle.bounceCooldown[bounceKey] = currentTime; // Store the time of bounce
            }
        });

        // Stronger gravity toward target as we approach the end
        const targetDx = particle.targetX - particle.currentX;
        const targetDy = particle.targetY - particle.currentY;
        const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

        if (targetDistance > 5) {
            // Increase attraction strength as we approach the end of animation (pixels per second squared)
            const attractionStrength = (60 + (progress * 180)) * deltaTime; // Time-based acceleration
            particle.velocityX += (targetDx / targetDistance) * attractionStrength;
            particle.velocityY += (targetDy / targetDistance) * attractionStrength;
        }

        particle.x = particle.currentX;
        particle.y = particle.currentY;
    } else {
        // Smooth transition to target in final 5%
        const finalProgress = (progress - 0.95) / 0.05;
        const smoothFinal = finalProgress * finalProgress * (3 - 2 * finalProgress); // Smooth step

        particle.x = particle.currentX + (particle.targetX - particle.currentX) * smoothFinal;
        particle.y = particle.currentY + (particle.targetY - particle.currentY) * smoothFinal;

        // Gradually reduce velocity
        particle.velocityX *= (1 - smoothFinal);
        particle.velocityY *= (1 - smoothFinal);
    }

    // Check if particle has reached target (within 2 pixels)
    const distanceToTarget = Math.sqrt(
        Math.pow(particle.x - particle.targetX, 2) +
        Math.pow(particle.y - particle.targetY, 2)
    );

    if (distanceToTarget < 2) {
        // Snap to exact target position
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.currentX = particle.targetX;
        particle.currentY = particle.targetY;
        particle.velocityX = 0;
        particle.velocityY = 0;
    }

    // Visual effects based on bouncing
    const speed = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);

    // Scale increases with speed and bounces
    const speedScale = 1 + speed * 0.0001; // Adjusted for pixels per second
    const bounceScale = 1 + particle.bounceCount * 0.1;
    particle.scale = Math.max(particle.originalScale * (speedScale * bounceScale) / 4, 1);

    // Color changes with energy (speed) and bounce count
    const energyHue = Math.min(speed * 0.5, 120); // Adjusted for pixels per second
    const bounceHue = (particle.bounceCount * 60) % 360;
    const hue = (energyHue + bounceHue) % 360;
    const saturation = 70 + Math.min(speed * 0.01, 30); // Adjusted for pixels per second
    const lightness = 40 + Math.min(speed * 0.008, 40); // Adjusted for pixels per second

    particle.color = \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;

    // Opacity based on energy
    particle.opacity = 0.5 + Math.min(speed * 0.002, 0.5); // Adjusted for pixels per second

    // Trail effect after bounces
    if (particle.bounceCount > 0) {
        const trailIntensity = Math.min(particle.bounceCount * 0.2, 1);
        particle.opacity = Math.max(particle.opacity, 0.3 + trailIntensity * 0.7);
    }
}`,gt=()=>Object.assign({},{[N]:{code:`${C}${lt}`},DEV_TWO_FRAMES:{code:`${C}${ct}`},bezier:{code:`${C}${mt}`},pulseColorCycle:{code:`${C}${dt}`},timeDistortion:{code:`${C}${ht}`},elasticPlop:{code:`${C}${pt}`}},...ut.map(({name:e,comment:t,definition:i})=>({[e]:{code:`${C}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${t}
    ${i}
    const lerp = (start, end, t) => start + t * (end - start);

    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);
    const easedProgress = ${e}(progress);

    particle.x = lerp(particle.initialX, particle.targetX, easedProgress);
    particle.y = lerp(particle.initialY, particle.targetY, easedProgress);

    if (
        Math.abs(particle.x - particle.targetX) < 1 &&
        Math.abs(particle.y - particle.targetY) < 1
    ) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    }
};`}}))),H=(e,t)=>{const{width:n,height:o,data:r}=e,c=Math.ceil(n/t),u=Math.ceil(o/t),s=new Uint8Array(Math.ceil(n/t)*Math.ceil(o/t));let l=0;for(let p=0;p<o;p+=t)for(let g=0;g<n;g+=t){let d=!1;for(let m=0;m<t&&!d;m++)for(let P=0;P<t&&!d;P++){const h=g+P,f=p+m;if(h<n&&f<o){const T=(f*n+h)*4;r[T+3]>10&&(d=!0)}}s[l++]=d?1:0}return{validBlocks:s,blockWidth:c,blockHeight:u}},q=(e,t,i)=>e+i*(t-e),K=e=>{e=e.replace(/^#/,"");const t=parseInt(e,16),i=t>>16&255,n=t>>8&255,o=t&255;return{r:i,g:n,b:o}},Pt=(e,t,i)=>"#"+((1<<24)+(e<<16)+(t<<8)+i).toString(16).slice(1),W=(e,t)=>{if(!(e!=null&&e.length))return"#ffffff";if(e.length===1)return e[0];const n=Math.max(0,Math.min(1,t))*(e.length-1),o=Math.floor(n);if(o===e.length-1)return e[e.length-1];const r=n-o,c=K(e[o]),u=K(e[o+1]),s=Math.round(q(c.r,u.r,r)),l=Math.round(q(c.g,u.g,r)),p=Math.round(q(c.b,u.b,r));return Pt(s,l,p)},J=({dimensions:{width:e,height:t}})=>({top:()=>({x:Math.random()*e,y:0}),center:()=>({x:Math.round(e/2),y:Math.round(t/2)}),bottom:()=>({x:Math.random()*e,y:t}),random:()=>({x:Math.random()*e,y:Math.random()*t}),left:()=>({x:0,y:Math.random()*t}),right:()=>({x:e,y:Math.random()*t}),"top-left":()=>({x:Math.random()*(e/5),y:Math.random()*(t/5)}),"top-right":()=>({x:e,y:Math.random()*(t/5)}),"bottom-left":()=>({x:Math.random()*(e/5),y:t-Math.random()*(t/5)}),"bottom-right":()=>({x:e-Math.random()*(e/5),y:t-Math.random()*(t/5)})}),$=(e,t)=>{if(e.length===0)return{width:0,height:0,minX:0,minY:0,maxX:0,maxY:0};let i=1/0,n=1/0,o=-1/0,r=-1/0;return e.forEach(c=>{i=Math.min(i,c.targetX),n=Math.min(n,c.targetY),o=Math.max(o,c.targetX+t),r=Math.max(r,c.targetY+t)}),{minX:i,minY:n,maxX:o,maxY:r,width:o-i,height:r-n}},ft=e=>{e.x+=e.dx,e.y+=e.dy,e.dx+=(Math.random()-.5)*.1,e.dy-=.02},Mt=(e,t)=>t-e.createdAt>=e.lifetime,Tt=(e,t)=>{if(t>(e.revealThreshold||.99))return 1;if(t>.85&&Math.sqrt(Math.pow(e.x-e.targetX,2)+Math.pow(e.y-e.targetY,2))<=5){const o=(e.revealThreshold||.99)-.02,r=Math.max(0,(t-o)/.02);return Math.min(1,r)}return 0},yt=(e,t,i,n,o=5)=>{const r=[];for(let c=0;c<o;c++){const u=Math.random()*Math.PI*2,s=.5+Math.random()*2;r.push({x:e,y:t,dx:Math.cos(u)*s,dy:Math.sin(u)*s-1,radius:2+Math.random()*5,color:i,opacity:.7+Math.random()*.3,createdAt:n,lifetime:Z})}return r},bt=({bubble:e,requestAnimationFrameTime:t,context:i,particleColors:n})=>{const o=t-e.createdAt,r=Math.min(1,o/e.lifetime),c=e.opacity*(1-r);i.beginPath(),i.arc(Math.floor(e.x),Math.floor(e.y),e.radius,0,Math.PI*2),i.fillStyle=W(n,r),i.globalAlpha=c,i.fill()},tt=({particle:e,context:t,particleRadius:i,imageBitmap:n})=>{t.globalAlpha=e.opacity||1,t.drawImage(n,e.targetX,e.targetY,i,i,Math.floor(e.x),Math.floor(e.y),i,i)},It=({particle:e,context:t,particleRadius:i,particleColors:n,revealProgress:o})=>{const r=Math.floor(i*(e.scale||1));t.globalAlpha=e.opacity||1,t.beginPath(),t.arc(Math.floor(e.x)+r/2,Math.floor(e.y)+r/2,r/2,0,2*Math.PI),t.fillStyle=n.length?W(n,o):e.color,t.fill()},Et=({particle:e,blendFactor:t,context:i,particleRadius:n,particleColors:o,revealProgress:r,imageBitmap:c})=>{const u=Math.floor(n*(e.scale||1));i.globalAlpha=(e.opacity||1)*(1-t),i.beginPath(),i.arc(Math.floor(e.x)+u/2,Math.floor(e.y)+u/2,u/2,0,2*Math.PI),i.fillStyle=o.length?W(o,r):e.color,i.fill(),i.globalAlpha=t,i.drawImage(c,e.targetX,e.targetY,n,n,Math.floor(e.x),Math.floor(e.y),n,n)},xt=({particle:e,context:t,particleRadius:i,particleColors:n,revealProgress:o,imageBitmap:r,enableImageParticles:c})=>{if(c)tt({particle:e,context:t,particleRadius:i,imageBitmap:r});else{const u=Tt(e,o);u>0&&u<1?Et({particle:e,blendFactor:u,context:t,particleRadius:i,particleColors:n,revealProgress:o,imageBitmap:r}):u>=1?tt({particle:e,context:t,particleRadius:i,imageBitmap:r}):It({particle:e,context:t,particleRadius:i,particleColors:n,revealProgress:o})}},vt=e=>e.x===e.targetX&&e.y===e.targetY,F={"ease-in-out":e=>e*(2-e),"ease-in":e=>e*e,"ease-out":e=>1-(1-e)*(1-e),linear:e=>e,"quadratic-out":e=>e*(2-e),"ease-out-quart":e=>1-Math.pow(1-e,4),"ease-in-out-quint":e=>e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2,"ease-in-quart":e=>e*e*e*e},_={BUILD:"BUILD",SUPER_SWIRL:"SUPER_SWIRL",OPPENHEIMER:"OPPENHEIMER",SCANNING:"SCANNING",EXPLOSION:"EXPLOSION",HELIX_SPIRAL:"HELIX_SPIRAL"},At={factory:e=>({particle:t,progress:i})=>{const{swirlTurns:n,spiralDirection:o,easingType:r,affectOpacity:c,affectScale:u}=e,s=Math.min(i,1),l=F[r](s);if(!t._started){const d=t.initialX-t.targetX,m=t.initialY-t.targetY;t._radius=Math.sqrt(d*d+m*m),t._angle=Math.atan2(m,d),t._turns=n+Math.random(),t._started=!0}const p=t._radius*(1-l),g=t._angle+o*2*Math.PI*t._turns*l;t.x=t.targetX+p*Math.cos(g),t.y=t.targetY+p*Math.sin(g),u?t.scale=1+2*(1-l):t.scale=1,c?t.opacity=l:t.opacity=1,t.color=`rgba(255,255,255,${t.opacity})`,s>=1&&(t.x=t.targetX,t.y=t.targetY,t.opacity=1,t.scale=1)},defaultConfig:{swirlTurns:2,spiralDirection:1,easingType:"ease-in-out",affectOpacity:!0,affectScale:!0},commonControls:{startPosition:!0}},St={factory:e=>({particle:t,progress:i})=>{const{horizontalPhaseEnd:n,verticalCompressionFactor:o,scalingBoost:r,bouncyIntensity:c,bouncyOffset:u}=e,s=1,l=.6,p=1.1,g=.2,d=.1,m=.5;if(t.customProps||(t.customProps={originalScale:t.scale,originalOpacity:t.opacity}),i>=1)return t.x=t.targetX,t.y=t.targetY,t.scale=t.customProps.originalScale,t.opacity=t.customProps.originalOpacity,t;const P=h=>{const f=2*Math.PI/3;return h===0?0:h===1?1:Math.pow(2,-c*h)*Math.sin((h*c-u)*f)+1};if(i<n){const h=i/n,f=P(h);t.x=t.initialX+(t.targetX-t.initialX)*f,t.y=t.initialY;const T=t.customProps.originalScale,M=1-Math.sin(h*Math.PI)*g;t.scale=T*M}else if(i<s){const h=(i-n)/(s-n),f=P(h);t.x=t.targetX;const T=(t.initialY+t.targetY)/2,M=T+(t.targetY-T)*o,A=h<l?0:(()=>{const X=(h-l)/(1-l);return 1-Math.pow(1-X,p)})(),b=t.initialY+(M-t.initialY)*f;t.y=b+(t.targetY-M)*A;const S=t.customProps.originalScale,I=1-Math.sin(h*Math.PI)*d,v=h<m?1+(1-h/m)*r:1;t.scale=S*I*v}return t},defaultConfig:{horizontalPhaseEnd:.4,verticalCompressionFactor:.45,scalingBoost:.3,bouncyIntensity:10,bouncyOffset:.75,startPosition:"center"},commonControls:{startPosition:!0}},Ct={factory:e=>({particle:t,progress:i})=>{const{windStrength:n,turbulenceScale:o,oscillationAmount:r,settlingSpeed:c,particleWeight:u}=e;t.windProps||(t.windProps={originalScale:t.scale,originalOpacity:t.opacity,gustSensitivity:(.5+Math.random()*1.5)/u,gustFrequency:1+Math.random()*2,turbulenceScale:(10+Math.random()*40)*(o/25),drift:(Math.random()-.5)*2,weight:(.3+Math.random()*.7)*u,flutterAmount:(Math.random()*.8+.2)*r,flutterSpeed:3+Math.random()*6,delay:Math.random()*.15/c,turbPhaseX:Math.random()*1e3,turbPhaseY:Math.random()*1e3,sinePhaseX:Math.random()*Math.PI*2,sinePhaseY:Math.random()*Math.PI*2,opacityPhase:Math.random()*Math.PI*2,burstOpacity:Math.random()>.7});let s=Math.max(0,(i-t.windProps.delay)/(1-t.windProps.delay));s=Math.min(1,Math.pow(s,1/c));let l;if(s<.25)l=s*4*n;else if(s<.75){const x=(s-.25)/.5;l=n+Math.sin(x*Math.PI*3)*n*.3,l+=Math.sin(x*Math.PI*8)*n*.15}else l=n*(1-(s-.75)/.25);let p,g;const d=c;if(s<.25){const x=Math.pow(s/.25,2);p=t.initialX+(t.targetX-t.initialX)*x*.15*d,g=t.initialY+(t.targetY-t.initialY)*x*.15*d}else if(s<.75){const G=.15+(s-.25)/.5*.6*d;p=t.initialX+(t.targetX-t.initialX)*Math.min(G,.75),g=t.initialY+(t.targetY-t.initialY)*Math.min(G,.75)}else{const x=(s-.75)/.25,it=.75+(1-Math.pow(1-x,3))*.25;p=t.initialX+(t.targetX-t.initialX)*it,g=t.initialY+(t.targetY-t.initialY)*it}const m=s*10,P=Math.sin((m*.3+t.windProps.turbPhaseX)*t.windProps.gustFrequency)*t.windProps.turbulenceScale,h=Math.sin((m*.7+t.windProps.turbPhaseX*.5)*t.windProps.gustFrequency*1.5)*t.windProps.turbulenceScale*.5,f=Math.sin((m*1.1+t.windProps.turbPhaseX*.8)*t.windProps.gustFrequency*2.3)*t.windProps.turbulenceScale*.3,T=Math.cos((m*.4+t.windProps.turbPhaseY)*t.windProps.gustFrequency)*t.windProps.turbulenceScale*.8,M=Math.cos((m*.9+t.windProps.turbPhaseY*.7)*t.windProps.gustFrequency*1.8)*t.windProps.turbulenceScale*.4,A=Math.cos((m*1.3+t.windProps.turbPhaseY*.3)*t.windProps.gustFrequency*2.1)*t.windProps.turbulenceScale*.25,b=(P+h+f)*l*t.windProps.gustSensitivity,S=(T+M+A)*l*t.windProps.gustSensitivity,I=30*Math.sin(s*Math.PI*.7)*t.windProps.drift*l,v=25*l*t.windProps.flutterAmount,X=v*Math.sin(s*Math.PI*t.windProps.flutterSpeed+t.windProps.sinePhaseX),U=v*.5*Math.cos(s*Math.PI*t.windProps.flutterSpeed*.7+t.windProps.sinePhaseY),D=1/t.windProps.weight;t.x=p+(b+X+I)/D,t.y=g+(S+U)/D;const Lt=t.windProps.originalScale,Nt=Math.sin(s*Math.PI*t.windProps.flutterSpeed*1.5+t.windProps.sinePhaseX)*.15*r,Ht=Math.sin(s*Math.PI*2)*.1*l;t.scale=Lt*(1+Nt+Ht);let qt=t.windProps.originalOpacity,j=0;t.windProps.burstOpacity?j=Math.sin(s*Math.PI*20+t.windProps.opacityPhase)*.2*l:j=Math.sin(s*Math.PI*10+t.windProps.opacityPhase)*.1*l;let L;s<.1?L=s/.1:s>.9?L=1:L=1+j,t.opacity=qt*Math.min(1,Math.max(.2,L));let k=0,R=100,B=70;if(t.origColor)k=t.origColor.hue,R=t.origColor.saturation,B=t.origColor.lightness;else{if(t.color.startsWith("hsl")){const x=t.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);x&&(k=parseInt(x[1],10),R=parseInt(x[2],10),B=parseInt(x[3],10))}else k=(220+Math.random()*40)%360,R=10+Math.random()*15,B=70+Math.random()*20;t.origColor={hue:k,saturation:R,lightness:B}}const nt=l*20,Wt=(k+Math.sin(s*Math.PI*3)*5*l)%360,$t=Math.max(0,R-nt*.5),zt=Math.min(100,B+nt*.3);t.color=`hsl(${Wt}, ${$t}%, ${zt}%)`,i>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=t.windProps.originalScale,t.opacity=t.windProps.originalOpacity)},defaultConfig:{windStrength:1,turbulenceScale:60,oscillationAmount:1.5,settlingSpeed:1.5,particleWeight:.7},commonControls:{startPosition:!0}},wt={factory:e=>({particle:t,progress:i,textBoundaries:n})=>{const{oscillationFrequency:o,settlementThreshold:r,scanningRange:c,passDistribution:u,settlementTiming:s}=e,l=o*2;if(t.animation===void 0){t.id=crypto.randomUUID();const M=t.id.split("").reduce((I,v)=>(I<<5)-I+v.charCodeAt(0),0),A=Math.abs(M),b=Math.max(1,Math.floor(l*u));let S;if(s==="early"){const I=Math.max(1,Math.floor(b/3));S=A%I+1}else if(s==="late"){const I=Math.max(1,Math.floor(b/3)),v=b-I+1;S=A%I+v}else S=A%b+1;t.animation={settled:!1,assignedPass:S,currentPass:0},t.y=t.targetY,t.opacity=1}if(t.animation.settled)return t.x=t.targetX,t.y=t.targetY,t;const p=n.maxX-n.minX;if(p<=0||!isFinite(p))return t;const g=Math.sin(i*o*Math.PI*2),d=i*l,m=Math.min(Math.floor(d)+1,l);m>t.animation.currentPass&&(t.animation.currentPass=m);const P=n.minX-c,h=n.maxX+c,f=P+(g+1)/2*(h-P);t.x=f;const T=Math.abs(t.x-t.targetX);t.animation.currentPass>=t.animation.assignedPass&&T<=r&&(t.x=t.targetX,t.y=t.targetY,t.animation.settled=!0)},defaultConfig:{oscillationFrequency:3,settlementThreshold:12,scanningRange:30,passDistribution:.85,settlementTiming:"distributed"},commonControls:{startPosition:!1}},Xt={factory:e=>({particle:t,progress:i,canvasDimensions:n})=>{const{explosionStrength:o,deconstructionPhase:r,orbitalRadius:c,depthOffset:u}=e;if(!t.isInitialized){t.isInitialized=!0;const m=o+Math.random()*o*.5,P=Math.random()*Math.PI*2,h=Math.acos(Math.random()*2-1);t.explodedPos={x:t.initialX+Math.cos(P)*Math.sin(h)*m,y:t.initialY+Math.sin(P)*Math.sin(h)*m,z:u+Math.cos(h)*m},t.finalPos={x:t.targetX,y:t.targetY,z:0}}let s,l=1;const p=r;if(i<p){const m=i/p,P=F["ease-out-quart"](m);s={x:t.initialX+(t.explodedPos.x-t.initialX)*P,y:t.initialY+(t.explodedPos.y-t.initialY)*P,z:0+(t.explodedPos.z-0)*P},l=1+1.5*Math.sin(m*Math.PI)}else{const m=(i-p)/(1-p),P=F["ease-in-out-quint"](m);s={x:t.explodedPos.x+(t.finalPos.x-t.explodedPos.x)*P,y:t.explodedPos.y+(t.finalPos.y-t.explodedPos.y)*P,z:t.explodedPos.z+(t.finalPos.z-t.explodedPos.z)*P},l=1+.8*Math.sin(m*Math.PI);const h=Math.max(0,(m-.7)/.3);if(h>0){const f=1-h,T=h*Math.PI*4,M=c*f*f;s.x+=Math.cos(T)*M,s.y+=Math.sin(T)*M}}const g=n.width*1.2,d=g/(g-s.z);t.x=(s.x-n.width/2)*d+n.width/2,t.y=(s.y-n.height/2)*d+n.height/2,t.scale=Math.max(0,d),t.opacity=Math.max(0,Math.min(1,d))*l,i>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1)},defaultConfig:{explosionStrength:1e3,deconstructionPhase:.4,orbitalRadius:15,depthOffset:-500},commonControls:{startPosition:!0}},_t={factory:e=>({particle:t,progress:i,canvasDimensions:n})=>{const{helixRadius:o,helixTurns:r,helixHeight:c,rotationSpeed:u,easingType:s,perspective:l,affectOpacity:p}=e;if(!t.isInitialized){t.isInitialized=!0;const v=Math.random()*Math.PI*2,X=o/100*Math.min(n.width,n.height),U=c/100*n.height,D=(Math.random()-.5)*U;t.helixAngle=v,t.helixHeight=D,t.helixPhase=Math.random()*Math.PI*2,t.helixStartPos={x:n.width/2+Math.cos(v)*X,y:n.height/2+D,z:Math.sin(v)*X},t.actualHelixRadius=X,t.actualHelixHeight=U,t.finalPos={x:t.targetX,y:t.targetY,z:0}}const g=Math.min(i,1),d=F[s](g),m=t.helixAngle+r*2*Math.PI*g*u,P=t.helixHeight*(1-d),h=n.width/2+Math.cos(m)*t.actualHelixRadius*(1-d),f=n.height/2+P,T=Math.sin(m)*t.actualHelixRadius*(1-d),M={x:h+(t.finalPos.x-h)*d,y:f+(t.finalPos.y-f)*d,z:T+(t.finalPos.z-T)*d},A=Math.sin(g*Math.PI*4+t.helixPhase)*10*(1-d);M.x+=A*Math.cos(m+Math.PI/2),M.y+=A*.5;const b=l/(l-M.z);t.x=(M.x-n.width/2)*b+n.width/2,t.y=(M.y-n.height/2)*b+n.height/2,t.scale=Math.max(.1,b),p?t.opacity=Math.max(0,Math.min(1,b))*(.3+.7*d):t.opacity=Math.max(0,Math.min(1,b));const S=(M.z+t.actualHelixRadius)/(t.actualHelixRadius*2),I=Math.max(.6,Math.min(1,S));t.color=`rgba(${Math.floor(255*I)}, ${Math.floor(255*I)}, 255, ${t.opacity})`,g>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1,t.color="rgba(255, 255, 255, 1)")},defaultConfig:{helixRadius:20,helixTurns:3,helixHeight:50,rotationSpeed:1,easingType:"ease-in-out-quint",perspective:800,affectOpacity:!1},commonControls:{startPosition:!1}},w={[_.SUPER_SWIRL]:At,[_.BUILD]:St,[_.OPPENHEIMER]:Ct,[_.SCANNING]:wt,[_.EXPLOSION]:Xt,[_.HELIX_SPIRAL]:_t};let et;const at={particleRadius:5,startPosition:ot,selectedMovementFunction:N,selectedEffect:null,effectConfigurations:{SUPER_SWIRL:w.SUPER_SWIRL.defaultConfig,BUILD:w.BUILD.defaultConfig,OPPENHEIMER:w.OPPENHEIMER.defaultConfig,SCANNING:w.SCANNING.defaultConfig,EXPLOSION:w.EXPLOSION.defaultConfig,HELIX_SPIRAL:w.HELIX_SPIRAL.defaultConfig},movementFunctionCode:gt()[N].code,text:st,font:Q,particleColors:rt,animationDuration:3e3,enableBubbles:!1,enableImageParticles:!1},a={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:at,revealProgress:0,textBoundaries:null};let O;const Ot=async e=>{a.mainCanvas=e,a.mainContext=a.mainCanvas.getContext("bitmaprenderer"),a.frameCanvas=new OffscreenCanvas(a.mainCanvas.width,a.mainCanvas.height),a.frameContext=a.frameCanvas.getContext("2d",{willReadFrequently:!0})},Yt=e=>{const{imageBitmap:t,canvas:i,dimensions:n,appProps:o}=e;if(a.imageBitmap=t,Object.keys(o).length){const s={...o.font,textColor:o.font.textColor??Q.textColor};a.appProps={...at,...o,font:s}}Ot(i),a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:r,blockHeight:c,blockWidth:u}=H(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);a.textBoundaries=$(a.workerParticles,a.appProps.particleRadius),a.validBlocks=r,a.blockHeight=c,a.blockWidth=u,O=J({dimensions:n}),a.workerParticles=z({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition})},z=({validBlocks:e,radius:t,blockHeight:i,blockWidth:n,startPosition:o})=>{const r=[];for(let c=0;c<i;c++)for(let u=0;u<n;u++){const s=c*n+u;if(e[s]){const l=u*t,p=c*t,{x:g,y:d}=O[o]();r.push({targetX:l,targetY:p,x:g,y:d,initialX:g,initialY:d,scale:1,opacity:1,color:V,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return r},Dt=e=>{for(let t=a.bubbleParticles.length-1;t>=0;t--){const i=a.bubbleParticles[t];ft(i),bt({bubble:i,requestAnimationFrameTime:e,context:a.frameContext,particleColors:a.appProps.particleColors}),Mt(i,e)&&a.bubbleParticles.splice(t,1)}a.frameContext.globalAlpha=1},kt=(e,t,i)=>{et(e,t,i,{width:a.mainCanvas.width,height:a.mainCanvas.height},a.appProps.animationDuration)},Rt=(e,t)=>{if(!e.emittedBubbles&&a.appProps.enableBubbles&&e.x===e.targetX&&e.y===e.targetY){e.emittedBubbles=!0;const i=yt(e.x,e.y,e.color,t,2+Math.floor(Math.random()*3));a.bubbleParticles.push(...i)}},Bt=(e,t)=>{let i=!0,n=null;if(a.appProps.selectedEffect){const o=w[a.appProps.selectedEffect],r=a.appProps.effectConfigurations[a.appProps.selectedEffect];n=o.factory(r)}return a.workerParticles.forEach(o=>{if(n){const r=t-e,c=Math.min(r/a.appProps.animationDuration,1);n({particle:o,progress:c,textBoundaries:a.textBoundaries,canvasDimensions:{width:a.mainCanvas.width,height:a.mainCanvas.height}})}else kt(o,e,t);xt({particle:o,context:a.frameContext,particleRadius:a.appProps.particleRadius,particleColors:a.appProps.particleColors,revealProgress:a.revealProgress,imageBitmap:a.imageBitmap,enableImageParticles:a.appProps.enableImageParticles}),Rt(o,t),!vt(o)&&a.revealProgress>=.99&&(i=!1)}),i},Y=(e,t)=>{a.frameContext.clearRect(0,0,a.frameCanvas.width,a.frameCanvas.height);const i=t-e;a.revealProgress=Math.min(1,i/a.appProps.animationDuration),Dt(t);const n=Bt(e,t),o=a.frameCanvas.transferToImageBitmap();a.mainContext.transferFromImageBitmap(o);const r=n&&a.revealProgress>=1,c=a.appProps.animationDuration+(a.appProps.enableBubbles?Z:0);r&&i>=c?a.animationFrameId&&(cancelAnimationFrame(a.animationFrameId),a.bubbleParticles=[],a.frameContext.drawImage(a.imageBitmap,0,0)):a.animationFrameId=requestAnimationFrame(s=>Y(e,s))},Ft=()=>{et=new Function(a.appProps.movementFunctionCode)();const e=performance.now();a.revealProgress=0,a.bubbleParticles=[],a.workerParticles.forEach(t=>{t.emittedBubbles=!1}),Y(e,e)},Ut=()=>{a.animationFrameId&&cancelAnimationFrame(a.animationFrameId),a.bubbleParticles=[],a.revealProgress=0,a.workerParticles=a.workerParticles.map(t=>{const i=O[a.appProps.startPosition]();return{x:i.x,y:i.y,initialX:i.x,initialY:i.y,targetX:t.targetX,targetY:t.targetY,scale:1,opacity:1,color:t.color,revealProgress:0,revealThreshold:t.revealThreshold}}),a.frameContext.clearRect(0,0,a.frameCanvas.width,a.frameCanvas.height);const e=a.frameCanvas.transferToImageBitmap();a.mainContext.transferFromImageBitmap(e),a.animationFrameId&&cancelAnimationFrame(a.animationFrameId)};self.onmessage=e=>{const{payload:t,type:i}=e.data;switch(i){case y.INITIALIZE:{Yt(t),self.postMessage({type:E.INITIALIZED,data:a.appProps});break}case y.PLAY:{Ut(),Ft();break}case y.RESIZE_PARTICLE_RADIUS:{a.appProps.particleRadius=t,a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:n,blockHeight:o,blockWidth:r}=H(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);if(a.validBlocks=n,a.blockHeight=o,a.blockWidth=r,a.workerParticles=z({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition}),a.textBoundaries=$(a.workerParticles,a.appProps.particleRadius),self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const c=performance.now();Y(c,c)}break}case y.UPDATE_START_POSITION:{if(a.appProps.startPosition=t,a.workerParticles.length){if(a.workerParticles.forEach(n=>{const o=O[a.appProps.startPosition]();n.initialX=o.x,n.initialY=o.y,n.x=o.x,n.y=o.y}),self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const n=performance.now();Y(n,n)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:a.workerParticles});break}case y.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:n,movementFunctionCode:o}=t??{};n&&(a.appProps.selectedMovementFunction=n),o!=null&&(a.appProps.movementFunctionCode=o),self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}case y.UPDATE_TEXT:{a.appProps.text=t,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}case y.UPDATE_FONT:{a.appProps.font=t,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}case y.UPDATE_PARTICLE_COLORS:{if(a.appProps.particleColors=t,t.length>0,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const n=performance.now();Y(n,n)}break}case y.UPDATE_BITMAP:{if(a.imageBitmap=t,a.frameCanvas&&a.mainCanvas){a.frameCanvas.width=a.imageBitmap.width,a.frameCanvas.height=a.imageBitmap.height,a.mainCanvas.width=a.imageBitmap.width,a.mainCanvas.height=a.imageBitmap.height,a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:n,blockHeight:o,blockWidth:r}=H(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);a.textBoundaries=$(a.workerParticles,a.appProps.particleRadius),a.validBlocks=n,a.blockHeight=o,a.blockWidth=r,O=J({dimensions:{width:a.mainCanvas.width,height:a.mainCanvas.height}}),a.workerParticles=z({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition})}break}case y.UPDATE_ANIMATION_DURATION:{a.appProps.animationDuration=t,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId&&(a.bubbleParticles=[]);break}case y.UPDATE_ENABLE_BUBBLES:{a.appProps.enableBubbles=t,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}case y.UPDATE_ENABLE_IMAGE_PARTICLES:{a.appProps.enableImageParticles=t,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}case y.UPDATE_SELECTED_EFFECT:{a.appProps.selectedEffect=t,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}case y.UPDATE_EFFECT_CONFIGURATION:{const{effectType:n,configuration:o}=t;a.appProps.effectConfigurations[n]=o,self.postMessage({type:E.UPDATE_APP_PROPS,data:a.appProps});break}}}})();
