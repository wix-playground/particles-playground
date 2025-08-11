(function(){"use strict";const it="random",F="DEV_EXAMPLE",ot="WIX 🤠",z="#ffffff",rt=["#ff0000","#00ff00","#0000ff"],G={fontFamily:"Arial",fontSize:90,italic:!1,weight:400,letterSpacing:0,textColor:z},st=`// This function will be called twice for each particle, because all particles reach the target in two frames.
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
}`,V=1300;var f=(e=>(e.INITIALIZE="INITIALIZE",e.PLAY="PLAY",e.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",e.UPDATE_START_POSITION="UPDATE_START_POSITION",e.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",e.UPDATE_SELECTED_EFFECT="UPDATE_SELECTED_EFFECT",e.UPDATE_EFFECT_CONFIGURATION="UPDATE_EFFECT_CONFIGURATION",e.UPDATE_BITMAP="UPDATE_BITMAP",e.UPDATE_TEXT="UPDATE_TEXT",e.UPDATE_FONT="UPDATE_FONT",e.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",e.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",e.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",e.UPDATE_ENABLE_IMAGE_PARTICLES="UPDATE_ENABLE_IMAGE_PARTICLES",e))(f||{}),T=(e=>(e.INITIALIZED="INITIALIZED",e.UPDATE_APP_PROPS="UPDATE_APP_PROPS",e))(T||{});const lt=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],ut=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,pt=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,ht=()=>Object.assign({},{[F]:{code:`${v}${ct}`},DEV_TWO_FRAMES:{code:`${v}${st}`},bezier:{code:`${v}${ut}`},pulseColorCycle:{code:`${v}${mt}`},timeDistortion:{code:`${v}${pt}`},elasticPlop:{code:`${v}${dt}`}},...lt.map(({name:e,comment:t,definition:n})=>({[e]:{code:`${v}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
};`}}))),U=(e,t)=>{const{width:i,height:o,data:s}=e,c=Math.ceil(i/t),l=Math.ceil(o/t),r=new Uint8Array(Math.ceil(i/t)*Math.ceil(o/t));let u=0;for(let d=0;d<o;d+=t)for(let P=0;P<i;P+=t){let h=!1;for(let m=0;m<t&&!h;m++)for(let g=0;g<t&&!h;g++){const p=P+g,M=d+m;if(p<i&&M<o){const b=(M*i+p)*4;s[b+3]>10&&(h=!0)}}r[u++]=h?1:0}return{validBlocks:r,blockWidth:c,blockHeight:l}},R=(e,t,n)=>e+n*(t-e),Q=e=>{e=e.replace(/^#/,"");const t=parseInt(e,16),n=t>>16&255,i=t>>8&255,o=t&255;return{r:n,g:i,b:o}},gt=(e,t,n)=>"#"+((1<<24)+(e<<16)+(t<<8)+n).toString(16).slice(1),L=(e,t)=>{if(!(e!=null&&e.length))return"#ffffff";if(e.length===1)return e[0];const i=Math.max(0,Math.min(1,t))*(e.length-1),o=Math.floor(i);if(o===e.length-1)return e[e.length-1];const s=i-o,c=Q(e[o]),l=Q(e[o+1]),r=Math.round(R(c.r,l.r,s)),u=Math.round(R(c.g,l.g,s)),d=Math.round(R(c.b,l.b,s));return gt(r,u,d)},Z=({dimensions:{width:e,height:t}})=>({top:()=>({x:Math.random()*e,y:0}),center:()=>({x:Math.round(e/2),y:Math.round(t/2)}),bottom:()=>({x:Math.random()*e,y:t}),random:()=>({x:Math.random()*e,y:Math.random()*t}),left:()=>({x:0,y:Math.random()*t}),right:()=>({x:e,y:Math.random()*t}),"top-left":()=>({x:Math.random()*(e/5),y:Math.random()*(t/5)}),"top-right":()=>({x:e,y:Math.random()*(t/5)}),"bottom-left":()=>({x:Math.random()*(e/5),y:t-Math.random()*(t/5)}),"bottom-right":()=>({x:e-Math.random()*(e/5),y:t-Math.random()*(t/5)})}),N=(e,t)=>{if(e.length===0)return{width:0,height:0,minX:0,minY:0,maxX:0,maxY:0};let n=1/0,i=1/0,o=-1/0,s=-1/0;return e.forEach(c=>{n=Math.min(n,c.targetX),i=Math.min(i,c.targetY),o=Math.max(o,c.targetX+t),s=Math.max(s,c.targetY+t)}),{minX:n,minY:i,maxX:o,maxY:s,width:o-n,height:s-i}},Pt=e=>{e.x+=e.dx,e.y+=e.dy,e.dx+=(Math.random()-.5)*.1,e.dy-=.02},ft=(e,t)=>t-e.createdAt>=e.lifetime,Mt=(e,t)=>{if(t>(e.revealThreshold||.99))return 1;if(t>.85&&Math.sqrt(Math.pow(e.x-e.targetX,2)+Math.pow(e.y-e.targetY,2))<=5){const o=(e.revealThreshold||.99)-.02,s=Math.max(0,(t-o)/.02);return Math.min(1,s)}return 0},Tt=(e,t,n,i,o=5)=>{const s=[];for(let c=0;c<o;c++){const l=Math.random()*Math.PI*2,r=.5+Math.random()*2;s.push({x:e,y:t,dx:Math.cos(l)*r,dy:Math.sin(l)*r-1,radius:2+Math.random()*5,color:n,opacity:.7+Math.random()*.3,createdAt:i,lifetime:V})}return s},bt=({bubble:e,requestAnimationFrameTime:t,context:n,particleColors:i})=>{const o=t-e.createdAt,s=Math.min(1,o/e.lifetime),c=e.opacity*(1-s);n.beginPath(),n.arc(Math.floor(e.x),Math.floor(e.y),e.radius,0,Math.PI*2),n.fillStyle=L(i,s),n.globalAlpha=c,n.fill()},K=({particle:e,context:t,particleRadius:n,imageBitmap:i})=>{t.globalAlpha=e.opacity||1,t.drawImage(i,e.targetX,e.targetY,n,n,Math.floor(e.x),Math.floor(e.y),n,n)},yt=({particle:e,context:t,particleRadius:n,particleColors:i,revealProgress:o})=>{const s=Math.floor(n*(e.scale||1));t.globalAlpha=e.opacity||1,t.beginPath(),t.arc(Math.floor(e.x)+s/2,Math.floor(e.y)+s/2,s/2,0,2*Math.PI),t.fillStyle=i.length?L(i,o):e.color,t.fill()},It=({particle:e,blendFactor:t,context:n,particleRadius:i,particleColors:o,revealProgress:s,imageBitmap:c})=>{const l=Math.floor(i*(e.scale||1));n.globalAlpha=(e.opacity||1)*(1-t),n.beginPath(),n.arc(Math.floor(e.x)+l/2,Math.floor(e.y)+l/2,l/2,0,2*Math.PI),n.fillStyle=o.length?L(o,s):e.color,n.fill(),n.globalAlpha=t,n.drawImage(c,e.targetX,e.targetY,i,i,Math.floor(e.x),Math.floor(e.y),i,i)},Et=({particle:e,context:t,particleRadius:n,particleColors:i,revealProgress:o,imageBitmap:s,enableImageParticles:c})=>{if(c)K({particle:e,context:t,particleRadius:n,imageBitmap:s});else{const l=Mt(e,o);l>0&&l<1?It({particle:e,blendFactor:l,context:t,particleRadius:n,particleColors:i,revealProgress:o,imageBitmap:s}):l>=1?K({particle:e,context:t,particleRadius:n,imageBitmap:s}):yt({particle:e,context:t,particleRadius:n,particleColors:i,revealProgress:o})}},vt=e=>e.x===e.targetX&&e.y===e.targetY,q={"ease-in-out":e=>e*(2-e),"ease-in":e=>e*e,"ease-out":e=>1-(1-e)*(1-e),linear:e=>e,"quadratic-out":e=>e*(2-e),"ease-out-quart":e=>1-Math.pow(1-e,4),"ease-in-out-quint":e=>e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2},_={BUILD:"BUILD",SUPER_SWIRL:"SUPER_SWIRL",OPPENHEIMER:"OPPENHEIMER",SCANNING:"SCANNING",EXPLOSION:"EXPLOSION"},xt={factory:e=>({particle:t,progress:n})=>{const{swirlTurns:i,spiralDirection:o,easingType:s,affectOpacity:c,affectScale:l}=e,r=Math.min(n,1),u=q[s](r);if(!t._started){const h=t.initialX-t.targetX,m=t.initialY-t.targetY;t._radius=Math.sqrt(h*h+m*m),t._angle=Math.atan2(m,h),t._turns=i+Math.random(),t._started=!0}const d=t._radius*(1-u),P=t._angle+o*2*Math.PI*t._turns*u;t.x=t.targetX+d*Math.cos(P),t.y=t.targetY+d*Math.sin(P),l?t.scale=1+2*(1-u):t.scale=1,c?t.opacity=u:t.opacity=1,t.color=`rgba(255,255,255,${t.opacity})`,r>=1&&(t.x=t.targetX,t.y=t.targetY,t.opacity=1,t.scale=1)},defaultConfig:{swirlTurns:2,spiralDirection:1,easingType:"ease-in-out",affectOpacity:!0,affectScale:!0},commonControls:{startPosition:!0}},Ct={factory:e=>({particle:t,progress:n})=>{const{horizontalPhaseEnd:i,verticalCompressionFactor:o,scalingBoost:s,bouncyIntensity:c,bouncyOffset:l}=e,r=1,u=.6,d=1.1,P=.2,h=.1,m=.5;if(t.customProps||(t.customProps={originalScale:t.scale,originalOpacity:t.opacity}),n>=1)return t.x=t.targetX,t.y=t.targetY,t.scale=t.customProps.originalScale,t.opacity=t.customProps.originalOpacity,t;const g=p=>{const M=2*Math.PI/3;return p===0?0:p===1?1:Math.pow(2,-c*p)*Math.sin((p*c-l)*M)+1};if(n<i){const p=n/i,M=g(p);t.x=t.initialX+(t.targetX-t.initialX)*M,t.y=t.initialY;const b=t.customProps.originalScale,I=1-Math.sin(p*Math.PI)*P;t.scale=b*I}else if(n<r){const p=(n-i)/(r-i),M=g(p);t.x=t.targetX;const b=(t.initialY+t.targetY)/2,I=b+(t.targetY-b)*o,w=p<u?0:(()=>{const H=(p-u)/(1-u);return 1-Math.pow(1-H,d)})(),x=t.initialY+(I-t.initialY)*M;t.y=x+(t.targetY-I)*w;const C=t.customProps.originalScale,E=1-Math.sin(p*Math.PI)*h,A=p<m?1+(1-p/m)*s:1;t.scale=C*E*A}return t},defaultConfig:{horizontalPhaseEnd:.4,verticalCompressionFactor:.45,scalingBoost:.3,bouncyIntensity:10,bouncyOffset:.75,startPosition:"center"},commonControls:{startPosition:!0}},At={factory:e=>({particle:t,progress:n})=>{const{windStrength:i,turbulenceScale:o,oscillationAmount:s,settlingSpeed:c,particleWeight:l}=e;t.windProps||(t.windProps={originalScale:t.scale,originalOpacity:t.opacity,gustSensitivity:(.5+Math.random()*1.5)/l,gustFrequency:1+Math.random()*2,turbulenceScale:(10+Math.random()*40)*(o/25),drift:(Math.random()-.5)*2,weight:(.3+Math.random()*.7)*l,flutterAmount:(Math.random()*.8+.2)*s,flutterSpeed:3+Math.random()*6,delay:Math.random()*.15/c,turbPhaseX:Math.random()*1e3,turbPhaseY:Math.random()*1e3,sinePhaseX:Math.random()*Math.PI*2,sinePhaseY:Math.random()*Math.PI*2,opacityPhase:Math.random()*Math.PI*2,burstOpacity:Math.random()>.7});let r=Math.max(0,(n-t.windProps.delay)/(1-t.windProps.delay));r=Math.min(1,Math.pow(r,1/c));let u;if(r<.25)u=r*4*i;else if(r<.75){const y=(r-.25)/.5;u=i+Math.sin(y*Math.PI*3)*i*.3,u+=Math.sin(y*Math.PI*8)*i*.15}else u=i*(1-(r-.75)/.25);let d,P;const h=c;if(r<.25){const y=Math.pow(r/.25,2);d=t.initialX+(t.targetX-t.initialX)*y*.15*h,P=t.initialY+(t.targetY-t.initialY)*y*.15*h}else if(r<.75){const j=.15+(r-.25)/.5*.6*h;d=t.initialX+(t.targetX-t.initialX)*Math.min(j,.75),P=t.initialY+(t.targetY-t.initialY)*Math.min(j,.75)}else{const y=(r-.75)/.25,nt=.75+(1-Math.pow(1-y,3))*.25;d=t.initialX+(t.targetX-t.initialX)*nt,P=t.initialY+(t.targetY-t.initialY)*nt}const m=r*10,g=Math.sin((m*.3+t.windProps.turbPhaseX)*t.windProps.gustFrequency)*t.windProps.turbulenceScale,p=Math.sin((m*.7+t.windProps.turbPhaseX*.5)*t.windProps.gustFrequency*1.5)*t.windProps.turbulenceScale*.5,M=Math.sin((m*1.1+t.windProps.turbPhaseX*.8)*t.windProps.gustFrequency*2.3)*t.windProps.turbulenceScale*.3,b=Math.cos((m*.4+t.windProps.turbPhaseY)*t.windProps.gustFrequency)*t.windProps.turbulenceScale*.8,I=Math.cos((m*.9+t.windProps.turbPhaseY*.7)*t.windProps.gustFrequency*1.8)*t.windProps.turbulenceScale*.4,w=Math.cos((m*1.3+t.windProps.turbPhaseY*.3)*t.windProps.gustFrequency*2.1)*t.windProps.turbulenceScale*.25,x=(g+p+M)*u*t.windProps.gustSensitivity,C=(b+I+w)*u*t.windProps.gustSensitivity,E=30*Math.sin(r*Math.PI*.7)*t.windProps.drift*u,A=25*u*t.windProps.flutterAmount,H=A*Math.sin(r*Math.PI*t.windProps.flutterSpeed+t.windProps.sinePhaseX),Ut=A*.5*Math.cos(r*Math.PI*t.windProps.flutterSpeed*.7+t.windProps.sinePhaseY),et=1/t.windProps.weight;t.x=d+(x+H+E)/et,t.y=P+(C+Ut)/et;const Rt=t.windProps.originalScale,Lt=Math.sin(r*Math.PI*t.windProps.flutterSpeed*1.5+t.windProps.sinePhaseX)*.15*s,Nt=Math.sin(r*Math.PI*2)*.1*u;t.scale=Rt*(1+Lt+Nt);let qt=t.windProps.originalOpacity,$=0;t.windProps.burstOpacity?$=Math.sin(r*Math.PI*20+t.windProps.opacityPhase)*.2*u:$=Math.sin(r*Math.PI*10+t.windProps.opacityPhase)*.1*u;let B;r<.1?B=r/.1:r>.9?B=1:B=1+$,t.opacity=qt*Math.min(1,Math.max(.2,B));let D=0,Y=100,k=70;if(t.origColor)D=t.origColor.hue,Y=t.origColor.saturation,k=t.origColor.lightness;else{if(t.color.startsWith("hsl")){const y=t.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);y&&(D=parseInt(y[1],10),Y=parseInt(y[2],10),k=parseInt(y[3],10))}else D=(220+Math.random()*40)%360,Y=10+Math.random()*15,k=70+Math.random()*20;t.origColor={hue:D,saturation:Y,lightness:k}}const at=u*20,Wt=(D+Math.sin(r*Math.PI*3)*5*u)%360,Ht=Math.max(0,Y-at*.5),$t=Math.min(100,k+at*.3);t.color=`hsl(${Wt}, ${Ht}%, ${$t}%)`,n>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=t.windProps.originalScale,t.opacity=t.windProps.originalOpacity)},defaultConfig:{windStrength:1,turbulenceScale:60,oscillationAmount:1.5,settlingSpeed:1.5,particleWeight:.7},commonControls:{startPosition:!0}},wt={factory:e=>({particle:t,progress:n,textBoundaries:i})=>{const{oscillationFrequency:o,settlementThreshold:s,scanningRange:c,passDistribution:l,settlementTiming:r}=e,u=o*2;if(t.animation===void 0){t.id=crypto.randomUUID();const I=t.id.split("").reduce((E,A)=>(E<<5)-E+A.charCodeAt(0),0),w=Math.abs(I),x=Math.max(1,Math.floor(u*l));let C;if(r==="early"){const E=Math.max(1,Math.floor(x/3));C=w%E+1}else if(r==="late"){const E=Math.max(1,Math.floor(x/3)),A=x-E+1;C=w%E+A}else C=w%x+1;t.animation={settled:!1,assignedPass:C,currentPass:0},t.y=t.targetY,t.opacity=1}if(t.animation.settled)return t.x=t.targetX,t.y=t.targetY,t;const d=i.maxX-i.minX;if(d<=0||!isFinite(d))return t;const P=Math.sin(n*o*Math.PI*2),h=n*u,m=Math.min(Math.floor(h)+1,u);m>t.animation.currentPass&&(t.animation.currentPass=m);const g=i.minX-c,p=i.maxX+c,M=g+(P+1)/2*(p-g);t.x=M;const b=Math.abs(t.x-t.targetX);t.animation.currentPass>=t.animation.assignedPass&&b<=s&&(t.x=t.targetX,t.y=t.targetY,t.animation.settled=!0)},defaultConfig:{oscillationFrequency:3,settlementThreshold:12,scanningRange:30,passDistribution:.85,settlementTiming:"distributed"},commonControls:{startPosition:!1}},St={factory:e=>({particle:t,progress:n,canvasDimensions:i})=>{const{explosionStrength:o,deconstructionPhase:s,orbitalRadius:c,depthOffset:l}=e;if(!t.isInitialized){t.isInitialized=!0;const m=o+Math.random()*o*.5,g=Math.random()*Math.PI*2,p=Math.acos(Math.random()*2-1);t.explodedPos={x:t.initialX+Math.cos(g)*Math.sin(p)*m,y:t.initialY+Math.sin(g)*Math.sin(p)*m,z:l+Math.cos(p)*m},t.finalPos={x:t.targetX,y:t.targetY,z:0}}let r,u=1;const d=s;if(n<d){const m=n/d,g=q["ease-out-quart"](m);r={x:t.initialX+(t.explodedPos.x-t.initialX)*g,y:t.initialY+(t.explodedPos.y-t.initialY)*g,z:0+(t.explodedPos.z-0)*g},u=1+1.5*Math.sin(m*Math.PI)}else{const m=(n-d)/(1-d),g=q["ease-in-out-quint"](m);r={x:t.explodedPos.x+(t.finalPos.x-t.explodedPos.x)*g,y:t.explodedPos.y+(t.finalPos.y-t.explodedPos.y)*g,z:t.explodedPos.z+(t.finalPos.z-t.explodedPos.z)*g},u=1+.8*Math.sin(m*Math.PI);const p=Math.max(0,(m-.7)/.3);if(p>0){const M=1-p,b=p*Math.PI*4,I=c*M*M;r.x+=Math.cos(b)*I,r.y+=Math.sin(b)*I}}const P=i.width*1.2,h=P/(P-r.z);t.x=(r.x-i.width/2)*h+i.width/2,t.y=(r.y-i.height/2)*h+i.height/2,t.scale=Math.max(0,h),t.opacity=Math.max(0,Math.min(1,h))*u,n>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1)},defaultConfig:{explosionStrength:1e3,deconstructionPhase:.4,orbitalRadius:15,depthOffset:-500},commonControls:{startPosition:!0}},S={[_.SUPER_SWIRL]:xt,[_.BUILD]:Ct,[_.OPPENHEIMER]:At,[_.SCANNING]:wt,[_.EXPLOSION]:St};let J;const tt={particleRadius:5,startPosition:it,selectedMovementFunction:F,selectedEffect:null,effectConfigurations:{SUPER_SWIRL:S.SUPER_SWIRL.defaultConfig,BUILD:S.BUILD.defaultConfig,OPPENHEIMER:S.OPPENHEIMER.defaultConfig,SCANNING:S.SCANNING.defaultConfig,EXPLOSION:S.EXPLOSION.defaultConfig},movementFunctionCode:ht()[F].code,text:ot,font:G,particleColors:rt,animationDuration:3e3,enableBubbles:!1,enableImageParticles:!1},a={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:tt,revealProgress:0,textBoundaries:null};let X;const _t=async e=>{a.mainCanvas=e,a.mainContext=a.mainCanvas.getContext("bitmaprenderer"),a.frameCanvas=new OffscreenCanvas(a.mainCanvas.width,a.mainCanvas.height),a.frameContext=a.frameCanvas.getContext("2d",{willReadFrequently:!0})},Xt=e=>{const{imageBitmap:t,canvas:n,dimensions:i,appProps:o}=e;if(a.imageBitmap=t,Object.keys(o).length){const r={...o.font,textColor:o.font.textColor??G.textColor};a.appProps={...tt,...o,font:r}}_t(n),a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:s,blockHeight:c,blockWidth:l}=U(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);a.textBoundaries=N(a.workerParticles,a.appProps.particleRadius),a.validBlocks=s,a.blockHeight=c,a.blockWidth=l,X=Z({dimensions:i}),a.workerParticles=W({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition})},W=({validBlocks:e,radius:t,blockHeight:n,blockWidth:i,startPosition:o})=>{const s=[];for(let c=0;c<n;c++)for(let l=0;l<i;l++){const r=c*i+l;if(e[r]){const u=l*t,d=c*t,{x:P,y:h}=X[o]();s.push({targetX:u,targetY:d,x:P,y:h,initialX:P,initialY:h,scale:1,opacity:1,color:z,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return s},Ot=e=>{for(let t=a.bubbleParticles.length-1;t>=0;t--){const n=a.bubbleParticles[t];Pt(n),bt({bubble:n,requestAnimationFrameTime:e,context:a.frameContext,particleColors:a.appProps.particleColors}),ft(n,e)&&a.bubbleParticles.splice(t,1)}a.frameContext.globalAlpha=1},Dt=(e,t,n)=>{J(e,t,n,{width:a.mainCanvas.width,height:a.mainCanvas.height},a.appProps.animationDuration)},Yt=(e,t)=>{if(!e.emittedBubbles&&a.appProps.enableBubbles&&e.x===e.targetX&&e.y===e.targetY){e.emittedBubbles=!0;const n=Tt(e.x,e.y,e.color,t,2+Math.floor(Math.random()*3));a.bubbleParticles.push(...n)}},kt=(e,t)=>{let n=!0,i=null;if(a.appProps.selectedEffect){const o=S[a.appProps.selectedEffect],s=a.appProps.effectConfigurations[a.appProps.selectedEffect];i=o.factory(s)}return a.workerParticles.forEach(o=>{if(i){const s=t-e,c=Math.min(s/a.appProps.animationDuration,1);i({particle:o,progress:c,textBoundaries:a.textBoundaries,canvasDimensions:{width:a.mainCanvas.width,height:a.mainCanvas.height}})}else Dt(o,e,t);Et({particle:o,context:a.frameContext,particleRadius:a.appProps.particleRadius,particleColors:a.appProps.particleColors,revealProgress:a.revealProgress,imageBitmap:a.imageBitmap,enableImageParticles:a.appProps.enableImageParticles}),Yt(o,t),!vt(o)&&a.revealProgress>=.99&&(n=!1)}),n},O=(e,t)=>{a.frameContext.clearRect(0,0,a.frameCanvas.width,a.frameCanvas.height);const n=t-e;a.revealProgress=Math.min(1,n/a.appProps.animationDuration),Ot(t);const i=kt(e,t),o=a.frameCanvas.transferToImageBitmap();a.mainContext.transferFromImageBitmap(o);const s=i&&a.revealProgress>=1,c=a.appProps.animationDuration+(a.appProps.enableBubbles?V:0);s&&n>=c?a.animationFrameId&&(cancelAnimationFrame(a.animationFrameId),a.bubbleParticles=[],a.frameContext.drawImage(a.imageBitmap,0,0)):a.animationFrameId=requestAnimationFrame(r=>O(e,r))},Bt=()=>{J=new Function(a.appProps.movementFunctionCode)();const e=performance.now();a.revealProgress=0,a.bubbleParticles=[],a.workerParticles.forEach(t=>{t.emittedBubbles=!1}),O(e,e)},Ft=()=>{a.animationFrameId&&cancelAnimationFrame(a.animationFrameId),a.bubbleParticles=[],a.revealProgress=0,a.workerParticles=a.workerParticles.map(t=>{const n=X[a.appProps.startPosition]();return{x:n.x,y:n.y,initialX:n.x,initialY:n.y,targetX:t.targetX,targetY:t.targetY,scale:1,opacity:1,color:t.color,revealProgress:0,revealThreshold:t.revealThreshold}}),a.frameContext.clearRect(0,0,a.frameCanvas.width,a.frameCanvas.height);const e=a.frameCanvas.transferToImageBitmap();a.mainContext.transferFromImageBitmap(e),a.animationFrameId&&cancelAnimationFrame(a.animationFrameId)};self.onmessage=e=>{const{payload:t,type:n}=e.data;switch(n){case f.INITIALIZE:{Xt(t),self.postMessage({type:T.INITIALIZED,data:a.appProps});break}case f.PLAY:{Ft(),Bt();break}case f.RESIZE_PARTICLE_RADIUS:{a.appProps.particleRadius=t,a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:i,blockHeight:o,blockWidth:s}=U(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);if(a.validBlocks=i,a.blockHeight=o,a.blockWidth=s,a.workerParticles=W({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition}),a.textBoundaries=N(a.workerParticles,a.appProps.particleRadius),self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const c=performance.now();O(c,c)}break}case f.UPDATE_START_POSITION:{if(a.appProps.startPosition=t,a.workerParticles.length){if(a.workerParticles.forEach(i=>{const o=X[a.appProps.startPosition]();i.initialX=o.x,i.initialY=o.y,i.x=o.x,i.y=o.y}),self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const i=performance.now();O(i,i)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:a.workerParticles});break}case f.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:i,movementFunctionCode:o}=t??{};i&&(a.appProps.selectedMovementFunction=i),o!=null&&(a.appProps.movementFunctionCode=o),self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}case f.UPDATE_TEXT:{a.appProps.text=t,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}case f.UPDATE_FONT:{a.appProps.font=t,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}case f.UPDATE_PARTICLE_COLORS:{if(a.appProps.particleColors=t,t.length>0,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId){cancelAnimationFrame(a.animationFrameId);const i=performance.now();O(i,i)}break}case f.UPDATE_BITMAP:{if(a.imageBitmap=t,a.frameCanvas&&a.mainCanvas){a.frameCanvas.width=a.imageBitmap.width,a.frameCanvas.height=a.imageBitmap.height,a.mainCanvas.width=a.imageBitmap.width,a.mainCanvas.height=a.imageBitmap.height,a.frameContext.drawImage(a.imageBitmap,0,0);const{validBlocks:i,blockHeight:o,blockWidth:s}=U(a.frameContext.getImageData(0,0,a.mainCanvas.width,a.mainCanvas.height),a.appProps.particleRadius);a.textBoundaries=N(a.workerParticles,a.appProps.particleRadius),a.validBlocks=i,a.blockHeight=o,a.blockWidth=s,X=Z({dimensions:{width:a.mainCanvas.width,height:a.mainCanvas.height}}),a.workerParticles=W({validBlocks:a.validBlocks,radius:a.appProps.particleRadius,blockHeight:a.blockHeight,blockWidth:a.blockWidth,startPosition:a.appProps.startPosition})}break}case f.UPDATE_ANIMATION_DURATION:{a.appProps.animationDuration=t,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps}),a.animationFrameId&&(a.bubbleParticles=[]);break}case f.UPDATE_ENABLE_BUBBLES:{a.appProps.enableBubbles=t,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}case f.UPDATE_ENABLE_IMAGE_PARTICLES:{a.appProps.enableImageParticles=t,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}case f.UPDATE_SELECTED_EFFECT:{a.appProps.selectedEffect=t,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}case f.UPDATE_EFFECT_CONFIGURATION:{const{effectType:i,configuration:o}=t;a.appProps.effectConfigurations[i]=o,self.postMessage({type:T.UPDATE_APP_PROPS,data:a.appProps});break}}}})();
