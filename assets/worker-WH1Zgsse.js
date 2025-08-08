(function(){"use strict";const nt="random",U="DEV_EXAMPLE",it="WIX 🤠",G="#ffffff",rt=["#ff0000","#00ff00","#0000ff"],ot={fontFamily:"Arial",fontSize:90,italic:!1,weight:400,letterSpacing:0,textColor:G},st=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,v=`/**
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
`,ct=`${v}
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
}`,V=1300;var P=(e=>(e.INITIALIZE="INITIALIZE",e.PLAY="PLAY",e.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",e.UPDATE_START_POSITION="UPDATE_START_POSITION",e.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",e.UPDATE_SELECTED_EFFECT="UPDATE_SELECTED_EFFECT",e.UPDATE_EFFECT_CONFIGURATION="UPDATE_EFFECT_CONFIGURATION",e.UPDATE_BITMAP="UPDATE_BITMAP",e.UPDATE_TEXT="UPDATE_TEXT",e.UPDATE_FONT="UPDATE_FONT",e.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",e.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",e.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",e.UPDATE_ENABLE_IMAGE_PARTICLES="UPDATE_ENABLE_IMAGE_PARTICLES",e))(P||{}),f=(e=>(e.INITIALIZED="INITIALIZED",e.UPDATE_APP_PROPS="UPDATE_APP_PROPS",e))(f||{});const lt=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],pt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
`,mt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,ut=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,dt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,ht=()=>Object.assign({},{[U]:{code:`${v}${ct}`},DEV_TWO_FRAMES:{code:`${v}${st}`},bezier:{code:`${v}${pt}`},pulseColorCycle:{code:`${v}${mt}`},timeDistortion:{code:`${v}${ut}`},elasticPlop:{code:`${v}${dt}`}},...lt.map(({name:e,comment:t,definition:n})=>({[e]:{code:`${v}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${t}
    ${n}
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
};`}}))),R=(e,t)=>{const{width:i,height:r,data:o}=e,s=Math.ceil(i/t),l=Math.ceil(r/t),m=new Uint8Array(Math.ceil(i/t)*Math.ceil(r/t));let c=0;for(let p=0;p<r;p+=t)for(let d=0;d<i;d+=t){let g=!1;for(let M=0;M<t&&!g;M++)for(let h=0;h<t&&!g;h++){const I=d+h,u=p+M;if(I<i&&u<r){const b=(u*i+I)*4;o[b+3]>10&&(g=!0)}}m[c++]=g?1:0}return{validBlocks:m,blockWidth:s,blockHeight:l}},L=(e,t,n)=>e+n*(t-e),Q=e=>{e=e.replace(/^#/,"");const t=parseInt(e,16),n=t>>16&255,i=t>>8&255,r=t&255;return{r:n,g:i,b:r}},gt=(e,t,n)=>"#"+((1<<24)+(e<<16)+(t<<8)+n).toString(16).slice(1),N=(e,t)=>{if(!(e!=null&&e.length))return"#ffffff";if(e.length===1)return e[0];const i=Math.max(0,Math.min(1,t))*(e.length-1),r=Math.floor(i);if(r===e.length-1)return e[e.length-1];const o=i-r,s=Q(e[r]),l=Q(e[r+1]),m=Math.round(L(s.r,l.r,o)),c=Math.round(L(s.g,l.g,o)),p=Math.round(L(s.b,l.b,o));return gt(m,c,p)},Z=({dimensions:{width:e,height:t}})=>({top:()=>({x:Math.random()*e,y:0}),center:()=>({x:Math.round(e/2),y:Math.round(t/2)}),bottom:()=>({x:Math.random()*e,y:t}),random:()=>({x:Math.random()*e,y:Math.random()*t}),left:()=>({x:0,y:Math.random()*t}),right:()=>({x:e,y:Math.random()*t}),"top-left":()=>({x:Math.random()*(e/5),y:Math.random()*(t/5)}),"top-right":()=>({x:e,y:Math.random()*(t/5)}),"bottom-left":()=>({x:Math.random()*(e/5),y:t-Math.random()*(t/5)}),"bottom-right":()=>({x:e-Math.random()*(e/5),y:t-Math.random()*(t/5)})}),q=(e,t)=>{if(e.length===0)return{width:0,height:0,minX:0,minY:0,maxX:0,maxY:0};let n=1/0,i=1/0,r=-1/0,o=-1/0;return e.forEach(s=>{n=Math.min(n,s.targetX),i=Math.min(i,s.targetY),r=Math.max(r,s.targetX+t),o=Math.max(o,s.targetY+t)}),{minX:n,minY:i,maxX:r,maxY:o,width:r-n,height:o-i}},Pt=e=>{e.x+=e.dx,e.y+=e.dy,e.dx+=(Math.random()-.5)*.1,e.dy-=.02},ft=(e,t)=>t-e.createdAt>=e.lifetime,Tt=(e,t)=>{if(t>(e.revealThreshold||.99))return 1;if(t>.85&&Math.sqrt(Math.pow(e.x-e.targetX,2)+Math.pow(e.y-e.targetY,2))<=5){const r=(e.revealThreshold||.99)-.02,o=Math.max(0,(t-r)/.02);return Math.min(1,o)}return 0},Mt=(e,t,n,i,r=5)=>{const o=[];for(let s=0;s<r;s++){const l=Math.random()*Math.PI*2,m=.5+Math.random()*2;o.push({x:e,y:t,dx:Math.cos(l)*m,dy:Math.sin(l)*m-1,radius:2+Math.random()*5,color:n,opacity:.7+Math.random()*.3,createdAt:i,lifetime:V})}return o},bt=({bubble:e,requestAnimationFrameTime:t,context:n,particleColors:i})=>{const r=t-e.createdAt,o=Math.min(1,r/e.lifetime),s=e.opacity*(1-o);n.beginPath(),n.arc(Math.floor(e.x),Math.floor(e.y),e.radius,0,Math.PI*2),n.fillStyle=N(i,o),n.globalAlpha=s,n.fill()},z=({particle:e,context:t,particleRadius:n,imageBitmap:i})=>{t.globalAlpha=e.opacity||1,t.drawImage(i,e.targetX,e.targetY,n,n,Math.floor(e.x),Math.floor(e.y),n,n)},yt=({particle:e,context:t,particleRadius:n,particleColors:i,revealProgress:r})=>{const o=Math.floor(n*(e.scale||1));t.globalAlpha=e.opacity||1,t.beginPath(),t.arc(Math.floor(e.x)+o/2,Math.floor(e.y)+o/2,o/2,0,2*Math.PI),t.fillStyle=i.length?N(i,r):e.color,t.fill()},Et=({particle:e,blendFactor:t,context:n,particleRadius:i,particleColors:r,revealProgress:o,imageBitmap:s})=>{const l=Math.floor(i*(e.scale||1));n.globalAlpha=(e.opacity||1)*(1-t),n.beginPath(),n.arc(Math.floor(e.x)+l/2,Math.floor(e.y)+l/2,l/2,0,2*Math.PI),n.fillStyle=r.length?N(r,o):e.color,n.fill(),n.globalAlpha=t,n.drawImage(s,e.targetX,e.targetY,i,i,Math.floor(e.x),Math.floor(e.y),i,i)},It=({particle:e,context:t,particleRadius:n,particleColors:i,revealProgress:r,imageBitmap:o,enableImageParticles:s})=>{if(s)z({particle:e,context:t,particleRadius:n,imageBitmap:o});else{const l=Tt(e,r);l>0&&l<1?Et({particle:e,blendFactor:l,context:t,particleRadius:n,particleColors:i,revealProgress:r,imageBitmap:o}):l>=1?z({particle:e,context:t,particleRadius:n,imageBitmap:o}):yt({particle:e,context:t,particleRadius:n,particleColors:i,revealProgress:r})}},vt=e=>e.x===e.targetX&&e.y===e.targetY,At={"ease-in-out":e=>e*(2-e),"ease-in":e=>e*e,"ease-out":e=>1-(1-e)*(1-e),linear:e=>e,"quadratic-out":e=>e*(2-e)},k={BUILD:"BUILD",SUPER_SWIRL:"SUPER_SWIRL",OPPENHEIMER:"OPPENHEIMER",SCANNING:"SCANNING"},Ct={factory:e=>(t,n)=>{const{swirlTurns:i,spiralDirection:r,easingType:o}=e,s=Math.min(n,1),l=At[o](s);if(!t._started){const p=t.initialX-t.targetX,d=t.initialY-t.targetY;t._radius=Math.sqrt(p*p+d*d),t._angle=Math.atan2(d,p),t._turns=i+Math.random(),t._started=!0}const m=t._radius*(1-l),c=t._angle+r*2*Math.PI*t._turns*l;t.x=t.targetX+m*Math.cos(c),t.y=t.targetY+m*Math.sin(c),t.scale=1+2*(1-l),t.opacity=l,t.color=`rgba(255,255,255,${t.opacity})`,s>=1&&(t.x=t.targetX,t.y=t.targetY,t.opacity=1,t.scale=1)},defaultConfig:{swirlTurns:2,spiralDirection:1,easingType:"ease-in-out"}},St={factory:e=>(t,n)=>{const{horizontalPhaseEnd:i,bounceEndPoint:r,verticalCompressionFactor:o,decompressionStart:s,decompressionEasing:l,horizontalScaleShrink:m,verticalScaleShrink:c,scalingBoost:p,scalingPhaseEnd:d,bouncyIntensity:g,bouncyOffset:M}=e;t.customProps||(t.customProps={originalScale:t.scale,originalOpacity:t.opacity});const h=n;if(h>=1)return t.x=t.targetX,t.y=t.targetY,t.scale=t.customProps.originalScale,t.opacity=t.customProps.originalOpacity,t;const I=u=>{const b=2*Math.PI/3;return u===0?0:u===1?1:Math.pow(2,-g*u)*Math.sin((u*g-M)*b)+1};if(h<i){const u=h/i,b=I(u);t.x=t.initialX+(t.targetX-t.initialX)*b,t.y=t.initialY;const A=t.customProps.originalScale,E=1-Math.sin(u*Math.PI)*m;t.scale=A*E}else if(h<r){const u=(h-i)/(r-i),b=I(u);t.x=t.targetX;const A=(t.initialY+t.targetY)/2,E=A+(t.targetY-A)*o,C=u<s?0:(()=>{const H=(u-s)/(1-s);return 1-Math.pow(1-H,l)})(),S=t.initialY+(E-t.initialY)*b;t.y=S+(t.targetY-E)*C;const y=t.customProps.originalScale,w=1-Math.sin(u*Math.PI)*c,B=u<d?1+(1-u/d)*p:1;t.scale=y*w*B}return t},defaultConfig:{horizontalPhaseEnd:.4,bounceEndPoint:1,verticalCompressionFactor:.45,decompressionStart:.6,decompressionEasing:1.1,horizontalScaleShrink:.2,verticalScaleShrink:.1,scalingBoost:.3,scalingPhaseEnd:.5,bouncyIntensity:10,bouncyOffset:.75,startPosition:"center"}},wt={factory:e=>(t,n,i)=>{const{windStrength:r,turbulenceScale:o,oscillationAmount:s,settlingSpeed:l,particleWeight:m}=e;t.windProps||(t.windProps={originalScale:t.scale,originalOpacity:t.opacity,gustSensitivity:(.5+Math.random()*1.5)/m,gustFrequency:1+Math.random()*2,turbulenceScale:(10+Math.random()*40)*(o/25),drift:(Math.random()-.5)*2,weight:(.3+Math.random()*.7)*m,flutterAmount:(Math.random()*.8+.2)*s,flutterSpeed:3+Math.random()*6,delay:Math.random()*.15/l,turbPhaseX:Math.random()*1e3,turbPhaseY:Math.random()*1e3,sinePhaseX:Math.random()*Math.PI*2,sinePhaseY:Math.random()*Math.PI*2,opacityPhase:Math.random()*Math.PI*2,burstOpacity:Math.random()>.7});let c=Math.max(0,(n-t.windProps.delay)/(1-t.windProps.delay));c=Math.min(1,Math.pow(c,1/l));let p;if(c<.25)p=c*4*r;else if(c<.75){const T=(c-.25)/.5;p=r+Math.sin(T*Math.PI*3)*r*.3,p+=Math.sin(T*Math.PI*8)*r*.15}else p=r*(1-(c-.75)/.25);let d,g;const M=l;if(c<.25){const T=Math.pow(c/.25,2);d=t.initialX+(t.targetX-t.initialX)*T*.15*M,g=t.initialY+(t.targetY-t.initialY)*T*.15*M}else if(c<.75){const j=.15+(c-.25)/.5*.6*M;d=t.initialX+(t.targetX-t.initialX)*Math.min(j,.75),g=t.initialY+(t.targetY-t.initialY)*Math.min(j,.75)}else{const T=(c-.75)/.25,at=.75+(1-Math.pow(1-T,3))*.25;d=t.initialX+(t.targetX-t.initialX)*at,g=t.initialY+(t.targetY-t.initialY)*at}const h=c*10,I=Math.sin((h*.3+t.windProps.turbPhaseX)*t.windProps.gustFrequency)*t.windProps.turbulenceScale,u=Math.sin((h*.7+t.windProps.turbPhaseX*.5)*t.windProps.gustFrequency*1.5)*t.windProps.turbulenceScale*.5,b=Math.sin((h*1.1+t.windProps.turbPhaseX*.8)*t.windProps.gustFrequency*2.3)*t.windProps.turbulenceScale*.3,A=Math.cos((h*.4+t.windProps.turbPhaseY)*t.windProps.gustFrequency)*t.windProps.turbulenceScale*.8,E=Math.cos((h*.9+t.windProps.turbPhaseY*.7)*t.windProps.gustFrequency*1.8)*t.windProps.turbulenceScale*.4,C=Math.cos((h*1.3+t.windProps.turbPhaseY*.3)*t.windProps.gustFrequency*2.1)*t.windProps.turbulenceScale*.25,S=(I+u+b)*p*t.windProps.gustSensitivity,y=(A+E+C)*p*t.windProps.gustSensitivity,w=30*Math.sin(c*Math.PI*.7)*t.windProps.drift*p,B=25*p*t.windProps.flutterAmount,H=B*Math.sin(c*Math.PI*t.windProps.flutterSpeed+t.windProps.sinePhaseX),Ut=B*.5*Math.cos(c*Math.PI*t.windProps.flutterSpeed*.7+t.windProps.sinePhaseY),tt=1/t.windProps.weight;t.x=d+(S+H+w)/tt,t.y=g+(y+Ut)/tt;const Rt=t.windProps.originalScale,Lt=Math.sin(c*Math.PI*t.windProps.flutterSpeed*1.5+t.windProps.sinePhaseX)*.15*s,Nt=Math.sin(c*Math.PI*2)*.1*p;t.scale=Rt*(1+Lt+Nt);let qt=t.windProps.originalOpacity,$=0;t.windProps.burstOpacity?$=Math.sin(c*Math.PI*20+t.windProps.opacityPhase)*.2*p:$=Math.sin(c*Math.PI*10+t.windProps.opacityPhase)*.1*p;let F;c<.1?F=c/.1:c>.9?F=1:F=1+$,t.opacity=qt*Math.min(1,Math.max(.2,F));let X=0,Y=100,O=70;if(t.origColor)X=t.origColor.hue,Y=t.origColor.saturation,O=t.origColor.lightness;else{if(t.color.startsWith("hsl")){const T=t.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);T&&(X=parseInt(T[1],10),Y=parseInt(T[2],10),O=parseInt(T[3],10))}else X=(220+Math.random()*40)%360,Y=10+Math.random()*15,O=70+Math.random()*20;t.origColor={hue:X,saturation:Y,lightness:O}}const et=p*20,Wt=(X+Math.sin(c*Math.PI*3)*5*p)%360,Ht=Math.max(0,Y-et*.5),$t=Math.min(100,O+et*.3);t.color=`hsl(${Wt}, ${Ht}%, ${$t}%)`,n>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=t.windProps.originalScale,t.opacity=t.windProps.originalOpacity)},defaultConfig:{windStrength:1,turbulenceScale:60,oscillationAmount:1.5,settlingSpeed:1.5,particleWeight:.7}},xt={factory:e=>(t,n,i)=>{const{oscillationFrequency:r,settlementThreshold:o,scanningRange:s,passDistribution:l,settlementTiming:m}=e,c=r*2;if(t.animation===void 0){t.id=crypto.randomUUID();const A=t.id.split("").reduce((y,w)=>(y<<5)-y+w.charCodeAt(0),0),E=Math.abs(A),C=Math.max(1,Math.floor(c*l));let S;if(m==="early"){const y=Math.max(1,Math.floor(C/3));S=E%y+1}else if(m==="late"){const y=Math.max(1,Math.floor(C/3)),w=C-y+1;S=E%y+w}else S=E%C+1;t.animation={settled:!1,assignedPass:S,currentPass:0},t.y=t.targetY,t.opacity=1}if(t.animation.settled)return t.x=t.targetX,t.y=t.targetY,t;const p=i.maxX-i.minX;if(p<=0||!isFinite(p))return t;const d=Math.sin(n*r*Math.PI*2),g=n*c,M=Math.min(Math.floor(g)+1,c);M>t.animation.currentPass&&(t.animation.currentPass=M);const h=i.minX-s,I=i.maxX+s,u=h+(d+1)/2*(I-h);t.x=u;const b=Math.abs(t.x-t.targetX);t.animation.currentPass>=t.animation.assignedPass&&b<=o&&(t.x=t.targetX,t.y=t.targetY,t.animation.settled=!0)},defaultConfig:{oscillationFrequency:3,settlementThreshold:12,scanningRange:30,passDistribution:.85,settlementTiming:"distributed"}},x={[k.SUPER_SWIRL]:Ct,[k.BUILD]:St,[k.OPPENHEIMER]:wt,[k.SCANNING]:xt};let K;const J={particleRadius:5,startPosition:nt,selectedMovementFunction:U,selectedEffect:null,effectConfigurations:{SUPER_SWIRL:x.SUPER_SWIRL.defaultConfig,BUILD:x.BUILD.defaultConfig,OPPENHEIMER:x.OPPENHEIMER.defaultConfig,SCANNING:x.SCANNING.defaultConfig},movementFunctionCode:ht()[U].code,text:it,font:ot,particleColors:rt,animationDuration:3e3,enableBubbles:!1,enableImageParticles:!1},a={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:J,revealProgress:0,textBoundaries:null};let _;const _t=async e=>{a.mainCanvas=e,a.mainContext=a.mainCanvas.getContext("bitmaprenderer"),a.frameCanvas=new OffscreenCanvas(a.mainCanvas.width,a.mainCanvas.height),a.frameContext=a.frameCanvas.getContext("2d",{willReadFrequently:!0})},Dt=e=>{const{imageBitmap:t,canvas:n,dimensions:i,appProps:r}=e;a.imageBitmap=t,Object.keys(r).length&&(a.appProps={...J,...r}),_t(n),a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:o,blockHeight:s,blockWidth:l}=R(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);a.textBoundaries=q(a.workerParticles,a.appProps.particleRadius),a.validBlocks=o,a.blockHeight=s,a.blockWidth=l,_=Z({dimensions:i}),a.workerParticles=W({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition})},W=({validBlocks:e,radius:t,blockHeight:n,blockWidth:i,startPosition:r})=>{const o=[];for(let s=0;s<n;s++)for(let l=0;l<i;l++){const m=s*i+l;if(e[m]){const c=l*t,p=s*t,{x:d,y:g}=_[r]();o.push({targetX:c,targetY:p,x:d,y:g,initialX:d,initialY:g,scale:1,opacity:1,color:G,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return o},Xt=e=>{for(let t=a.bubbleParticles.length-1;t>=0;t--){const n=a.bubbleParticles[t];Pt(n),bt({bubble:n,requestAnimationFrameTime:e,context:a.frameContext,particleColors:a.appProps.particleColors}),ft(n,e)&&a.bubbleParticles.splice(t,1)}a.frameContext.globalAlpha=1},Yt=(e,t,n)=>{K(e,t,n,{width:a.mainCanvas.width,height:a.mainCanvas.height},a.appProps.animationDuration)},Ot=(e,t)=>{if(!e.emittedBubbles&&a.appProps.enableBubbles&&e.x===e.targetX&&e.y===e.targetY){e.emittedBubbles=!0;const n=Mt(e.x,e.y,e.color,t,2+Math.floor(Math.random()*3));a.bubbleParticles.push(...n)}},kt=(e,t)=>{let n=!0,i=null;if(a.appProps.selectedEffect){const r=x[a.appProps.selectedEffect],o=a.appProps.effectConfigurations[a.appProps.selectedEffect];i=r.factory(o)}return a.workerParticles.forEach(r=>{if(i){const o=t-e,s=Math.min(o/a.appProps.animationDuration,1);i(r,s,a.textBoundaries)}else Yt(r,e,t);It({particle:r,context:a.frameContext,particleRadius:a.appProps.particleRadius,particleColors:a.appProps.particleColors,revealProgress:a.revealProgress,imageBitmap:a.imageBitmap,enableImageParticles:a.appProps.enableImageParticles}),Ot(r,t),!vt(r)&&a.revealProgress>=.99&&(n=!1)}),n},D=(e,t)=>{a.frameContext.clearRect(0,0,a.frameCanvas.width,a.frameCanvas.height);const n=t-e;a.revealProgress=Math.min(1,n/a.appProps.animationDuration),Xt(t);const i=kt(e,t),r=a.frameCanvas.transferToImageBitmap();a.mainContext.transferFromImageBitmap(r);const o=i&&a.revealProgress>=1,s=a.appProps.animationDuration+(a.appProps.enableBubbles?V:0);o&&n>=s?a.animationFrameId&&(cancelAnimationFrame(a.animationFrameId),a.bubbleParticles=[],a.frameContext.drawImage(a.imageBitmap,0,0)):a.animationFrameId=requestAnimationFrame(m=>D(e,m))},Bt=()=>{K=new Function(a.appProps.movementFunctionCode)();const e=performance.now();a.revealProgress=0,a.bubbleParticles=[],a.workerParticles.forEach(t=>{t.emittedBubbles=!1}),D(e,e)},Ft=()=>{a.animationFrameId&&cancelAnimationFrame(a.animationFrameId),a.bubbleParticles=[],a.revealProgress=0,a.workerParticles=a.workerParticles.map(t=>{const n=_[a.appProps.startPosition]();return{x:n.x,y:n.y,initialX:n.x,initialY:n.y,targetX:t.targetX,targetY:t.targetY,scale:1,opacity:1,color:t.color,revealProgress:0,revealThreshold:t.revealThreshold}}),a.frameContext.clearRect(0,0,a.frameCanvas.width,a.frameCanvas.height);const e=a.frameCanvas.transferToImageBitmap();a.mainContext.transferFromImageBitmap(e),a.animationFrameId&&cancelAnimationFrame(a.animationFrameId)};self.onmessage=e=>{const{payload:t,type:n}=e.data;switch(n){case P.INITIALIZE:{Dt(t),self.postMessage({type:f.INITIALIZED,data:a.appProps});break}case P.PLAY:{Ft(),Bt();break}case P.RESIZE_PARTICLE_RADIUS:{a.appProps.particleRadius=t,a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:i,blockHeight:r,blockWidth:o}=R(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);if(a.validBlocks=i,a.blockHeight=r,a.blockWidth=o,a.workerParticles=W({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition}),a.textBoundaries=q(a.workerParticles,a.appProps.particleRadius),self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const s=performance.now();D(s,s)}break}case P.UPDATE_START_POSITION:{if(a.appProps.startPosition=t,a.workerParticles.length){if(a.workerParticles.forEach(i=>{const r=_[a.appProps.startPosition]();i.initialX=r.x,i.initialY=r.y,i.x=r.x,i.y=r.y}),self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const i=performance.now();D(i,i)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:a.workerParticles});break}case P.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:i,movementFunctionCode:r}=t??{};i&&(a.appProps.selectedMovementFunction=i),r!=null&&(a.appProps.movementFunctionCode=r),self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}case P.UPDATE_TEXT:{a.appProps.text=t,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}case P.UPDATE_FONT:{a.appProps.font=t,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}case P.UPDATE_PARTICLE_COLORS:{if(a.appProps.particleColors=t,t.length>0,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const i=performance.now();D(i,i)}break}case P.UPDATE_BITMAP:{if(a.imageBitmap=t,a.frameCanvas&&a.mainCanvas){a.frameCanvas.width=a.imageBitmap.width,a.frameCanvas.height=a.imageBitmap.height,a.mainCanvas.width=a.imageBitmap.width,a.mainCanvas.height=a.imageBitmap.height,a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:i,blockHeight:r,blockWidth:o}=R(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);a.textBoundaries=q(a.workerParticles,a.appProps.particleRadius),a.validBlocks=i,a.blockHeight=r,a.blockWidth=o,_=Z({dimensions:{width:a.mainCanvas.width,height:a.mainCanvas.height}}),a.workerParticles=W({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition})}break}case P.UPDATE_ANIMATION_DURATION:{a.appProps.animationDuration=t,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId&&(a.bubbleParticles=[]);break}case P.UPDATE_ENABLE_BUBBLES:{a.appProps.enableBubbles=t,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}case P.UPDATE_ENABLE_IMAGE_PARTICLES:{a.appProps.enableImageParticles=t,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}case P.UPDATE_SELECTED_EFFECT:{a.appProps.selectedEffect=t,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}case P.UPDATE_EFFECT_CONFIGURATION:{const{effectType:i,configuration:r}=t;a.appProps.effectConfigurations[i]=r,self.postMessage({type:f.UPDATE_APP_PROPS,data:a.appProps});break}}}})();
