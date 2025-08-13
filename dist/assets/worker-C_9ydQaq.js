(function(){"use strict";const Te="random",_t="DEV_EXAMPLE",Ee="WIX 🤠",Lt="#ffffff",Oe=["#ff0000","#00ff00","#0000ff"],Xt={fontFamily:"Arial",fontSize:90,italic:!1,weight:400,letterSpacing:0,textColor:Lt},Me=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,Y=`/**
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
 * @param {number} particle.delay - Amount of time before the particle start to be drawn.
 * @param {number} animationStartTime - The timestamp when the animation started.
 * @param {number} currentTime - The current timestamp of the animation frame.
 * @param {Object} canvasDimensions - The dimensions of the canvas.
 * @param {number} canvasDimensions.width - Width of the canvas where particles are being rendered.
 * @param {number} canvasDimensions.height - Height of the canvas where particles are being rendered.
 * @param {number} animationDuration - The duration of the animation.
 * @param {Object} textBoundaries - The boundaries of the text.
 * @param {number} textBoundaries.width - The width of the text.
 * @param {number} textBoundaries.height - The height of the text.
 * @param {number} textBoundaries.minX - The minimum x-coordinate of the text.
 * @param {number} textBoundaries.minY - The minimum y-coordinate of the text.
 * @param {number} textBoundaries.maxX - The maximum x-coordinate of the text.
 * @param {number} textBoundaries.maxY - The maximum y-coordinate of the text.
 * @returns {Function} A function to be called on each animation frame to update the particle's position.
 */
`,Se=`${Y}
return (() => {
    /**
     * Define the configuration for the movement function.
     * Movement function can access the configuration object and use it to modify the behavior of the animation.
     * For example, in Swirl effect you can configure the number of swirls, the speed of the swirls, the direction of the swirls, etc.
     */
    const config = { /* animation parameters here */ };

    return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration, textBoundaries) => {
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
    }
})()
`,Bt=1300;var D=(s=>(s.INITIALIZE="INITIALIZE",s.PLAY="PLAY",s.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",s.UPDATE_START_POSITION="UPDATE_START_POSITION",s.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",s.UPDATE_SELECTED_EFFECT="UPDATE_SELECTED_EFFECT",s.UPDATE_EFFECT_CONFIGURATION="UPDATE_EFFECT_CONFIGURATION",s.UPDATE_BITMAP="UPDATE_BITMAP",s.UPDATE_TEXT="UPDATE_TEXT",s.UPDATE_FONT="UPDATE_FONT",s.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",s.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",s.UPDATE_DELAY="UPDATE_DELAY",s.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",s.UPDATE_ENABLE_IMAGE_PARTICLES="UPDATE_ENABLE_IMAGE_PARTICLES",s))(D||{}),N=(s=>(s.INITIALIZED="INITIALIZED",s.UPDATE_APP_PROPS="UPDATE_APP_PROPS",s))(N||{});const Ae=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],Ie=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
`,ke=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,Re=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,Ce=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,De=()=>Object.assign({},{[_t]:{code:`${Y}${Se}`},DEV_TWO_FRAMES:{code:`${Y}${Me}`},bezier:{code:`${Y}${Ie}`},pulseColorCycle:{code:`${Y}${ke}`},timeDistortion:{code:`${Y}${Re}`},elasticPlop:{code:`${Y}${Ce}`}},...Ae.map(({name:s,comment:t,definition:r})=>({[s]:{code:`${Y}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${t}
    ${r}
    const lerp = (start, end, t) => start + t * (end - start);

    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);
    const easedProgress = ${s}(progress);

    particle.x = lerp(particle.initialX, particle.targetX, easedProgress);
    particle.y = lerp(particle.initialY, particle.targetY, easedProgress);

    if (
        Math.abs(particle.x - particle.targetX) < 1 &&
        Math.abs(particle.y - particle.targetY) < 1
    ) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    }
};`}})));var ut={exports:{}},q={},J={exports:{}},ht={},ct={},Yt;function pt(){if(Yt)return ct;Yt=1;function s(e){this.__parent=e,this.__character_count=0,this.__indent_count=-1,this.__alignment_count=0,this.__wrap_point_index=0,this.__wrap_point_character_count=0,this.__wrap_point_indent_count=-1,this.__wrap_point_alignment_count=0,this.__items=[]}s.prototype.clone_empty=function(){var e=new s(this.__parent);return e.set_indent(this.__indent_count,this.__alignment_count),e},s.prototype.item=function(e){return e<0?this.__items[this.__items.length+e]:this.__items[e]},s.prototype.has_match=function(e){for(var a=this.__items.length-1;a>=0;a--)if(this.__items[a].match(e))return!0;return!1},s.prototype.set_indent=function(e,a){this.is_empty()&&(this.__indent_count=e||0,this.__alignment_count=a||0,this.__character_count=this.__parent.get_indent_size(this.__indent_count,this.__alignment_count))},s.prototype._set_wrap_point=function(){this.__parent.wrap_line_length&&(this.__wrap_point_index=this.__items.length,this.__wrap_point_character_count=this.__character_count,this.__wrap_point_indent_count=this.__parent.next_line.__indent_count,this.__wrap_point_alignment_count=this.__parent.next_line.__alignment_count)},s.prototype._should_wrap=function(){return this.__wrap_point_index&&this.__character_count>this.__parent.wrap_line_length&&this.__wrap_point_character_count>this.__parent.next_line.__character_count},s.prototype._allow_wrap=function(){if(this._should_wrap()){this.__parent.add_new_line();var e=this.__parent.current_line;return e.set_indent(this.__wrap_point_indent_count,this.__wrap_point_alignment_count),e.__items=this.__items.slice(this.__wrap_point_index),this.__items=this.__items.slice(0,this.__wrap_point_index),e.__character_count+=this.__character_count-this.__wrap_point_character_count,this.__character_count=this.__wrap_point_character_count,e.__items[0]===" "&&(e.__items.splice(0,1),e.__character_count-=1),!0}return!1},s.prototype.is_empty=function(){return this.__items.length===0},s.prototype.last=function(){return this.is_empty()?null:this.__items[this.__items.length-1]},s.prototype.push=function(e){this.__items.push(e);var a=e.lastIndexOf(`
`);a!==-1?this.__character_count=e.length-a:this.__character_count+=e.length},s.prototype.pop=function(){var e=null;return this.is_empty()||(e=this.__items.pop(),this.__character_count-=e.length),e},s.prototype._remove_indent=function(){this.__indent_count>0&&(this.__indent_count-=1,this.__character_count-=this.__parent.indent_size)},s.prototype._remove_wrap_indent=function(){this.__wrap_point_indent_count>0&&(this.__wrap_point_indent_count-=1)},s.prototype.trim=function(){for(;this.last()===" ";)this.__items.pop(),this.__character_count-=1},s.prototype.toString=function(){var e="";return this.is_empty()?this.__parent.indent_empty_lines&&(e=this.__parent.get_indent_string(this.__indent_count)):(e=this.__parent.get_indent_string(this.__indent_count,this.__alignment_count),e+=this.__items.join("")),e};function t(e,a){this.__cache=[""],this.__indent_size=e.indent_size,this.__indent_string=e.indent_char,e.indent_with_tabs||(this.__indent_string=new Array(e.indent_size+1).join(e.indent_char)),a=a||"",e.indent_level>0&&(a=new Array(e.indent_level+1).join(this.__indent_string)),this.__base_string=a,this.__base_string_length=a.length}t.prototype.get_indent_size=function(e,a){var o=this.__base_string_length;return a=a||0,e<0&&(o=0),o+=e*this.__indent_size,o+=a,o},t.prototype.get_indent_string=function(e,a){var o=this.__base_string;return a=a||0,e<0&&(e=0,o=""),a+=e*this.__indent_size,this.__ensure_cache(a),o+=this.__cache[a],o},t.prototype.__ensure_cache=function(e){for(;e>=this.__cache.length;)this.__add_column()},t.prototype.__add_column=function(){var e=this.__cache.length,a=0,o="";this.__indent_size&&e>=this.__indent_size&&(a=Math.floor(e/this.__indent_size),e-=a*this.__indent_size,o=new Array(a+1).join(this.__indent_string)),e&&(o+=new Array(e+1).join(" ")),this.__cache.push(o)};function r(e,a){this.__indent_cache=new t(e,a),this.raw=!1,this._end_with_newline=e.end_with_newline,this.indent_size=e.indent_size,this.wrap_line_length=e.wrap_line_length,this.indent_empty_lines=e.indent_empty_lines,this.__lines=[],this.previous_line=null,this.current_line=null,this.next_line=new s(this),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1,this.__add_outputline()}return r.prototype.__add_outputline=function(){this.previous_line=this.current_line,this.current_line=this.next_line.clone_empty(),this.__lines.push(this.current_line)},r.prototype.get_line_number=function(){return this.__lines.length},r.prototype.get_indent_string=function(e,a){return this.__indent_cache.get_indent_string(e,a)},r.prototype.get_indent_size=function(e,a){return this.__indent_cache.get_indent_size(e,a)},r.prototype.is_empty=function(){return!this.previous_line&&this.current_line.is_empty()},r.prototype.add_new_line=function(e){return this.is_empty()||!e&&this.just_added_newline()?!1:(this.raw||this.__add_outputline(),!0)},r.prototype.get_code=function(e){this.trim(!0);var a=this.current_line.pop();a&&(a[a.length-1]===`
`&&(a=a.replace(/\n+$/g,"")),this.current_line.push(a)),this._end_with_newline&&this.__add_outputline();var o=this.__lines.join(`
`);return e!==`
`&&(o=o.replace(/[\n]/g,e)),o},r.prototype.set_wrap_point=function(){this.current_line._set_wrap_point()},r.prototype.set_indent=function(e,a){return e=e||0,a=a||0,this.next_line.set_indent(e,a),this.__lines.length>1?(this.current_line.set_indent(e,a),!0):(this.current_line.set_indent(),!1)},r.prototype.add_raw_token=function(e){for(var a=0;a<e.newlines;a++)this.__add_outputline();this.current_line.set_indent(-1),this.current_line.push(e.whitespace_before),this.current_line.push(e.text),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1},r.prototype.add_token=function(e){this.__add_space_before_token(),this.current_line.push(e),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=this.current_line._allow_wrap()},r.prototype.__add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&(this.non_breaking_space||this.set_wrap_point(),this.current_line.push(" "))},r.prototype.remove_indent=function(e){for(var a=this.__lines.length;e<a;)this.__lines[e]._remove_indent(),e++;this.current_line._remove_wrap_indent()},r.prototype.trim=function(e){for(e=e===void 0?!1:e,this.current_line.trim();e&&this.__lines.length>1&&this.current_line.is_empty();)this.__lines.pop(),this.current_line=this.__lines[this.__lines.length-1],this.current_line.trim();this.previous_line=this.__lines.length>1?this.__lines[this.__lines.length-2]:null},r.prototype.just_added_newline=function(){return this.current_line.is_empty()},r.prototype.just_added_blankline=function(){return this.is_empty()||this.current_line.is_empty()&&this.previous_line.is_empty()},r.prototype.ensure_empty_line_above=function(e,a){for(var o=this.__lines.length-2;o>=0;){var p=this.__lines[o];if(p.is_empty())break;if(p.item(0).indexOf(e)!==0&&p.item(-1)!==a){this.__lines.splice(o+1,0,new s(this)),this.previous_line=this.__lines[this.__lines.length-2];break}o--}},ct.Output=r,ct}var ft={},Ut;function Ft(){if(Ut)return ft;Ut=1;function s(t,r,e,a){this.type=t,this.text=r,this.comments_before=null,this.newlines=e||0,this.whitespace_before=a||"",this.parent=null,this.next=null,this.previous=null,this.opened=null,this.closed=null,this.directives=null}return ft.Token=s,ft}var dt={},Wt;function jt(){return Wt||(Wt=1,function(s){var t="\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a",r="\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a",e="\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc",a="\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f",o="\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}",p="(?:"+o+"|["+t+e+"])",l="(?:"+o+"|["+r+e+a+"])*";s.identifier=new RegExp(p+l,"g"),s.identifierStart=new RegExp(p),s.identifierMatch=new RegExp("(?:"+o+"|["+r+e+a+"])+"),s.newline=/[\n\r\u2028\u2029]/,s.lineBreak=new RegExp(`\r
|`+s.newline.source),s.allLineBreaks=new RegExp(s.lineBreak.source,"g")}(dt)),dt}var gt={},$={},zt;function mt(){if(zt)return $;zt=1;function s(e,a){this.raw_options=t(e,a),this.disabled=this._get_boolean("disabled"),this.eol=this._get_characters("eol","auto"),this.end_with_newline=this._get_boolean("end_with_newline"),this.indent_size=this._get_number("indent_size",4),this.indent_char=this._get_characters("indent_char"," "),this.indent_level=this._get_number("indent_level"),this.preserve_newlines=this._get_boolean("preserve_newlines",!0),this.max_preserve_newlines=this._get_number("max_preserve_newlines",32786),this.preserve_newlines||(this.max_preserve_newlines=0),this.indent_with_tabs=this._get_boolean("indent_with_tabs",this.indent_char==="	"),this.indent_with_tabs&&(this.indent_char="	",this.indent_size===1&&(this.indent_size=4)),this.wrap_line_length=this._get_number("wrap_line_length",this._get_number("max_char")),this.indent_empty_lines=this._get_boolean("indent_empty_lines"),this.templating=this._get_selection_list("templating",["auto","none","angular","django","erb","handlebars","php","smarty"],["auto"])}s.prototype._get_array=function(e,a){var o=this.raw_options[e],p=a||[];return typeof o=="object"?o!==null&&typeof o.concat=="function"&&(p=o.concat()):typeof o=="string"&&(p=o.split(/[^a-zA-Z0-9_\/\-]+/)),p},s.prototype._get_boolean=function(e,a){var o=this.raw_options[e],p=o===void 0?!!a:!!o;return p},s.prototype._get_characters=function(e,a){var o=this.raw_options[e],p=a||"";return typeof o=="string"&&(p=o.replace(/\\r/,"\r").replace(/\\n/,`
`).replace(/\\t/,"	")),p},s.prototype._get_number=function(e,a){var o=this.raw_options[e];a=parseInt(a,10),isNaN(a)&&(a=0);var p=parseInt(o,10);return isNaN(p)&&(p=a),p},s.prototype._get_selection=function(e,a,o){var p=this._get_selection_list(e,a,o);if(p.length!==1)throw new Error("Invalid Option Value: The option '"+e+`' can only be one of the following values:
`+a+`
You passed in: '`+this.raw_options[e]+"'");return p[0]},s.prototype._get_selection_list=function(e,a,o){if(!a||a.length===0)throw new Error("Selection list cannot be empty.");if(o=o||[a[0]],!this._is_valid_selection(o,a))throw new Error("Invalid Default Value!");var p=this._get_array(e,o);if(!this._is_valid_selection(p,a))throw new Error("Invalid Option Value: The option '"+e+`' can contain only the following values:
`+a+`
You passed in: '`+this.raw_options[e]+"'");return p},s.prototype._is_valid_selection=function(e,a){return e.length&&a.length&&!e.some(function(o){return a.indexOf(o)===-1})};function t(e,a){var o={};e=r(e);var p;for(p in e)p!==a&&(o[p]=e[p]);if(a&&e[a])for(p in e[a])o[p]=e[a][p];return o}function r(e){var a={},o;for(o in e){var p=o.replace(/-/g,"_");a[p]=e[o]}return a}return $.Options=s,$.normalizeOpts=r,$.mergeOpts=t,$}var qt;function $t(){if(qt)return gt;qt=1;var s=mt().Options,t=["before-newline","after-newline","preserve-newline"];function r(e){s.call(this,e,"js");var a=this.raw_options.brace_style||null;a==="expand-strict"?this.raw_options.brace_style="expand":a==="collapse-preserve-inline"?this.raw_options.brace_style="collapse,preserve-inline":this.raw_options.braces_on_own_line!==void 0&&(this.raw_options.brace_style=this.raw_options.braces_on_own_line?"expand":"collapse");var o=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_preserve_inline=!1,this.brace_style="collapse";for(var p=0;p<o.length;p++)o[p]==="preserve-inline"?this.brace_preserve_inline=!0:this.brace_style=o[p];this.unindent_chained_methods=this._get_boolean("unindent_chained_methods"),this.break_chained_methods=this._get_boolean("break_chained_methods"),this.space_in_paren=this._get_boolean("space_in_paren"),this.space_in_empty_paren=this._get_boolean("space_in_empty_paren"),this.jslint_happy=this._get_boolean("jslint_happy"),this.space_after_anon_function=this._get_boolean("space_after_anon_function"),this.space_after_named_function=this._get_boolean("space_after_named_function"),this.keep_array_indentation=this._get_boolean("keep_array_indentation"),this.space_before_conditional=this._get_boolean("space_before_conditional",!0),this.unescape_strings=this._get_boolean("unescape_strings"),this.e4x=this._get_boolean("e4x"),this.comma_first=this._get_boolean("comma_first"),this.operator_position=this._get_selection("operator_position",t),this.test_output_raw=this._get_boolean("test_output_raw"),this.jslint_happy&&(this.space_after_anon_function=!0)}return r.prototype=new s,gt.Options=r,gt}var F={},bt={},Kt;function yt(){if(Kt)return bt;Kt=1;var s=RegExp.prototype.hasOwnProperty("sticky");function t(r){this.__input=r||"",this.__input_length=this.__input.length,this.__position=0}return t.prototype.restart=function(){this.__position=0},t.prototype.back=function(){this.__position>0&&(this.__position-=1)},t.prototype.hasNext=function(){return this.__position<this.__input_length},t.prototype.next=function(){var r=null;return this.hasNext()&&(r=this.__input.charAt(this.__position),this.__position+=1),r},t.prototype.peek=function(r){var e=null;return r=r||0,r+=this.__position,r>=0&&r<this.__input_length&&(e=this.__input.charAt(r)),e},t.prototype.__match=function(r,e){r.lastIndex=e;var a=r.exec(this.__input);return a&&!(s&&r.sticky)&&a.index!==e&&(a=null),a},t.prototype.test=function(r,e){return e=e||0,e+=this.__position,e>=0&&e<this.__input_length?!!this.__match(r,e):!1},t.prototype.testChar=function(r,e){var a=this.peek(e);return r.lastIndex=0,a!==null&&r.test(a)},t.prototype.match=function(r){var e=this.__match(r,this.__position);return e?this.__position+=e[0].length:e=null,e},t.prototype.read=function(r,e,a){var o="",p;return r&&(p=this.match(r),p&&(o+=p[0])),e&&(p||!r)&&(o+=this.readUntil(e,a)),o},t.prototype.readUntil=function(r,e){var a="",o=this.__position;r.lastIndex=this.__position;var p=r.exec(this.__input);return p?(o=p.index,e&&(o+=p[0].length)):o=this.__input_length,a=this.__input.substring(this.__position,o),this.__position=o,a},t.prototype.readUntilAfter=function(r){return this.readUntil(r,!0)},t.prototype.get_regexp=function(r,e){var a=null,o="g";return e&&s&&(o="y"),typeof r=="string"&&r!==""?a=new RegExp(r,o):r&&(a=new RegExp(r.source,o)),a},t.prototype.get_literal_regexp=function(r){return RegExp(r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"))},t.prototype.peekUntilAfter=function(r){var e=this.__position,a=this.readUntilAfter(r);return this.__position=e,a},t.prototype.lookBack=function(r){var e=this.__position-1;return e>=r.length&&this.__input.substring(e-r.length,e).toLowerCase()===r},bt.InputScanner=t,bt}var tt={},vt={},Ht;function Ne(){if(Ht)return vt;Ht=1;function s(t){this.__tokens=[],this.__tokens_length=this.__tokens.length,this.__position=0,this.__parent_token=t}return s.prototype.restart=function(){this.__position=0},s.prototype.isEmpty=function(){return this.__tokens_length===0},s.prototype.hasNext=function(){return this.__position<this.__tokens_length},s.prototype.next=function(){var t=null;return this.hasNext()&&(t=this.__tokens[this.__position],this.__position+=1),t},s.prototype.peek=function(t){var r=null;return t=t||0,t+=this.__position,t>=0&&t<this.__tokens_length&&(r=this.__tokens[t]),r},s.prototype.add=function(t){this.__parent_token&&(t.parent=this.__parent_token),this.__tokens.push(t),this.__tokens_length+=1},vt.TokenStream=s,vt}var Pt={},wt={},Gt;function et(){if(Gt)return wt;Gt=1;function s(t,r){this._input=t,this._starting_pattern=null,this._match_pattern=null,this._until_pattern=null,this._until_after=!1,r&&(this._starting_pattern=this._input.get_regexp(r._starting_pattern,!0),this._match_pattern=this._input.get_regexp(r._match_pattern,!0),this._until_pattern=this._input.get_regexp(r._until_pattern),this._until_after=r._until_after)}return s.prototype.read=function(){var t=this._input.read(this._starting_pattern);return(!this._starting_pattern||t)&&(t+=this._input.read(this._match_pattern,this._until_pattern,this._until_after)),t},s.prototype.read_match=function(){return this._input.match(this._match_pattern)},s.prototype.until_after=function(t){var r=this._create();return r._until_after=!0,r._until_pattern=this._input.get_regexp(t),r._update(),r},s.prototype.until=function(t){var r=this._create();return r._until_after=!1,r._until_pattern=this._input.get_regexp(t),r._update(),r},s.prototype.starting_with=function(t){var r=this._create();return r._starting_pattern=this._input.get_regexp(t,!0),r._update(),r},s.prototype.matching=function(t){var r=this._create();return r._match_pattern=this._input.get_regexp(t,!0),r._update(),r},s.prototype._create=function(){return new s(this._input,this)},s.prototype._update=function(){},wt.Pattern=s,wt}var Vt;function Le(){if(Vt)return Pt;Vt=1;var s=et().Pattern;function t(r,e){s.call(this,r,e),e?this._line_regexp=this._input.get_regexp(e._line_regexp):this.__set_whitespace_patterns("",""),this.newline_count=0,this.whitespace_before_token=""}return t.prototype=new s,t.prototype.__set_whitespace_patterns=function(r,e){r+="\\t ",e+="\\n\\r",this._match_pattern=this._input.get_regexp("["+r+e+"]+",!0),this._newline_regexp=this._input.get_regexp("\\r\\n|["+e+"]")},t.prototype.read=function(){this.newline_count=0,this.whitespace_before_token="";var r=this._input.read(this._match_pattern);if(r===" ")this.whitespace_before_token=" ";else if(r){var e=this.__split(this._newline_regexp,r);this.newline_count=e.length-1,this.whitespace_before_token=e[this.newline_count]}return r},t.prototype.matching=function(r,e){var a=this._create();return a.__set_whitespace_patterns(r,e),a._update(),a},t.prototype._create=function(){return new t(this._input,this)},t.prototype.__split=function(r,e){r.lastIndex=0;for(var a=0,o=[],p=r.exec(e);p;)o.push(e.substring(a,p.index)),a=p.index+p[0].length,p=r.exec(e);return a<e.length?o.push(e.substring(a,e.length)):o.push(""),o},Pt.WhitespacePattern=t,Pt}var Qt;function it(){if(Qt)return tt;Qt=1;var s=yt().InputScanner,t=Ft().Token,r=Ne().TokenStream,e=Le().WhitespacePattern,a={START:"TK_START",RAW:"TK_RAW",EOF:"TK_EOF"},o=function(p,l){this._input=new s(p),this._options=l||{},this.__tokens=null,this._patterns={},this._patterns.whitespace=new e(this._input)};return o.prototype.tokenize=function(){this._input.restart(),this.__tokens=new r,this._reset();for(var p,l=new t(a.START,""),u=null,x=[],b=new r;l.type!==a.EOF;){for(p=this._get_next_token(l,u);this._is_comment(p);)b.add(p),p=this._get_next_token(l,u);b.isEmpty()||(p.comments_before=b,b=new r),p.parent=u,this._is_opening(p)?(x.push(u),u=p):u&&this._is_closing(p,u)&&(p.opened=u,u.closed=p,u=x.pop(),p.parent=u),p.previous=l,l.next=p,this.__tokens.add(p),l=p}return this.__tokens},o.prototype._is_first_token=function(){return this.__tokens.isEmpty()},o.prototype._reset=function(){},o.prototype._get_next_token=function(p,l){this._readWhitespace();var u=this._input.read(/.+/g);return u?this._create_token(a.RAW,u):this._create_token(a.EOF,"")},o.prototype._is_comment=function(p){return!1},o.prototype._is_opening=function(p){return!1},o.prototype._is_closing=function(p,l){return!1},o.prototype._create_token=function(p,l){var u=new t(p,l,this._patterns.whitespace.newline_count,this._patterns.whitespace.whitespace_before_token);return u},o.prototype._readWhitespace=function(){return this._patterns.whitespace.read()},tt.Tokenizer=o,tt.TOKEN=a,tt}var xt={},Zt;function Tt(){if(Zt)return xt;Zt=1;function s(t,r){t=typeof t=="string"?t:t.source,r=typeof r=="string"?r:r.source,this.__directives_block_pattern=new RegExp(t+/ beautify( \w+[:]\w+)+ /.source+r,"g"),this.__directive_pattern=/ (\w+)[:](\w+)/g,this.__directives_end_ignore_pattern=new RegExp(t+/\sbeautify\signore:end\s/.source+r,"g")}return s.prototype.get_directives=function(t){if(!t.match(this.__directives_block_pattern))return null;var r={};this.__directive_pattern.lastIndex=0;for(var e=this.__directive_pattern.exec(t);e;)r[e[1]]=e[2],e=this.__directive_pattern.exec(t);return r},s.prototype.readIgnored=function(t){return t.readUntilAfter(this.__directives_end_ignore_pattern)},xt.Directives=s,xt}var Et={},Jt;function te(){if(Jt)return Et;Jt=1;var s=et().Pattern,t={django:!1,erb:!1,handlebars:!1,php:!1,smarty:!1,angular:!1};function r(e,a){s.call(this,e,a),this.__template_pattern=null,this._disabled=Object.assign({},t),this._excluded=Object.assign({},t),a&&(this.__template_pattern=this._input.get_regexp(a.__template_pattern),this._excluded=Object.assign(this._excluded,a._excluded),this._disabled=Object.assign(this._disabled,a._disabled));var o=new s(e);this.__patterns={handlebars_comment:o.starting_with(/{{!--/).until_after(/--}}/),handlebars_unescaped:o.starting_with(/{{{/).until_after(/}}}/),handlebars:o.starting_with(/{{/).until_after(/}}/),php:o.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),erb:o.starting_with(/<%[^%]/).until_after(/[^%]%>/),django:o.starting_with(/{%/).until_after(/%}/),django_value:o.starting_with(/{{/).until_after(/}}/),django_comment:o.starting_with(/{#/).until_after(/#}/),smarty:o.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),smarty_comment:o.starting_with(/{\*/).until_after(/\*}/),smarty_literal:o.starting_with(/{literal}/).until_after(/{\/literal}/)}}return r.prototype=new s,r.prototype._create=function(){return new r(this._input,this)},r.prototype._update=function(){this.__set_templated_pattern()},r.prototype.disable=function(e){var a=this._create();return a._disabled[e]=!0,a._update(),a},r.prototype.read_options=function(e){var a=this._create();for(var o in t)a._disabled[o]=e.templating.indexOf(o)===-1;return a._update(),a},r.prototype.exclude=function(e){var a=this._create();return a._excluded[e]=!0,a._update(),a},r.prototype.read=function(){var e="";this._match_pattern?e=this._input.read(this._starting_pattern):e=this._input.read(this._starting_pattern,this.__template_pattern);for(var a=this._read_template();a;)this._match_pattern?a+=this._input.read(this._match_pattern):a+=this._input.readUntil(this.__template_pattern),e+=a,a=this._read_template();return this._until_after&&(e+=this._input.readUntilAfter(this._until_pattern)),e},r.prototype.__set_templated_pattern=function(){var e=[];this._disabled.php||e.push(this.__patterns.php._starting_pattern.source),this._disabled.handlebars||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.angular||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.erb||e.push(this.__patterns.erb._starting_pattern.source),this._disabled.django||(e.push(this.__patterns.django._starting_pattern.source),e.push(this.__patterns.django_value._starting_pattern.source),e.push(this.__patterns.django_comment._starting_pattern.source)),this._disabled.smarty||e.push(this.__patterns.smarty._starting_pattern.source),this._until_pattern&&e.push(this._until_pattern.source),this.__template_pattern=this._input.get_regexp("(?:"+e.join("|")+")")},r.prototype._read_template=function(){var e="",a=this._input.peek();if(a==="<"){var o=this._input.peek(1);!this._disabled.php&&!this._excluded.php&&o==="?"&&(e=e||this.__patterns.php.read()),!this._disabled.erb&&!this._excluded.erb&&o==="%"&&(e=e||this.__patterns.erb.read())}else a==="{"&&(!this._disabled.handlebars&&!this._excluded.handlebars&&(e=e||this.__patterns.handlebars_comment.read(),e=e||this.__patterns.handlebars_unescaped.read(),e=e||this.__patterns.handlebars.read()),this._disabled.django||(!this._excluded.django&&!this._excluded.handlebars&&(e=e||this.__patterns.django_value.read()),this._excluded.django||(e=e||this.__patterns.django_comment.read(),e=e||this.__patterns.django.read())),this._disabled.smarty||this._disabled.django&&this._disabled.handlebars&&(e=e||this.__patterns.smarty_comment.read(),e=e||this.__patterns.smarty_literal.read(),e=e||this.__patterns.smarty.read()));return e},Et.TemplatablePattern=r,Et}var ee;function st(){if(ee)return F;ee=1;var s=yt().InputScanner,t=it().Tokenizer,r=it().TOKEN,e=Tt().Directives,a=jt(),o=et().Pattern,p=te().TemplatablePattern;function l(d,P){return P.indexOf(d)!==-1}var u={START_EXPR:"TK_START_EXPR",END_EXPR:"TK_END_EXPR",START_BLOCK:"TK_START_BLOCK",END_BLOCK:"TK_END_BLOCK",WORD:"TK_WORD",RESERVED:"TK_RESERVED",SEMICOLON:"TK_SEMICOLON",STRING:"TK_STRING",EQUALS:"TK_EQUALS",OPERATOR:"TK_OPERATOR",COMMA:"TK_COMMA",BLOCK_COMMENT:"TK_BLOCK_COMMENT",COMMENT:"TK_COMMENT",DOT:"TK_DOT",UNKNOWN:"TK_UNKNOWN",START:r.START,RAW:r.RAW,EOF:r.EOF},x=new e(/\/\*/,/\*\//),b=/0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/,y=/[0-9]/,v=/[^\d\.]/,E=">>> === !== &&= ??= ||= << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "),O=">>>= ... >>= <<= === >>> !== **= &&= ??= ||= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";O=O.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),O="\\?\\.(?!\\d) "+O,O=O.replace(/ /g,"|");var I=new RegExp(O),_="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),n=_.concat(["do","in","of","else","get","set","new","catch","finally","typeof","yield","async","await","from","as","class","extends"]),c=new RegExp("^(?:"+n.join("|")+")$"),M,w=function(d,P){t.call(this,d,P),this._patterns.whitespace=this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,/\u2028\u2029/.source);var f=new o(this._input),T=new p(this._input).read_options(this._options);this.__patterns={template:T,identifier:T.starting_with(a.identifier).matching(a.identifierMatch),number:f.matching(b),punct:f.matching(I),comment:f.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),block_comment:f.starting_with(/\/\*/).until_after(/\*\//),html_comment_start:f.matching(/<!--/),html_comment_end:f.matching(/-->/),include:f.starting_with(/#include/).until_after(a.lineBreak),shebang:f.starting_with(/#!/).until_after(a.lineBreak),xml:f.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),single_quote:T.until(/['\\\n\r\u2028\u2029]/),double_quote:T.until(/["\\\n\r\u2028\u2029]/),template_text:T.until(/[`\\$]/),template_expression:T.until(/[`}\\]/)}};w.prototype=new t,w.prototype._is_comment=function(d){return d.type===u.COMMENT||d.type===u.BLOCK_COMMENT||d.type===u.UNKNOWN},w.prototype._is_opening=function(d){return d.type===u.START_BLOCK||d.type===u.START_EXPR},w.prototype._is_closing=function(d,P){return(d.type===u.END_BLOCK||d.type===u.END_EXPR)&&P&&(d.text==="]"&&P.text==="["||d.text===")"&&P.text==="("||d.text==="}"&&P.text==="{")},w.prototype._reset=function(){M=!1},w.prototype._get_next_token=function(d,P){var f=null;this._readWhitespace();var T=this._input.peek();return T===null?this._create_token(u.EOF,""):(f=f||this._read_non_javascript(T),f=f||this._read_string(T),f=f||this._read_pair(T,this._input.peek(1)),f=f||this._read_word(d),f=f||this._read_singles(T),f=f||this._read_comment(T),f=f||this._read_regexp(T,d),f=f||this._read_xml(T,d),f=f||this._read_punctuation(),f=f||this._create_token(u.UNKNOWN,this._input.next()),f)},w.prototype._read_word=function(d){var P;if(P=this.__patterns.identifier.read(),P!=="")return P=P.replace(a.allLineBreaks,`
`),!(d.type===u.DOT||d.type===u.RESERVED&&(d.text==="set"||d.text==="get"))&&c.test(P)?(P==="in"||P==="of")&&(d.type===u.WORD||d.type===u.STRING)?this._create_token(u.OPERATOR,P):this._create_token(u.RESERVED,P):this._create_token(u.WORD,P);if(P=this.__patterns.number.read(),P!=="")return this._create_token(u.WORD,P)},w.prototype._read_singles=function(d){var P=null;return d==="("||d==="["?P=this._create_token(u.START_EXPR,d):d===")"||d==="]"?P=this._create_token(u.END_EXPR,d):d==="{"?P=this._create_token(u.START_BLOCK,d):d==="}"?P=this._create_token(u.END_BLOCK,d):d===";"?P=this._create_token(u.SEMICOLON,d):d==="."&&v.test(this._input.peek(1))?P=this._create_token(u.DOT,d):d===","&&(P=this._create_token(u.COMMA,d)),P&&this._input.next(),P},w.prototype._read_pair=function(d,P){var f=null;return d==="#"&&P==="{"&&(f=this._create_token(u.START_BLOCK,d+P)),f&&(this._input.next(),this._input.next()),f},w.prototype._read_punctuation=function(){var d=this.__patterns.punct.read();if(d!=="")return d==="="?this._create_token(u.EQUALS,d):d==="?."?this._create_token(u.DOT,d):this._create_token(u.OPERATOR,d)},w.prototype._read_non_javascript=function(d){var P="";if(d==="#"){if(this._is_first_token()&&(P=this.__patterns.shebang.read(),P))return this._create_token(u.UNKNOWN,P.trim()+`
`);if(P=this.__patterns.include.read(),P)return this._create_token(u.UNKNOWN,P.trim()+`
`);d=this._input.next();var f="#";if(this._input.hasNext()&&this._input.testChar(y)){do d=this._input.next(),f+=d;while(this._input.hasNext()&&d!=="#"&&d!=="=");return d==="#"||(this._input.peek()==="["&&this._input.peek(1)==="]"?(f+="[]",this._input.next(),this._input.next()):this._input.peek()==="{"&&this._input.peek(1)==="}"&&(f+="{}",this._input.next(),this._input.next())),this._create_token(u.WORD,f)}this._input.back()}else if(d==="<"&&this._is_first_token()){if(P=this.__patterns.html_comment_start.read(),P){for(;this._input.hasNext()&&!this._input.testChar(a.newline);)P+=this._input.next();return M=!0,this._create_token(u.COMMENT,P)}}else if(M&&d==="-"&&(P=this.__patterns.html_comment_end.read(),P))return M=!1,this._create_token(u.COMMENT,P);return null},w.prototype._read_comment=function(d){var P=null;if(d==="/"){var f="";if(this._input.peek(1)==="*"){f=this.__patterns.block_comment.read();var T=x.get_directives(f);T&&T.ignore==="start"&&(f+=x.readIgnored(this._input)),f=f.replace(a.allLineBreaks,`
`),P=this._create_token(u.BLOCK_COMMENT,f),P.directives=T}else this._input.peek(1)==="/"&&(f=this.__patterns.comment.read(),P=this._create_token(u.COMMENT,f))}return P},w.prototype._read_string=function(d){if(d==="`"||d==="'"||d==='"'){var P=this._input.next();return this.has_char_escapes=!1,d==="`"?P+=this._read_string_recursive("`",!0,"${"):P+=this._read_string_recursive(d),this.has_char_escapes&&this._options.unescape_strings&&(P=S(P)),this._input.peek()===d&&(P+=this._input.next()),P=P.replace(a.allLineBreaks,`
`),this._create_token(u.STRING,P)}return null},w.prototype._allow_regexp_or_xml=function(d){return d.type===u.RESERVED&&l(d.text,["return","case","throw","else","do","typeof","yield"])||d.type===u.END_EXPR&&d.text===")"&&d.opened.previous.type===u.RESERVED&&l(d.opened.previous.text,["if","while","for"])||l(d.type,[u.COMMENT,u.START_EXPR,u.START_BLOCK,u.START,u.END_BLOCK,u.OPERATOR,u.EQUALS,u.EOF,u.SEMICOLON,u.COMMA])},w.prototype._read_regexp=function(d,P){if(d==="/"&&this._allow_regexp_or_xml(P)){for(var f=this._input.next(),T=!1,i=!1;this._input.hasNext()&&(T||i||this._input.peek()!==d)&&!this._input.testChar(a.newline);)f+=this._input.peek(),T?T=!1:(T=this._input.peek()==="\\",this._input.peek()==="["?i=!0:this._input.peek()==="]"&&(i=!1)),this._input.next();return this._input.peek()===d&&(f+=this._input.next(),f+=this._input.read(a.identifier)),this._create_token(u.STRING,f)}return null},w.prototype._read_xml=function(d,P){if(this._options.e4x&&d==="<"&&this._allow_regexp_or_xml(P)){var f="",T=this.__patterns.xml.read_match();if(T){for(var i=T[2].replace(/^{\s+/,"{").replace(/\s+}$/,"}"),g=i.indexOf("{")===0,m=0;T;){var A=!!T[1],k=T[2],R=!!T[T.length-1]||k.slice(0,8)==="![CDATA[";if(!R&&(k===i||g&&k.replace(/^{\s+/,"{").replace(/\s+}$/,"}"))&&(A?--m:++m),f+=T[0],m<=0)break;T=this.__patterns.xml.read_match()}return T||(f+=this._input.match(/[\s\S]*/g)[0]),f=f.replace(a.allLineBreaks,`
`),this._create_token(u.STRING,f)}}return null};function S(d){for(var P="",f=0,T=new s(d),i=null;T.hasNext();)if(i=T.match(/([\s]|[^\\]|\\\\)+/g),i&&(P+=i[0]),T.peek()==="\\"){if(T.next(),T.peek()==="x")i=T.match(/x([0-9A-Fa-f]{2})/g);else if(T.peek()==="u")i=T.match(/u([0-9A-Fa-f]{4})/g),i||(i=T.match(/u\{([0-9A-Fa-f]+)\}/g));else{P+="\\",T.hasNext()&&(P+=T.next());continue}if(!i||(f=parseInt(i[1],16),f>126&&f<=255&&i[0].indexOf("x")===0))return d;f>=0&&f<32||f>1114111?P+="\\"+i[0]:f===34||f===39||f===92?P+="\\"+String.fromCharCode(f):P+=String.fromCharCode(f)}return P}return w.prototype._read_string_recursive=function(d,P,f){var T,i;d==="'"?i=this.__patterns.single_quote:d==='"'?i=this.__patterns.double_quote:d==="`"?i=this.__patterns.template_text:d==="}"&&(i=this.__patterns.template_expression);for(var g=i.read(),m="";this._input.hasNext();){if(m=this._input.next(),m===d||!P&&a.newline.test(m)){this._input.back();break}else m==="\\"&&this._input.hasNext()?(T=this._input.peek(),T==="x"||T==="u"?this.has_char_escapes=!0:T==="\r"&&this._input.peek(1)===`
`&&this._input.next(),m+=this._input.next()):f&&(f==="${"&&m==="$"&&this._input.peek()==="{"&&(m+=this._input.next()),f===m&&(d==="`"?m+=this._read_string_recursive("}",P,"`"):m+=this._read_string_recursive("`",P,"${"),this._input.hasNext()&&(m+=this._input.next())));m+=i.read(),g+=m}return g},F.Tokenizer=w,F.TOKEN=u,F.positionable_operators=E.slice(),F.line_starters=_.slice(),F}var ie;function Xe(){if(ie)return ht;ie=1;var s=pt().Output,t=Ft().Token,r=jt(),e=$t().Options,a=st().Tokenizer,o=st().line_starters,p=st().positionable_operators,l=st().TOKEN;function u(i,g){return g.indexOf(i)!==-1}function x(i){return i.replace(/^\s+/g,"")}function b(i){for(var g={},m=0;m<i.length;m++)g[i[m].replace(/-/g,"_")]=i[m];return g}function y(i,g){return i&&i.type===l.RESERVED&&i.text===g}function v(i,g){return i&&i.type===l.RESERVED&&u(i.text,g)}var E=["case","return","do","if","throw","else","await","break","continue","async"],O=["before-newline","after-newline","preserve-newline"],I=b(O),_=[I.before_newline,I.preserve_newline],n={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"};function c(i,g){g.multiline_frame||g.mode===n.ForInitializer||g.mode===n.Conditional||i.remove_indent(g.start_line_index)}function M(i){i=i.replace(r.allLineBreaks,`
`);for(var g=[],m=i.indexOf(`
`);m!==-1;)g.push(i.substring(0,m)),i=i.substring(m+1),m=i.indexOf(`
`);return i.length&&g.push(i),g}function w(i){return i===n.ArrayLiteral}function S(i){return u(i,[n.Expression,n.ForInitializer,n.Conditional])}function d(i,g){for(var m=0;m<i.length;m++){var A=i[m].trim();if(A.charAt(0)!==g)return!1}return!0}function P(i,g){for(var m=0,A=i.length,k;m<A;m++)if(k=i[m],k&&k.indexOf(g)!==0)return!1;return!0}function f(i,g){g=g||{},this._source_text=i||"",this._output=null,this._tokens=null,this._last_last_text=null,this._flags=null,this._previous_flags=null,this._flag_store=null,this._options=new e(g)}f.prototype.create_flags=function(i,g){var m=0;i&&(m=i.indentation_level,!this._output.just_added_newline()&&i.line_indent_level>m&&(m=i.line_indent_level));var A={mode:g,parent:i,last_token:i?i.last_token:new t(l.START_BLOCK,""),last_word:i?i.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,inline_frame:!1,if_block:!1,else_block:!1,class_start_block:!1,do_block:!1,do_while:!1,import_block:!1,in_case_statement:!1,in_case:!1,case_body:!1,case_block:!1,indentation_level:m,alignment:0,line_indent_level:i?i.line_indent_level:m,start_line_index:this._output.get_line_number(),ternary_depth:0};return A},f.prototype._reset=function(i){var g=i.match(/^[\t ]*/)[0];this._last_last_text="",this._output=new s(this._options,g),this._output.raw=this._options.test_output_raw,this._flag_store=[],this.set_mode(n.BlockStatement);var m=new a(i,this._options);return this._tokens=m.tokenize(),i},f.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var i,g=this._reset(this._source_text),m=this._options.eol;this._options.eol==="auto"&&(m=`
`,g&&r.lineBreak.test(g||"")&&(m=g.match(r.lineBreak)[0]));for(var A=this._tokens.next();A;)this.handle_token(A),this._last_last_text=this._flags.last_token.text,this._flags.last_token=A,A=this._tokens.next();return i=this._output.get_code(m),i},f.prototype.handle_token=function(i,g){i.type===l.START_EXPR?this.handle_start_expr(i):i.type===l.END_EXPR?this.handle_end_expr(i):i.type===l.START_BLOCK?this.handle_start_block(i):i.type===l.END_BLOCK?this.handle_end_block(i):i.type===l.WORD?this.handle_word(i):i.type===l.RESERVED?this.handle_word(i):i.type===l.SEMICOLON?this.handle_semicolon(i):i.type===l.STRING?this.handle_string(i):i.type===l.EQUALS?this.handle_equals(i):i.type===l.OPERATOR?this.handle_operator(i):i.type===l.COMMA?this.handle_comma(i):i.type===l.BLOCK_COMMENT?this.handle_block_comment(i,g):i.type===l.COMMENT?this.handle_comment(i,g):i.type===l.DOT?this.handle_dot(i):i.type===l.EOF?this.handle_eof(i):i.type===l.UNKNOWN?this.handle_unknown(i,g):this.handle_unknown(i,g)},f.prototype.handle_whitespace_and_comments=function(i,g){var m=i.newlines,A=this._options.keep_array_indentation&&w(this._flags.mode);if(i.comments_before)for(var k=i.comments_before.next();k;)this.handle_whitespace_and_comments(k,g),this.handle_token(k,g),k=i.comments_before.next();if(A)for(var R=0;R<m;R+=1)this.print_newline(R>0,g);else if(this._options.max_preserve_newlines&&m>this._options.max_preserve_newlines&&(m=this._options.max_preserve_newlines),this._options.preserve_newlines&&m>1){this.print_newline(!1,g);for(var C=1;C<m;C+=1)this.print_newline(!0,g)}};var T=["async","break","continue","return","throw","yield"];return f.prototype.allow_wrap_or_preserved_newline=function(i,g){if(g=g===void 0?!1:g,!this._output.just_added_newline()){var m=this._options.preserve_newlines&&i.newlines||g,A=u(this._flags.last_token.text,p)||u(i.text,p);if(A){var k=u(this._flags.last_token.text,p)&&u(this._options.operator_position,_)||u(i.text,p);m=m&&k}if(m)this.print_newline(!1,!0);else if(this._options.wrap_line_length){if(v(this._flags.last_token,T))return;this._output.set_wrap_point()}}},f.prototype.print_newline=function(i,g){if(!g&&this._flags.last_token.text!==";"&&this._flags.last_token.text!==","&&this._flags.last_token.text!=="="&&(this._flags.last_token.type!==l.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++"))for(var m=this._tokens.peek();this._flags.mode===n.Statement&&!(this._flags.if_block&&y(m,"else"))&&!this._flags.do_block;)this.restore_mode();this._output.add_new_line(i)&&(this._flags.multiline_frame=!0)},f.prototype.print_token_line_indentation=function(i){this._output.just_added_newline()&&(this._options.keep_array_indentation&&i.newlines&&(i.text==="["||w(this._flags.mode))?(this._output.current_line.set_indent(-1),this._output.current_line.push(i.whitespace_before),this._output.space_before_token=!1):this._output.set_indent(this._flags.indentation_level,this._flags.alignment)&&(this._flags.line_indent_level=this._flags.indentation_level))},f.prototype.print_token=function(i){if(this._output.raw){this._output.add_raw_token(i);return}if(this._options.comma_first&&i.previous&&i.previous.type===l.COMMA&&this._output.just_added_newline()&&this._output.previous_line.last()===","){var g=this._output.previous_line.pop();this._output.previous_line.is_empty()&&(this._output.previous_line.push(g),this._output.trim(!0),this._output.current_line.pop(),this._output.trim()),this.print_token_line_indentation(i),this._output.add_token(","),this._output.space_before_token=!0}this.print_token_line_indentation(i),this._output.non_breaking_space=!0,this._output.add_token(i.text),this._output.previous_token_wrapped&&(this._flags.multiline_frame=!0)},f.prototype.indent=function(){this._flags.indentation_level+=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment)},f.prototype.deindent=function(){this._flags.indentation_level>0&&(!this._flags.parent||this._flags.indentation_level>this._flags.parent.indentation_level)&&(this._flags.indentation_level-=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment))},f.prototype.set_mode=function(i){this._flags?(this._flag_store.push(this._flags),this._previous_flags=this._flags):this._previous_flags=this.create_flags(null,i),this._flags=this.create_flags(this._previous_flags,i),this._output.set_indent(this._flags.indentation_level,this._flags.alignment)},f.prototype.restore_mode=function(){this._flag_store.length>0&&(this._previous_flags=this._flags,this._flags=this._flag_store.pop(),this._previous_flags.mode===n.Statement&&c(this._output,this._previous_flags),this._output.set_indent(this._flags.indentation_level,this._flags.alignment))},f.prototype.start_of_object_property=function(){return this._flags.parent.mode===n.ObjectLiteral&&this._flags.mode===n.Statement&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||v(this._flags.last_token,["get","set"]))},f.prototype.start_of_statement=function(i){var g=!1;return g=g||v(this._flags.last_token,["var","let","const"])&&i.type===l.WORD,g=g||y(this._flags.last_token,"do"),g=g||!(this._flags.parent.mode===n.ObjectLiteral&&this._flags.mode===n.Statement)&&v(this._flags.last_token,T)&&!i.newlines,g=g||y(this._flags.last_token,"else")&&!(y(i,"if")&&!i.comments_before),g=g||this._flags.last_token.type===l.END_EXPR&&(this._previous_flags.mode===n.ForInitializer||this._previous_flags.mode===n.Conditional),g=g||this._flags.last_token.type===l.WORD&&this._flags.mode===n.BlockStatement&&!this._flags.in_case&&!(i.text==="--"||i.text==="++")&&this._last_last_text!=="function"&&i.type!==l.WORD&&i.type!==l.RESERVED,g=g||this._flags.mode===n.ObjectLiteral&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||v(this._flags.last_token,["get","set"])),g?(this.set_mode(n.Statement),this.indent(),this.handle_whitespace_and_comments(i,!0),this.start_of_object_property()||this.allow_wrap_or_preserved_newline(i,v(i,["do","for","if","while"])),!0):!1},f.prototype.handle_start_expr=function(i){this.start_of_statement(i)||this.handle_whitespace_and_comments(i);var g=n.Expression;if(i.text==="["){if(this._flags.last_token.type===l.WORD||this._flags.last_token.text===")"){v(this._flags.last_token,o)&&(this._output.space_before_token=!0),this.print_token(i),this.set_mode(g),this.indent(),this._options.space_in_paren&&(this._output.space_before_token=!0);return}g=n.ArrayLiteral,w(this._flags.mode)&&(this._flags.last_token.text==="["||this._flags.last_token.text===","&&(this._last_last_text==="]"||this._last_last_text==="}"))&&(this._options.keep_array_indentation||this.print_newline()),u(this._flags.last_token.type,[l.START_EXPR,l.END_EXPR,l.WORD,l.OPERATOR,l.DOT])||(this._output.space_before_token=!0)}else{if(this._flags.last_token.type===l.RESERVED)this._flags.last_token.text==="for"?(this._output.space_before_token=this._options.space_before_conditional,g=n.ForInitializer):u(this._flags.last_token.text,["if","while","switch"])?(this._output.space_before_token=this._options.space_before_conditional,g=n.Conditional):u(this._flags.last_word,["await","async"])?this._output.space_before_token=!0:this._flags.last_token.text==="import"&&i.whitespace_before===""?this._output.space_before_token=!1:(u(this._flags.last_token.text,o)||this._flags.last_token.text==="catch")&&(this._output.space_before_token=!0);else if(this._flags.last_token.type===l.EQUALS||this._flags.last_token.type===l.OPERATOR)this.start_of_object_property()||this.allow_wrap_or_preserved_newline(i);else if(this._flags.last_token.type===l.WORD){this._output.space_before_token=!1;var m=this._tokens.peek(-3);if(this._options.space_after_named_function&&m){var A=this._tokens.peek(-4);v(m,["async","function"])||m.text==="*"&&v(A,["async","function"])?this._output.space_before_token=!0:this._flags.mode===n.ObjectLiteral?(m.text==="{"||m.text===","||m.text==="*"&&(A.text==="{"||A.text===","))&&(this._output.space_before_token=!0):this._flags.parent&&this._flags.parent.class_start_block&&(this._output.space_before_token=!0)}}else this.allow_wrap_or_preserved_newline(i);(this._flags.last_token.type===l.RESERVED&&(this._flags.last_word==="function"||this._flags.last_word==="typeof")||this._flags.last_token.text==="*"&&(u(this._last_last_text,["function","yield"])||this._flags.mode===n.ObjectLiteral&&u(this._last_last_text,["{",","])))&&(this._output.space_before_token=this._options.space_after_anon_function)}this._flags.last_token.text===";"||this._flags.last_token.type===l.START_BLOCK?this.print_newline():(this._flags.last_token.type===l.END_EXPR||this._flags.last_token.type===l.START_EXPR||this._flags.last_token.type===l.END_BLOCK||this._flags.last_token.text==="."||this._flags.last_token.type===l.COMMA)&&this.allow_wrap_or_preserved_newline(i,i.newlines),this.print_token(i),this.set_mode(g),this._options.space_in_paren&&(this._output.space_before_token=!0),this.indent()},f.prototype.handle_end_expr=function(i){for(;this._flags.mode===n.Statement;)this.restore_mode();this.handle_whitespace_and_comments(i),this._flags.multiline_frame&&this.allow_wrap_or_preserved_newline(i,i.text==="]"&&w(this._flags.mode)&&!this._options.keep_array_indentation),this._options.space_in_paren&&(this._flags.last_token.type===l.START_EXPR&&!this._options.space_in_empty_paren?(this._output.trim(),this._output.space_before_token=!1):this._output.space_before_token=!0),this.deindent(),this.print_token(i),this.restore_mode(),c(this._output,this._previous_flags),this._flags.do_while&&this._previous_flags.mode===n.Conditional&&(this._previous_flags.mode=n.Expression,this._flags.do_block=!1,this._flags.do_while=!1)},f.prototype.handle_start_block=function(i){this.handle_whitespace_and_comments(i);var g=this._tokens.peek(),m=this._tokens.peek(1);this._flags.last_word==="switch"&&this._flags.last_token.type===l.END_EXPR?(this.set_mode(n.BlockStatement),this._flags.in_case_statement=!0):this._flags.case_body?this.set_mode(n.BlockStatement):m&&(u(m.text,[":",","])&&u(g.type,[l.STRING,l.WORD,l.RESERVED])||u(g.text,["get","set","..."])&&u(m.type,[l.WORD,l.RESERVED]))?u(this._last_last_text,["class","interface"])&&!u(m.text,[":",","])?this.set_mode(n.BlockStatement):this.set_mode(n.ObjectLiteral):this._flags.last_token.type===l.OPERATOR&&this._flags.last_token.text==="=>"?this.set_mode(n.BlockStatement):u(this._flags.last_token.type,[l.EQUALS,l.START_EXPR,l.COMMA,l.OPERATOR])||v(this._flags.last_token,["return","throw","import","default"])?this.set_mode(n.ObjectLiteral):this.set_mode(n.BlockStatement),this._flags.last_token&&v(this._flags.last_token.previous,["class","extends"])&&(this._flags.class_start_block=!0);var A=!g.comments_before&&g.text==="}",k=A&&this._flags.last_word==="function"&&this._flags.last_token.type===l.END_EXPR;if(this._options.brace_preserve_inline){var R=0,C=null;this._flags.inline_frame=!0;do if(R+=1,C=this._tokens.peek(R-1),C.newlines){this._flags.inline_frame=!1;break}while(C.type!==l.EOF&&!(C.type===l.END_BLOCK&&C.opened===i))}(this._options.brace_style==="expand"||this._options.brace_style==="none"&&i.newlines)&&!this._flags.inline_frame?this._flags.last_token.type!==l.OPERATOR&&(k||this._flags.last_token.type===l.EQUALS||v(this._flags.last_token,E)&&this._flags.last_token.text!=="else")?this._output.space_before_token=!0:this.print_newline(!1,!0):(w(this._previous_flags.mode)&&(this._flags.last_token.type===l.START_EXPR||this._flags.last_token.type===l.COMMA)&&((this._flags.last_token.type===l.COMMA||this._options.space_in_paren)&&(this._output.space_before_token=!0),(this._flags.last_token.type===l.COMMA||this._flags.last_token.type===l.START_EXPR&&this._flags.inline_frame)&&(this.allow_wrap_or_preserved_newline(i),this._previous_flags.multiline_frame=this._previous_flags.multiline_frame||this._flags.multiline_frame,this._flags.multiline_frame=!1)),this._flags.last_token.type!==l.OPERATOR&&this._flags.last_token.type!==l.START_EXPR&&(u(this._flags.last_token.type,[l.START_BLOCK,l.SEMICOLON])&&!this._flags.inline_frame?this.print_newline():this._output.space_before_token=!0)),this.print_token(i),this.indent(),!A&&!(this._options.brace_preserve_inline&&this._flags.inline_frame)&&this.print_newline()},f.prototype.handle_end_block=function(i){for(this.handle_whitespace_and_comments(i);this._flags.mode===n.Statement;)this.restore_mode();var g=this._flags.last_token.type===l.START_BLOCK;this._flags.inline_frame&&!g?this._output.space_before_token=!0:this._options.brace_style==="expand"?g||this.print_newline():g||(w(this._flags.mode)&&this._options.keep_array_indentation?(this._options.keep_array_indentation=!1,this.print_newline(),this._options.keep_array_indentation=!0):this.print_newline()),this.restore_mode(),this.print_token(i)},f.prototype.handle_word=function(i){if(i.type===l.RESERVED){if(u(i.text,["set","get"])&&this._flags.mode!==n.ObjectLiteral)i.type=l.WORD;else if(i.text==="import"&&u(this._tokens.peek().text,["(","."]))i.type=l.WORD;else if(u(i.text,["as","from"])&&!this._flags.import_block)i.type=l.WORD;else if(this._flags.mode===n.ObjectLiteral){var g=this._tokens.peek();g.text===":"&&(i.type=l.WORD)}}if(this.start_of_statement(i)?v(this._flags.last_token,["var","let","const"])&&i.type===l.WORD&&(this._flags.declaration_statement=!0):i.newlines&&!S(this._flags.mode)&&(this._flags.last_token.type!==l.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++")&&this._flags.last_token.type!==l.EQUALS&&(this._options.preserve_newlines||!v(this._flags.last_token,["var","let","const","set","get"]))?(this.handle_whitespace_and_comments(i),this.print_newline()):this.handle_whitespace_and_comments(i),this._flags.do_block&&!this._flags.do_while)if(y(i,"while")){this._output.space_before_token=!0,this.print_token(i),this._output.space_before_token=!0,this._flags.do_while=!0;return}else this.print_newline(),this._flags.do_block=!1;if(this._flags.if_block)if(!this._flags.else_block&&y(i,"else"))this._flags.else_block=!0;else{for(;this._flags.mode===n.Statement;)this.restore_mode();this._flags.if_block=!1,this._flags.else_block=!1}if(this._flags.in_case_statement&&v(i,["case","default"])){this.print_newline(),!this._flags.case_block&&(this._flags.case_body||this._options.jslint_happy)&&this.deindent(),this._flags.case_body=!1,this.print_token(i),this._flags.in_case=!0;return}if((this._flags.last_token.type===l.COMMA||this._flags.last_token.type===l.START_EXPR||this._flags.last_token.type===l.EQUALS||this._flags.last_token.type===l.OPERATOR)&&!this.start_of_object_property()&&!(u(this._flags.last_token.text,["+","-"])&&this._last_last_text===":"&&this._flags.parent.mode===n.ObjectLiteral)&&this.allow_wrap_or_preserved_newline(i),y(i,"function")){(u(this._flags.last_token.text,["}",";"])||this._output.just_added_newline()&&!(u(this._flags.last_token.text,["(","[","{",":","=",","])||this._flags.last_token.type===l.OPERATOR))&&!this._output.just_added_blankline()&&!i.comments_before&&(this.print_newline(),this.print_newline(!0)),this._flags.last_token.type===l.RESERVED||this._flags.last_token.type===l.WORD?v(this._flags.last_token,["get","set","new","export"])||v(this._flags.last_token,T)?this._output.space_before_token=!0:y(this._flags.last_token,"default")&&this._last_last_text==="export"?this._output.space_before_token=!0:this._flags.last_token.text==="declare"?this._output.space_before_token=!0:this.print_newline():this._flags.last_token.type===l.OPERATOR||this._flags.last_token.text==="="?this._output.space_before_token=!0:!this._flags.multiline_frame&&(S(this._flags.mode)||w(this._flags.mode))||this.print_newline(),this.print_token(i),this._flags.last_word=i.text;return}var m="NONE";if(this._flags.last_token.type===l.END_BLOCK?this._previous_flags.inline_frame?m="SPACE":v(i,["else","catch","finally","from"])?this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&i.newlines?m="NEWLINE":(m="SPACE",this._output.space_before_token=!0):m="NEWLINE":this._flags.last_token.type===l.SEMICOLON&&this._flags.mode===n.BlockStatement?m="NEWLINE":this._flags.last_token.type===l.SEMICOLON&&S(this._flags.mode)?m="SPACE":this._flags.last_token.type===l.STRING?m="NEWLINE":this._flags.last_token.type===l.RESERVED||this._flags.last_token.type===l.WORD||this._flags.last_token.text==="*"&&(u(this._last_last_text,["function","yield"])||this._flags.mode===n.ObjectLiteral&&u(this._last_last_text,["{",","]))?m="SPACE":this._flags.last_token.type===l.START_BLOCK?this._flags.inline_frame?m="SPACE":m="NEWLINE":this._flags.last_token.type===l.END_EXPR&&(this._output.space_before_token=!0,m="NEWLINE"),v(i,o)&&this._flags.last_token.text!==")"&&(this._flags.inline_frame||this._flags.last_token.text==="else"||this._flags.last_token.text==="export"?m="SPACE":m="NEWLINE"),v(i,["else","catch","finally"]))if((!(this._flags.last_token.type===l.END_BLOCK&&this._previous_flags.mode===n.BlockStatement)||this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&i.newlines)&&!this._flags.inline_frame)this.print_newline();else{this._output.trim(!0);var A=this._output.current_line;A.last()!=="}"&&this.print_newline(),this._output.space_before_token=!0}else m==="NEWLINE"?v(this._flags.last_token,E)?this._output.space_before_token=!0:this._flags.last_token.text==="declare"&&v(i,["var","let","const"])?this._output.space_before_token=!0:this._flags.last_token.type!==l.END_EXPR?(this._flags.last_token.type!==l.START_EXPR||!v(i,["var","let","const"]))&&this._flags.last_token.text!==":"&&(y(i,"if")&&y(i.previous,"else")?this._output.space_before_token=!0:this.print_newline()):v(i,o)&&this._flags.last_token.text!==")"&&this.print_newline():this._flags.multiline_frame&&w(this._flags.mode)&&this._flags.last_token.text===","&&this._last_last_text==="}"?this.print_newline():m==="SPACE"&&(this._output.space_before_token=!0);i.previous&&(i.previous.type===l.WORD||i.previous.type===l.RESERVED)&&(this._output.space_before_token=!0),this.print_token(i),this._flags.last_word=i.text,i.type===l.RESERVED&&(i.text==="do"?this._flags.do_block=!0:i.text==="if"?this._flags.if_block=!0:i.text==="import"?this._flags.import_block=!0:this._flags.import_block&&y(i,"from")&&(this._flags.import_block=!1))},f.prototype.handle_semicolon=function(i){this.start_of_statement(i)?this._output.space_before_token=!1:this.handle_whitespace_and_comments(i);for(var g=this._tokens.peek();this._flags.mode===n.Statement&&!(this._flags.if_block&&y(g,"else"))&&!this._flags.do_block;)this.restore_mode();this._flags.import_block&&(this._flags.import_block=!1),this.print_token(i)},f.prototype.handle_string=function(i){i.text.startsWith("`")&&i.newlines===0&&i.whitespace_before===""&&(i.previous.text===")"||this._flags.last_token.type===l.WORD)||(this.start_of_statement(i)?this._output.space_before_token=!0:(this.handle_whitespace_and_comments(i),this._flags.last_token.type===l.RESERVED||this._flags.last_token.type===l.WORD||this._flags.inline_frame?this._output.space_before_token=!0:this._flags.last_token.type===l.COMMA||this._flags.last_token.type===l.START_EXPR||this._flags.last_token.type===l.EQUALS||this._flags.last_token.type===l.OPERATOR?this.start_of_object_property()||this.allow_wrap_or_preserved_newline(i):i.text.startsWith("`")&&this._flags.last_token.type===l.END_EXPR&&(i.previous.text==="]"||i.previous.text===")")&&i.newlines===0?this._output.space_before_token=!0:this.print_newline())),this.print_token(i)},f.prototype.handle_equals=function(i){this.start_of_statement(i)||this.handle_whitespace_and_comments(i),this._flags.declaration_statement&&(this._flags.declaration_assignment=!0),this._output.space_before_token=!0,this.print_token(i),this._output.space_before_token=!0},f.prototype.handle_comma=function(i){this.handle_whitespace_and_comments(i,!0),this.print_token(i),this._output.space_before_token=!0,this._flags.declaration_statement?(S(this._flags.parent.mode)&&(this._flags.declaration_assignment=!1),this._flags.declaration_assignment?(this._flags.declaration_assignment=!1,this.print_newline(!1,!0)):this._options.comma_first&&this.allow_wrap_or_preserved_newline(i)):this._flags.mode===n.ObjectLiteral||this._flags.mode===n.Statement&&this._flags.parent.mode===n.ObjectLiteral?(this._flags.mode===n.Statement&&this.restore_mode(),this._flags.inline_frame||this.print_newline()):this._options.comma_first&&this.allow_wrap_or_preserved_newline(i)},f.prototype.handle_operator=function(i){var g=i.text==="*"&&(v(this._flags.last_token,["function","yield"])||u(this._flags.last_token.type,[l.START_BLOCK,l.COMMA,l.END_BLOCK,l.SEMICOLON])),m=u(i.text,["-","+"])&&(u(this._flags.last_token.type,[l.START_BLOCK,l.START_EXPR,l.EQUALS,l.OPERATOR])||u(this._flags.last_token.text,o)||this._flags.last_token.text===",");if(!this.start_of_statement(i)){var A=!g;this.handle_whitespace_and_comments(i,A)}if(i.text==="*"&&this._flags.last_token.type===l.DOT){this.print_token(i);return}if(i.text==="::"){this.print_token(i);return}if(u(i.text,["-","+"])&&this.start_of_object_property()){this.print_token(i);return}if(this._flags.last_token.type===l.OPERATOR&&u(this._options.operator_position,_)&&this.allow_wrap_or_preserved_newline(i),i.text===":"&&this._flags.in_case){this.print_token(i),this._flags.in_case=!1,this._flags.case_body=!0,this._tokens.peek().type!==l.START_BLOCK?(this.indent(),this.print_newline(),this._flags.case_block=!1):(this._flags.case_block=!0,this._output.space_before_token=!0);return}var k=!0,R=!0,C=!1;if(i.text===":"?this._flags.ternary_depth===0?k=!1:(this._flags.ternary_depth-=1,C=!0):i.text==="?"&&(this._flags.ternary_depth+=1),!m&&!g&&this._options.preserve_newlines&&u(i.text,p)){var B=i.text===":",j=B&&C,G=B&&!C;switch(this._options.operator_position){case I.before_newline:this._output.space_before_token=!G,this.print_token(i),(!B||j)&&this.allow_wrap_or_preserved_newline(i),this._output.space_before_token=!0;return;case I.after_newline:this._output.space_before_token=!0,!B||j?this._tokens.peek().newlines?this.print_newline(!1,!0):this.allow_wrap_or_preserved_newline(i):this._output.space_before_token=!1,this.print_token(i),this._output.space_before_token=!0;return;case I.preserve_newline:G||this.allow_wrap_or_preserved_newline(i),k=!(this._output.just_added_newline()||G),this._output.space_before_token=k,this.print_token(i),this._output.space_before_token=!0;return}}if(g){this.allow_wrap_or_preserved_newline(i),k=!1;var z=this._tokens.peek();R=z&&u(z.type,[l.WORD,l.RESERVED])}else if(i.text==="...")this.allow_wrap_or_preserved_newline(i),k=this._flags.last_token.type===l.START_BLOCK,R=!1;else if(u(i.text,["--","++","!","~"])||m){if((this._flags.last_token.type===l.COMMA||this._flags.last_token.type===l.START_EXPR)&&this.allow_wrap_or_preserved_newline(i),k=!1,R=!1,i.newlines&&(i.text==="--"||i.text==="++"||i.text==="~")){var U=v(this._flags.last_token,E)&&i.newlines;U&&(this._previous_flags.if_block||this._previous_flags.else_block)&&this.restore_mode(),this.print_newline(U,!0)}this._flags.last_token.text===";"&&S(this._flags.mode)&&(k=!0),this._flags.last_token.type===l.RESERVED?k=!0:this._flags.last_token.type===l.END_EXPR?k=!(this._flags.last_token.text==="]"&&(i.text==="--"||i.text==="++")):this._flags.last_token.type===l.OPERATOR&&(k=u(i.text,["--","-","++","+"])&&u(this._flags.last_token.text,["--","-","++","+"]),u(i.text,["+","-"])&&u(this._flags.last_token.text,["--","++"])&&(R=!0)),(this._flags.mode===n.BlockStatement&&!this._flags.inline_frame||this._flags.mode===n.Statement)&&(this._flags.last_token.text==="{"||this._flags.last_token.text===";")&&this.print_newline()}this._output.space_before_token=this._output.space_before_token||k,this.print_token(i),this._output.space_before_token=R},f.prototype.handle_block_comment=function(i,g){if(this._output.raw){this._output.add_raw_token(i),i.directives&&i.directives.preserve==="end"&&(this._output.raw=this._options.test_output_raw);return}if(i.directives){this.print_newline(!1,g),this.print_token(i),i.directives.preserve==="start"&&(this._output.raw=!0),this.print_newline(!1,!0);return}if(!r.newline.test(i.text)&&!i.newlines){this._output.space_before_token=!0,this.print_token(i),this._output.space_before_token=!0;return}else this.print_block_commment(i,g)},f.prototype.print_block_commment=function(i,g){var m=M(i.text),A,k=!1,R=!1,C=i.whitespace_before,B=C.length;if(this.print_newline(!1,g),this.print_token_line_indentation(i),this._output.add_token(m[0]),this.print_newline(!1,g),m.length>1){for(m=m.slice(1),k=d(m,"*"),R=P(m,C),k&&(this._flags.alignment=1),A=0;A<m.length;A++)k?(this.print_token_line_indentation(i),this._output.add_token(x(m[A]))):R&&m[A]?(this.print_token_line_indentation(i),this._output.add_token(m[A].substring(B))):(this._output.current_line.set_indent(-1),this._output.add_token(m[A])),this.print_newline(!1,g);this._flags.alignment=0}},f.prototype.handle_comment=function(i,g){i.newlines?this.print_newline(!1,g):this._output.trim(!0),this._output.space_before_token=!0,this.print_token(i),this.print_newline(!1,g)},f.prototype.handle_dot=function(i){this.start_of_statement(i)||this.handle_whitespace_and_comments(i,!0),this._flags.last_token.text.match("^[0-9]+$")&&(this._output.space_before_token=!0),v(this._flags.last_token,E)?this._output.space_before_token=!1:this.allow_wrap_or_preserved_newline(i,this._flags.last_token.text===")"&&this._options.break_chained_methods),this._options.unindent_chained_methods&&this._output.just_added_newline()&&this.deindent(),this.print_token(i)},f.prototype.handle_unknown=function(i,g){this.print_token(i),i.text[i.text.length-1]===`
`&&this.print_newline(!1,g)},f.prototype.handle_eof=function(i){for(;this._flags.mode===n.Statement;)this.restore_mode();this.handle_whitespace_and_comments(i)},ht.Beautifier=f,ht}var se;function Be(){if(se)return J.exports;se=1;var s=Xe().Beautifier,t=$t().Options;function r(e,a){var o=new s(e,a);return o.beautify()}return J.exports=r,J.exports.defaultOptions=function(){return new t},J.exports}var at={exports:{}},Ot={},Mt={},ae;function ne(){if(ae)return Mt;ae=1;var s=mt().Options;function t(r){s.call(this,r,"css"),this.selector_separator_newline=this._get_boolean("selector_separator_newline",!0),this.newline_between_rules=this._get_boolean("newline_between_rules",!0);var e=this._get_boolean("space_around_selector_separator");this.space_around_combinator=this._get_boolean("space_around_combinator")||e;var a=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_style="collapse";for(var o=0;o<a.length;o++)a[o]!=="expand"?this.brace_style="collapse":this.brace_style=a[o]}return t.prototype=new s,Mt.Options=t,Mt}var re;function Ye(){if(re)return Ot;re=1;var s=ne().Options,t=pt().Output,r=yt().InputScanner,e=Tt().Directives,a=new e(/\/\*/,/\*\//),o=/\r\n|[\r\n]/,p=/\r\n|[\r\n]/g,l=/\s/,u=/(?:\s|\n)+/g,x=/\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,b=/\/\/(?:[^\n\r\u2028\u2029]*)/g;function y(v,E){this._source_text=v||"",this._options=new s(E),this._ch=null,this._input=null,this.NESTED_AT_RULE={page:!0,"font-face":!0,keyframes:!0,media:!0,supports:!0,document:!0},this.CONDITIONAL_GROUP_RULE={media:!0,supports:!0,document:!0},this.NON_SEMICOLON_NEWLINE_PROPERTY=["grid-template-areas","grid-template"]}return y.prototype.eatString=function(v){var E="";for(this._ch=this._input.next();this._ch;){if(E+=this._ch,this._ch==="\\")E+=this._input.next();else if(v.indexOf(this._ch)!==-1||this._ch===`
`)break;this._ch=this._input.next()}return E},y.prototype.eatWhitespace=function(v){for(var E=l.test(this._input.peek()),O=0;l.test(this._input.peek());)this._ch=this._input.next(),v&&this._ch===`
`&&(O===0||O<this._options.max_preserve_newlines)&&(O++,this._output.add_new_line(!0));return E},y.prototype.foundNestedPseudoClass=function(){for(var v=0,E=1,O=this._input.peek(E);O;){if(O==="{")return!0;if(O==="(")v+=1;else if(O===")"){if(v===0)return!1;v-=1}else if(O===";"||O==="}")return!1;E++,O=this._input.peek(E)}return!1},y.prototype.print_string=function(v){this._output.set_indent(this._indentLevel),this._output.non_breaking_space=!0,this._output.add_token(v)},y.prototype.preserveSingleSpace=function(v){v&&(this._output.space_before_token=!0)},y.prototype.indent=function(){this._indentLevel++},y.prototype.outdent=function(){this._indentLevel>0&&this._indentLevel--},y.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var v=this._source_text,E=this._options.eol;E==="auto"&&(E=`
`,v&&o.test(v||"")&&(E=v.match(o)[0])),v=v.replace(p,`
`);var O=v.match(/^[\t ]*/)[0];this._output=new t(this._options,O),this._input=new r(v),this._indentLevel=0,this._nestedLevel=0,this._ch=null;for(var I=0,_=!1,n=!1,c=!1,M=!1,w=!1,S=this._ch,d=!1,P,f,T;P=this._input.read(u),f=P!=="",T=S,this._ch=this._input.next(),this._ch==="\\"&&this._input.hasNext()&&(this._ch+=this._input.next()),S=this._ch,this._ch;)if(this._ch==="/"&&this._input.peek()==="*"){this._output.add_new_line(),this._input.back();var i=this._input.read(x),g=a.get_directives(i);g&&g.ignore==="start"&&(i+=a.readIgnored(this._input)),this.print_string(i),this.eatWhitespace(!0),this._output.add_new_line()}else if(this._ch==="/"&&this._input.peek()==="/")this._output.space_before_token=!0,this._input.back(),this.print_string(this._input.read(b)),this.eatWhitespace(!0);else if(this._ch==="$"){this.preserveSingleSpace(f),this.print_string(this._ch);var m=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);m.match(/[ :]$/)&&(m=this.eatString(": ").replace(/\s+$/,""),this.print_string(m),this._output.space_before_token=!0),I===0&&m.indexOf(":")!==-1&&(n=!0,this.indent())}else if(this._ch==="@")if(this.preserveSingleSpace(f),this._input.peek()==="{")this.print_string(this._ch+this.eatString("}"));else{this.print_string(this._ch);var A=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);A.match(/[ :]$/)&&(A=this.eatString(": ").replace(/\s+$/,""),this.print_string(A),this._output.space_before_token=!0),I===0&&A.indexOf(":")!==-1?(n=!0,this.indent()):A in this.NESTED_AT_RULE?(this._nestedLevel+=1,A in this.CONDITIONAL_GROUP_RULE&&(c=!0)):I===0&&!n&&(M=!0)}else if(this._ch==="#"&&this._input.peek()==="{")this.preserveSingleSpace(f),this.print_string(this._ch+this.eatString("}"));else if(this._ch==="{")n&&(n=!1,this.outdent()),M=!1,c?(c=!1,_=this._indentLevel>=this._nestedLevel):_=this._indentLevel>=this._nestedLevel-1,this._options.newline_between_rules&&_&&this._output.previous_line&&this._output.previous_line.item(-1)!=="{"&&this._output.ensure_empty_line_above("/",","),this._output.space_before_token=!0,this._options.brace_style==="expand"?(this._output.add_new_line(),this.print_string(this._ch),this.indent(),this._output.set_indent(this._indentLevel)):(T==="("?this._output.space_before_token=!1:T!==","&&this.indent(),this.print_string(this._ch)),this.eatWhitespace(!0),this._output.add_new_line();else if(this._ch==="}")this.outdent(),this._output.add_new_line(),T==="{"&&this._output.trim(!0),n&&(this.outdent(),n=!1),this.print_string(this._ch),_=!1,this._nestedLevel&&this._nestedLevel--,this.eatWhitespace(!0),this._output.add_new_line(),this._options.newline_between_rules&&!this._output.just_added_blankline()&&this._input.peek()!=="}"&&this._output.add_new_line(!0),this._input.peek()===")"&&(this._output.trim(!0),this._options.brace_style==="expand"&&this._output.add_new_line(!0));else if(this._ch===":"){for(var k=0;k<this.NON_SEMICOLON_NEWLINE_PROPERTY.length;k++)if(this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[k])){d=!0;break}(_||c)&&!(this._input.lookBack("&")||this.foundNestedPseudoClass())&&!this._input.lookBack("(")&&!M&&I===0?(this.print_string(":"),n||(n=!0,this._output.space_before_token=!0,this.eatWhitespace(!0),this.indent())):(this._input.lookBack(" ")&&(this._output.space_before_token=!0),this._input.peek()===":"?(this._ch=this._input.next(),this.print_string("::")):this.print_string(":"))}else if(this._ch==='"'||this._ch==="'"){var R=T==='"'||T==="'";this.preserveSingleSpace(R||f),this.print_string(this._ch+this.eatString(this._ch)),this.eatWhitespace(!0)}else if(this._ch===";")d=!1,I===0?(n&&(this.outdent(),n=!1),M=!1,this.print_string(this._ch),this.eatWhitespace(!0),this._input.peek()!=="/"&&this._output.add_new_line()):(this.print_string(this._ch),this.eatWhitespace(!0),this._output.space_before_token=!0);else if(this._ch==="(")if(this._input.lookBack("url"))this.print_string(this._ch),this.eatWhitespace(),I++,this.indent(),this._ch=this._input.next(),this._ch===")"||this._ch==='"'||this._ch==="'"?this._input.back():this._ch&&(this.print_string(this._ch+this.eatString(")")),I&&(I--,this.outdent()));else{var C=!1;this._input.lookBack("with")&&(C=!0),this.preserveSingleSpace(f||C),this.print_string(this._ch),n&&T==="$"&&this._options.selector_separator_newline?(this._output.add_new_line(),w=!0):(this.eatWhitespace(),I++,this.indent())}else if(this._ch===")")I&&(I--,this.outdent()),w&&this._input.peek()===";"&&this._options.selector_separator_newline&&(w=!1,this.outdent(),this._output.add_new_line()),this.print_string(this._ch);else if(this._ch===",")this.print_string(this._ch),this.eatWhitespace(!0),this._options.selector_separator_newline&&(!n||w)&&I===0&&!M?this._output.add_new_line():this._output.space_before_token=!0;else if((this._ch===">"||this._ch==="+"||this._ch==="~")&&!n&&I===0)this._options.space_around_combinator?(this._output.space_before_token=!0,this.print_string(this._ch),this._output.space_before_token=!0):(this.print_string(this._ch),this.eatWhitespace(),this._ch&&l.test(this._ch)&&(this._ch=""));else if(this._ch==="]")this.print_string(this._ch);else if(this._ch==="[")this.preserveSingleSpace(f),this.print_string(this._ch);else if(this._ch==="=")this.eatWhitespace(),this.print_string("="),l.test(this._ch)&&(this._ch="");else if(this._ch==="!"&&!this._input.lookBack("\\"))this._output.space_before_token=!0,this.print_string(this._ch);else{var B=T==='"'||T==="'";this.preserveSingleSpace(B||f),this.print_string(this._ch),!this._output.just_added_newline()&&this._input.peek()===`
`&&d&&this._output.add_new_line()}var j=this._output.get_code(E);return j},Ot.Beautifier=y,Ot}var oe;function Ue(){if(oe)return at.exports;oe=1;var s=Ye().Beautifier,t=ne().Options;function r(e,a){var o=new s(e,a);return o.beautify()}return at.exports=r,at.exports.defaultOptions=function(){return new t},at.exports}var nt={exports:{}},St={},At={},le;function _e(){if(le)return At;le=1;var s=mt().Options;function t(r){s.call(this,r,"html"),this.templating.length===1&&this.templating[0]==="auto"&&(this.templating=["django","erb","handlebars","php"]),this.indent_inner_html=this._get_boolean("indent_inner_html"),this.indent_body_inner_html=this._get_boolean("indent_body_inner_html",!0),this.indent_head_inner_html=this._get_boolean("indent_head_inner_html",!0),this.indent_handlebars=this._get_boolean("indent_handlebars",!0),this.wrap_attributes=this._get_selection("wrap_attributes",["auto","force","force-aligned","force-expand-multiline","aligned-multiple","preserve","preserve-aligned"]),this.wrap_attributes_min_attrs=this._get_number("wrap_attributes_min_attrs",2),this.wrap_attributes_indent_size=this._get_number("wrap_attributes_indent_size",this.indent_size),this.extra_liners=this._get_array("extra_liners",["head","body","/html"]),this.inline=this._get_array("inline",["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","big","strike","tt"]),this.inline_custom_elements=this._get_boolean("inline_custom_elements",!0),this.void_elements=this._get_array("void_elements",["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","basefont","isindex"]),this.unformatted=this._get_array("unformatted",[]),this.content_unformatted=this._get_array("content_unformatted",["pre","textarea"]),this.unformatted_content_delimiter=this._get_characters("unformatted_content_delimiter"),this.indent_scripts=this._get_selection("indent_scripts",["normal","keep","separate"])}return t.prototype=new s,At.Options=t,At}var rt={},ue;function he(){if(ue)return rt;ue=1;var s=it().Tokenizer,t=it().TOKEN,r=Tt().Directives,e=te().TemplatablePattern,a=et().Pattern,o={TAG_OPEN:"TK_TAG_OPEN",TAG_CLOSE:"TK_TAG_CLOSE",CONTROL_FLOW_OPEN:"TK_CONTROL_FLOW_OPEN",CONTROL_FLOW_CLOSE:"TK_CONTROL_FLOW_CLOSE",ATTRIBUTE:"TK_ATTRIBUTE",EQUALS:"TK_EQUALS",VALUE:"TK_VALUE",COMMENT:"TK_COMMENT",TEXT:"TK_TEXT",UNKNOWN:"TK_UNKNOWN",START:t.START,RAW:t.RAW,EOF:t.EOF},p=new r(/<\!--/,/-->/),l=function(u,x){s.call(this,u,x),this._current_tag_name="";var b=new e(this._input).read_options(this._options),y=new a(this._input);if(this.__patterns={word:b.until(/[\n\r\t <]/),word_control_flow_close_excluded:b.until(/[\n\r\t <}]/),single_quote:b.until_after(/'/),double_quote:b.until_after(/"/),attribute:b.until(/[\n\r\t =>]|\/>/),element_name:b.until(/[\n\r\t >\/]/),angular_control_flow_start:y.matching(/\@[a-zA-Z]+[^({]*[({]/),handlebars_comment:y.starting_with(/{{!--/).until_after(/--}}/),handlebars:y.starting_with(/{{/).until_after(/}}/),handlebars_open:y.until(/[\n\r\t }]/),handlebars_raw_close:y.until(/}}/),comment:y.starting_with(/<!--/).until_after(/-->/),cdata:y.starting_with(/<!\[CDATA\[/).until_after(/]]>/),conditional_comment:y.starting_with(/<!\[/).until_after(/]>/),processing:y.starting_with(/<\?/).until_after(/\?>/)},this._options.indent_handlebars&&(this.__patterns.word=this.__patterns.word.exclude("handlebars"),this.__patterns.word_control_flow_close_excluded=this.__patterns.word_control_flow_close_excluded.exclude("handlebars")),this._unformatted_content_delimiter=null,this._options.unformatted_content_delimiter){var v=this._input.get_literal_regexp(this._options.unformatted_content_delimiter);this.__patterns.unformatted_content_delimiter=y.matching(v).until_after(v)}};return l.prototype=new s,l.prototype._is_comment=function(u){return!1},l.prototype._is_opening=function(u){return u.type===o.TAG_OPEN||u.type===o.CONTROL_FLOW_OPEN},l.prototype._is_closing=function(u,x){return u.type===o.TAG_CLOSE&&x&&((u.text===">"||u.text==="/>")&&x.text[0]==="<"||u.text==="}}"&&x.text[0]==="{"&&x.text[1]==="{")||u.type===o.CONTROL_FLOW_CLOSE&&u.text==="}"&&x.text.endsWith("{")},l.prototype._reset=function(){this._current_tag_name=""},l.prototype._get_next_token=function(u,x){var b=null;this._readWhitespace();var y=this._input.peek();return y===null?this._create_token(o.EOF,""):(b=b||this._read_open_handlebars(y,x),b=b||this._read_attribute(y,u,x),b=b||this._read_close(y,x),b=b||this._read_script_and_style(y,u),b=b||this._read_control_flows(y,x),b=b||this._read_raw_content(y,u,x),b=b||this._read_content_word(y,x),b=b||this._read_comment_or_cdata(y),b=b||this._read_processing(y),b=b||this._read_open(y,x),b=b||this._create_token(o.UNKNOWN,this._input.next()),b)},l.prototype._read_comment_or_cdata=function(u){var x=null,b=null,y=null;if(u==="<"){var v=this._input.peek(1);v==="!"&&(b=this.__patterns.comment.read(),b?(y=p.get_directives(b),y&&y.ignore==="start"&&(b+=p.readIgnored(this._input))):b=this.__patterns.cdata.read()),b&&(x=this._create_token(o.COMMENT,b),x.directives=y)}return x},l.prototype._read_processing=function(u){var x=null,b=null,y=null;if(u==="<"){var v=this._input.peek(1);(v==="!"||v==="?")&&(b=this.__patterns.conditional_comment.read(),b=b||this.__patterns.processing.read()),b&&(x=this._create_token(o.COMMENT,b),x.directives=y)}return x},l.prototype._read_open=function(u,x){var b=null,y=null;return(!x||x.type===o.CONTROL_FLOW_OPEN)&&u==="<"&&(b=this._input.next(),this._input.peek()==="/"&&(b+=this._input.next()),b+=this.__patterns.element_name.read(),y=this._create_token(o.TAG_OPEN,b)),y},l.prototype._read_open_handlebars=function(u,x){var b=null,y=null;return(!x||x.type===o.CONTROL_FLOW_OPEN)&&(this._options.templating.includes("angular")||this._options.indent_handlebars)&&u==="{"&&this._input.peek(1)==="{"&&(this._options.indent_handlebars&&this._input.peek(2)==="!"?(b=this.__patterns.handlebars_comment.read(),b=b||this.__patterns.handlebars.read(),y=this._create_token(o.COMMENT,b)):(b=this.__patterns.handlebars_open.read(),y=this._create_token(o.TAG_OPEN,b))),y},l.prototype._read_control_flows=function(u,x){var b="",y=null;if(!this._options.templating.includes("angular"))return y;if(u==="@"){if(b=this.__patterns.angular_control_flow_start.read(),b==="")return y;for(var v=b.endsWith("(")?1:0,E=0;!(b.endsWith("{")&&v===E);){var O=this._input.next();if(O===null)break;O==="("?v++:O===")"&&E++,b+=O}y=this._create_token(o.CONTROL_FLOW_OPEN,b)}else u==="}"&&x&&x.type===o.CONTROL_FLOW_OPEN&&(b=this._input.next(),y=this._create_token(o.CONTROL_FLOW_CLOSE,b));return y},l.prototype._read_close=function(u,x){var b=null,y=null;return x&&x.type===o.TAG_OPEN&&(x.text[0]==="<"&&(u===">"||u==="/"&&this._input.peek(1)===">")?(b=this._input.next(),u==="/"&&(b+=this._input.next()),y=this._create_token(o.TAG_CLOSE,b)):x.text[0]==="{"&&u==="}"&&this._input.peek(1)==="}"&&(this._input.next(),this._input.next(),y=this._create_token(o.TAG_CLOSE,"}}"))),y},l.prototype._read_attribute=function(u,x,b){var y=null,v="";if(b&&b.text[0]==="<")if(u==="=")y=this._create_token(o.EQUALS,this._input.next());else if(u==='"'||u==="'"){var E=this._input.next();u==='"'?E+=this.__patterns.double_quote.read():E+=this.__patterns.single_quote.read(),y=this._create_token(o.VALUE,E)}else v=this.__patterns.attribute.read(),v&&(x.type===o.EQUALS?y=this._create_token(o.VALUE,v):y=this._create_token(o.ATTRIBUTE,v));return y},l.prototype._is_content_unformatted=function(u){return this._options.void_elements.indexOf(u)===-1&&(this._options.content_unformatted.indexOf(u)!==-1||this._options.unformatted.indexOf(u)!==-1)},l.prototype._read_raw_content=function(u,x,b){var y="";if(b&&b.text[0]==="{")y=this.__patterns.handlebars_raw_close.read();else if(x.type===o.TAG_CLOSE&&x.opened.text[0]==="<"&&x.text[0]!=="/"){var v=x.opened.text.substr(1).toLowerCase();this._is_content_unformatted(v)&&(y=this._input.readUntil(new RegExp("</"+v+"[\\n\\r\\t ]*?>","ig")))}return y?this._create_token(o.TEXT,y):null},l.prototype._read_script_and_style=function(u,x){if(x.type===o.TAG_CLOSE&&x.opened.text[0]==="<"&&x.text[0]!=="/"){var b=x.opened.text.substr(1).toLowerCase();if(b==="script"||b==="style"){var y=this._read_comment_or_cdata(u);if(y)return y.type=o.TEXT,y;var v=this._input.readUntil(new RegExp("</"+b+"[\\n\\r\\t ]*?>","ig"));if(v)return this._create_token(o.TEXT,v)}}return null},l.prototype._read_content_word=function(u,x){var b="";return this._options.unformatted_content_delimiter&&u===this._options.unformatted_content_delimiter[0]&&(b=this.__patterns.unformatted_content_delimiter.read()),b||(b=x&&x.type===o.CONTROL_FLOW_OPEN?this.__patterns.word_control_flow_close_excluded.read():this.__patterns.word.read()),b?this._create_token(o.TEXT,b):null},rt.Tokenizer=l,rt.TOKEN=o,rt}var ce;function Fe(){if(ce)return St;ce=1;var s=_e().Options,t=pt().Output,r=he().Tokenizer,e=he().TOKEN,a=/\r\n|[\r\n]/,o=/\r\n|[\r\n]/g,p=function(_,n){this.indent_level=0,this.alignment_size=0,this.max_preserve_newlines=_.max_preserve_newlines,this.preserve_newlines=_.preserve_newlines,this._output=new t(_,n)};p.prototype.current_line_has_match=function(_){return this._output.current_line.has_match(_)},p.prototype.set_space_before_token=function(_,n){this._output.space_before_token=_,this._output.non_breaking_space=n},p.prototype.set_wrap_point=function(){this._output.set_indent(this.indent_level,this.alignment_size),this._output.set_wrap_point()},p.prototype.add_raw_token=function(_){this._output.add_raw_token(_)},p.prototype.print_preserved_newlines=function(_){var n=0;_.type!==e.TEXT&&_.previous.type!==e.TEXT&&(n=_.newlines?1:0),this.preserve_newlines&&(n=_.newlines<this.max_preserve_newlines+1?_.newlines:this.max_preserve_newlines+1);for(var c=0;c<n;c++)this.print_newline(c>0);return n!==0},p.prototype.traverse_whitespace=function(_){return _.whitespace_before||_.newlines?(this.print_preserved_newlines(_)||(this._output.space_before_token=!0),!0):!1},p.prototype.previous_token_wrapped=function(){return this._output.previous_token_wrapped},p.prototype.print_newline=function(_){this._output.add_new_line(_)},p.prototype.print_token=function(_){_.text&&(this._output.set_indent(this.indent_level,this.alignment_size),this._output.add_token(_.text))},p.prototype.indent=function(){this.indent_level++},p.prototype.deindent=function(){this.indent_level>0&&(this.indent_level--,this._output.set_indent(this.indent_level,this.alignment_size))},p.prototype.get_full_indent=function(_){return _=this.indent_level+(_||0),_<1?"":this._output.get_indent_string(_)};var l=function(_){for(var n=null,c=_.next;c.type!==e.EOF&&_.closed!==c;){if(c.type===e.ATTRIBUTE&&c.text==="type"){c.next&&c.next.type===e.EQUALS&&c.next.next&&c.next.next.type===e.VALUE&&(n=c.next.next.text);break}c=c.next}return n},u=function(_,n){var c=null,M=null;return n.closed?(_==="script"?c="text/javascript":_==="style"&&(c="text/css"),c=l(n)||c,c.search("text/css")>-1?M="css":c.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/)>-1?M="javascript":c.search(/(text|application|dojo)\/(x-)?(html)/)>-1?M="html":c.search(/test\/null/)>-1&&(M="null"),M):null};function x(_,n){return n.indexOf(_)!==-1}function b(_,n,c){this.parent=_||null,this.tag=n?n.tag_name:"",this.indent_level=c||0,this.parser_token=n||null}function y(_){this._printer=_,this._current_frame=null}y.prototype.get_parser_token=function(){return this._current_frame?this._current_frame.parser_token:null},y.prototype.record_tag=function(_){var n=new b(this._current_frame,_,this._printer.indent_level);this._current_frame=n},y.prototype._try_pop_frame=function(_){var n=null;return _&&(n=_.parser_token,this._printer.indent_level=_.indent_level,this._current_frame=_.parent),n},y.prototype._get_frame=function(_,n){for(var c=this._current_frame;c&&_.indexOf(c.tag)===-1;){if(n&&n.indexOf(c.tag)!==-1){c=null;break}c=c.parent}return c},y.prototype.try_pop=function(_,n){var c=this._get_frame([_],n);return this._try_pop_frame(c)},y.prototype.indent_to_tag=function(_){var n=this._get_frame(_);n&&(this._printer.indent_level=n.indent_level)};function v(_,n,c,M){this._source_text=_||"",n=n||{},this._js_beautify=c,this._css_beautify=M,this._tag_stack=null;var w=new s(n,"html");this._options=w,this._is_wrap_attributes_force=this._options.wrap_attributes.substr(0,5)==="force",this._is_wrap_attributes_force_expand_multiline=this._options.wrap_attributes==="force-expand-multiline",this._is_wrap_attributes_force_aligned=this._options.wrap_attributes==="force-aligned",this._is_wrap_attributes_aligned_multiple=this._options.wrap_attributes==="aligned-multiple",this._is_wrap_attributes_preserve=this._options.wrap_attributes.substr(0,8)==="preserve",this._is_wrap_attributes_preserve_aligned=this._options.wrap_attributes==="preserve-aligned"}v.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var _=this._source_text,n=this._options.eol;this._options.eol==="auto"&&(n=`
`,_&&a.test(_)&&(n=_.match(a)[0])),_=_.replace(o,`
`);var c=_.match(/^[\t ]*/)[0],M={text:"",type:""},w=new E(this._options),S=new p(this._options,c),d=new r(_,this._options).tokenize();this._tag_stack=new y(S);for(var P=null,f=d.next();f.type!==e.EOF;)f.type===e.TAG_OPEN||f.type===e.COMMENT?(P=this._handle_tag_open(S,f,w,M,d),w=P):f.type===e.ATTRIBUTE||f.type===e.EQUALS||f.type===e.VALUE||f.type===e.TEXT&&!w.tag_complete?P=this._handle_inside_tag(S,f,w,M):f.type===e.TAG_CLOSE?P=this._handle_tag_close(S,f,w):f.type===e.TEXT?P=this._handle_text(S,f,w):f.type===e.CONTROL_FLOW_OPEN?P=this._handle_control_flow_open(S,f):f.type===e.CONTROL_FLOW_CLOSE?P=this._handle_control_flow_close(S,f):S.add_raw_token(f),M=P,f=d.next();var T=S._output.get_code(n);return T},v.prototype._handle_control_flow_open=function(_,n){var c={text:n.text,type:n.type};return _.set_space_before_token(n.newlines||n.whitespace_before!=="",!0),n.newlines?_.print_preserved_newlines(n):_.set_space_before_token(n.newlines||n.whitespace_before!=="",!0),_.print_token(n),_.indent(),c},v.prototype._handle_control_flow_close=function(_,n){var c={text:n.text,type:n.type};return _.deindent(),n.newlines?_.print_preserved_newlines(n):_.set_space_before_token(n.newlines||n.whitespace_before!=="",!0),_.print_token(n),c},v.prototype._handle_tag_close=function(_,n,c){var M={text:n.text,type:n.type};return _.alignment_size=0,c.tag_complete=!0,_.set_space_before_token(n.newlines||n.whitespace_before!=="",!0),c.is_unformatted?_.add_raw_token(n):(c.tag_start_char==="<"&&(_.set_space_before_token(n.text[0]==="/",!0),this._is_wrap_attributes_force_expand_multiline&&c.has_wrapped_attrs&&_.print_newline(!1)),_.print_token(n)),c.indent_content&&!(c.is_unformatted||c.is_content_unformatted)&&(_.indent(),c.indent_content=!1),!c.is_inline_element&&!(c.is_unformatted||c.is_content_unformatted)&&_.set_wrap_point(),M},v.prototype._handle_inside_tag=function(_,n,c,M){var w=c.has_wrapped_attrs,S={text:n.text,type:n.type};return _.set_space_before_token(n.newlines||n.whitespace_before!=="",!0),c.is_unformatted?_.add_raw_token(n):c.tag_start_char==="{"&&n.type===e.TEXT?_.print_preserved_newlines(n)?(n.newlines=0,_.add_raw_token(n)):_.print_token(n):(n.type===e.ATTRIBUTE?_.set_space_before_token(!0):(n.type===e.EQUALS||n.type===e.VALUE&&n.previous.type===e.EQUALS)&&_.set_space_before_token(!1),n.type===e.ATTRIBUTE&&c.tag_start_char==="<"&&((this._is_wrap_attributes_preserve||this._is_wrap_attributes_preserve_aligned)&&(_.traverse_whitespace(n),w=w||n.newlines!==0),this._is_wrap_attributes_force&&c.attr_count>=this._options.wrap_attributes_min_attrs&&(M.type!==e.TAG_OPEN||this._is_wrap_attributes_force_expand_multiline)&&(_.print_newline(!1),w=!0)),_.print_token(n),w=w||_.previous_token_wrapped(),c.has_wrapped_attrs=w),S},v.prototype._handle_text=function(_,n,c){var M={text:n.text,type:"TK_CONTENT"};return c.custom_beautifier_name?this._print_custom_beatifier_text(_,n,c):c.is_unformatted||c.is_content_unformatted?_.add_raw_token(n):(_.traverse_whitespace(n),_.print_token(n)),M},v.prototype._print_custom_beatifier_text=function(_,n,c){var M=this;if(n.text!==""){var w=n.text,S,d=1,P="",f="";c.custom_beautifier_name==="javascript"&&typeof this._js_beautify=="function"?S=this._js_beautify:c.custom_beautifier_name==="css"&&typeof this._css_beautify=="function"?S=this._css_beautify:c.custom_beautifier_name==="html"&&(S=function(k,R){var C=new v(k,R,M._js_beautify,M._css_beautify);return C.beautify()}),this._options.indent_scripts==="keep"?d=0:this._options.indent_scripts==="separate"&&(d=-_.indent_level);var T=_.get_full_indent(d);if(w=w.replace(/\n[ \t]*$/,""),c.custom_beautifier_name!=="html"&&w[0]==="<"&&w.match(/^(<!--|<!\[CDATA\[)/)){var i=/^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(w);if(!i){_.add_raw_token(n);return}P=T+i[1]+`
`,w=i[4],i[5]&&(f=T+i[5]),w=w.replace(/\n[ \t]*$/,""),(i[2]||i[3].indexOf(`
`)!==-1)&&(i=i[3].match(/[ \t]+$/),i&&(n.whitespace_before=i[0]))}if(w)if(S){var g=function(){this.eol=`
`};g.prototype=this._options.raw_options;var m=new g;w=S(T+w,m)}else{var A=n.whitespace_before;A&&(w=w.replace(new RegExp(`
(`+A+")?","g"),`
`)),w=T+w.replace(/\n/g,`
`+T)}P&&(w?w=P+w+`
`+f:w=P+f),_.print_newline(!1),w&&(n.text=w,n.whitespace_before="",n.newlines=0,_.add_raw_token(n),_.print_newline(!0))}},v.prototype._handle_tag_open=function(_,n,c,M,w){var S=this._get_tag_open_token(n);if((c.is_unformatted||c.is_content_unformatted)&&!c.is_empty_element&&n.type===e.TAG_OPEN&&!S.is_start_tag?(_.add_raw_token(n),S.start_tag_token=this._tag_stack.try_pop(S.tag_name)):(_.traverse_whitespace(n),this._set_tag_position(_,n,S,c,M),S.is_inline_element||_.set_wrap_point(),_.print_token(n)),S.is_start_tag&&this._is_wrap_attributes_force){var d=0,P;do P=w.peek(d),P.type===e.ATTRIBUTE&&(S.attr_count+=1),d+=1;while(P.type!==e.EOF&&P.type!==e.TAG_CLOSE)}return(this._is_wrap_attributes_force_aligned||this._is_wrap_attributes_aligned_multiple||this._is_wrap_attributes_preserve_aligned)&&(S.alignment_size=n.text.length+1),!S.tag_complete&&!S.is_unformatted&&(_.alignment_size=S.alignment_size),S};var E=function(_,n,c){if(this.parent=n||null,this.text="",this.type="TK_TAG_OPEN",this.tag_name="",this.is_inline_element=!1,this.is_unformatted=!1,this.is_content_unformatted=!1,this.is_empty_element=!1,this.is_start_tag=!1,this.is_end_tag=!1,this.indent_content=!1,this.multiline_content=!1,this.custom_beautifier_name=null,this.start_tag_token=null,this.attr_count=0,this.has_wrapped_attrs=!1,this.alignment_size=0,this.tag_complete=!1,this.tag_start_char="",this.tag_check="",!c)this.tag_complete=!0;else{var M;this.tag_start_char=c.text[0],this.text=c.text,this.tag_start_char==="<"?(M=c.text.match(/^<([^\s>]*)/),this.tag_check=M?M[1]:""):(M=c.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/),this.tag_check=M?M[1]:"",(c.text.startsWith("{{#>")||c.text.startsWith("{{~#>"))&&this.tag_check[0]===">"&&(this.tag_check===">"&&c.next!==null?this.tag_check=c.next.text.split(" ")[0]:this.tag_check=c.text.split(">")[1])),this.tag_check=this.tag_check.toLowerCase(),c.type===e.COMMENT&&(this.tag_complete=!0),this.is_start_tag=this.tag_check.charAt(0)!=="/",this.tag_name=this.is_start_tag?this.tag_check:this.tag_check.substr(1),this.is_end_tag=!this.is_start_tag||c.closed&&c.closed.text==="/>";var w=2;this.tag_start_char==="{"&&this.text.length>=3&&this.text.charAt(2)==="~"&&(w=3),this.is_end_tag=this.is_end_tag||this.tag_start_char==="{"&&(!_.indent_handlebars||this.text.length<3||/[^#\^]/.test(this.text.charAt(w)))}};v.prototype._get_tag_open_token=function(_){var n=new E(this._options,this._tag_stack.get_parser_token(),_);return n.alignment_size=this._options.wrap_attributes_indent_size,n.is_end_tag=n.is_end_tag||x(n.tag_check,this._options.void_elements),n.is_empty_element=n.tag_complete||n.is_start_tag&&n.is_end_tag,n.is_unformatted=!n.tag_complete&&x(n.tag_check,this._options.unformatted),n.is_content_unformatted=!n.is_empty_element&&x(n.tag_check,this._options.content_unformatted),n.is_inline_element=x(n.tag_name,this._options.inline)||this._options.inline_custom_elements&&n.tag_name.includes("-")||n.tag_start_char==="{",n},v.prototype._set_tag_position=function(_,n,c,M,w){if(c.is_empty_element||(c.is_end_tag?c.start_tag_token=this._tag_stack.try_pop(c.tag_name):(this._do_optional_end_element(c)&&(c.is_inline_element||_.print_newline(!1)),this._tag_stack.record_tag(c),(c.tag_name==="script"||c.tag_name==="style")&&!(c.is_unformatted||c.is_content_unformatted)&&(c.custom_beautifier_name=u(c.tag_check,n)))),x(c.tag_check,this._options.extra_liners)&&(_.print_newline(!1),_._output.just_added_blankline()||_.print_newline(!0)),c.is_empty_element){if(c.tag_start_char==="{"&&c.tag_check==="else"){this._tag_stack.indent_to_tag(["if","unless","each"]),c.indent_content=!0;var S=_.current_line_has_match(/{{#if/);S||_.print_newline(!1)}c.tag_name==="!--"&&w.type===e.TAG_CLOSE&&M.is_end_tag&&c.text.indexOf(`
`)===-1||(c.is_inline_element||c.is_unformatted||_.print_newline(!1),this._calcluate_parent_multiline(_,c))}else if(c.is_end_tag){var d=!1;d=c.start_tag_token&&c.start_tag_token.multiline_content,d=d||!c.is_inline_element&&!(M.is_inline_element||M.is_unformatted)&&!(w.type===e.TAG_CLOSE&&c.start_tag_token===M)&&w.type!=="TK_CONTENT",(c.is_content_unformatted||c.is_unformatted)&&(d=!1),d&&_.print_newline(!1)}else c.indent_content=!c.custom_beautifier_name,c.tag_start_char==="<"&&(c.tag_name==="html"?c.indent_content=this._options.indent_inner_html:c.tag_name==="head"?c.indent_content=this._options.indent_head_inner_html:c.tag_name==="body"&&(c.indent_content=this._options.indent_body_inner_html)),!(c.is_inline_element||c.is_unformatted)&&(w.type!=="TK_CONTENT"||c.is_content_unformatted)&&_.print_newline(!1),this._calcluate_parent_multiline(_,c)},v.prototype._calcluate_parent_multiline=function(_,n){n.parent&&_._output.just_added_newline()&&!((n.is_inline_element||n.is_unformatted)&&n.parent.is_inline_element)&&(n.parent.multiline_content=!0)};var O=["address","article","aside","blockquote","details","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","main","menu","nav","ol","p","pre","section","table","ul"],I=["a","audio","del","ins","map","noscript","video"];return v.prototype._do_optional_end_element=function(_){var n=null;if(!(_.is_empty_element||!_.is_start_tag||!_.parent)){if(_.tag_name==="body")n=n||this._tag_stack.try_pop("head");else if(_.tag_name==="li")n=n||this._tag_stack.try_pop("li",["ol","ul","menu"]);else if(_.tag_name==="dd"||_.tag_name==="dt")n=n||this._tag_stack.try_pop("dt",["dl"]),n=n||this._tag_stack.try_pop("dd",["dl"]);else if(_.parent.tag_name==="p"&&O.indexOf(_.tag_name)!==-1){var c=_.parent.parent;(!c||I.indexOf(c.tag_name)===-1)&&(n=n||this._tag_stack.try_pop("p"))}else _.tag_name==="rp"||_.tag_name==="rt"?(n=n||this._tag_stack.try_pop("rt",["ruby","rtc"]),n=n||this._tag_stack.try_pop("rp",["ruby","rtc"])):_.tag_name==="optgroup"?n=n||this._tag_stack.try_pop("optgroup",["select"]):_.tag_name==="option"?n=n||this._tag_stack.try_pop("option",["select","datalist","optgroup"]):_.tag_name==="colgroup"?n=n||this._tag_stack.try_pop("caption",["table"]):_.tag_name==="thead"?(n=n||this._tag_stack.try_pop("caption",["table"]),n=n||this._tag_stack.try_pop("colgroup",["table"])):_.tag_name==="tbody"||_.tag_name==="tfoot"?(n=n||this._tag_stack.try_pop("caption",["table"]),n=n||this._tag_stack.try_pop("colgroup",["table"]),n=n||this._tag_stack.try_pop("thead",["table"]),n=n||this._tag_stack.try_pop("tbody",["table"])):_.tag_name==="tr"?(n=n||this._tag_stack.try_pop("caption",["table"]),n=n||this._tag_stack.try_pop("colgroup",["table"]),n=n||this._tag_stack.try_pop("tr",["table","thead","tbody","tfoot"])):(_.tag_name==="th"||_.tag_name==="td")&&(n=n||this._tag_stack.try_pop("td",["table","thead","tbody","tfoot","tr"]),n=n||this._tag_stack.try_pop("th",["table","thead","tbody","tfoot","tr"]));return _.parent=this._tag_stack.get_parser_token(),n}},St.Beautifier=v,St}var pe;function We(){if(pe)return nt.exports;pe=1;var s=Fe().Beautifier,t=_e().Options;function r(e,a,o,p){var l=new s(e,a,o,p);return l.beautify()}return nt.exports=r,nt.exports.defaultOptions=function(){return new t},nt.exports}var fe;function je(){if(fe)return q;fe=1;var s=Be(),t=Ue(),r=We();function e(a,o,p,l){return p=p||s,l=l||t,r(a,o,p,l)}return e.defaultOptions=r.defaultOptions,q.js=s,q.css=t,q.html=e,q}var de;function ze(){return de||(de=1,function(s){function t(r,e,a){var o=function(p,l){return r.js_beautify(p,l)};return o.js=r.js_beautify,o.css=e.css_beautify,o.html=a.html_beautify,o.js_beautify=r.js_beautify,o.css_beautify=e.css_beautify,o.html_beautify=a.html_beautify,o}(function(r){var e=je();e.js_beautify=e.js,e.css_beautify=e.css,e.html_beautify=e.html,r.exports=t(e,e,e)})(s)}(ut)),ut.exports}var qe=ze();const It=(s,t)=>{const{width:e,height:a,data:o}=s,p=Math.ceil(e/t),l=Math.ceil(a/t),u=new Uint8Array(Math.ceil(e/t)*Math.ceil(a/t));let x=0;for(let b=0;b<a;b+=t)for(let y=0;y<e;y+=t){let v=!1;for(let E=0;E<t&&!v;E++)for(let O=0;O<t&&!v;O++){const I=y+O,_=b+E;if(I<e&&_<a){const n=(_*e+I)*4;o[n+3]>10&&(v=!0)}}u[x++]=v?1:0}return{validBlocks:u,blockWidth:p,blockHeight:l}},kt=(s,t,r)=>s+r*(t-s),ge=s=>{s=s.replace(/^#/,"");const t=parseInt(s,16),r=t>>16&255,e=t>>8&255,a=t&255;return{r,g:e,b:a}},$e=(s,t,r)=>"#"+((1<<24)+(s<<16)+(t<<8)+r).toString(16).slice(1),Rt=(s,t)=>{if(!(s!=null&&s.length))return"#ffffff";if(s.length===1)return s[0];const e=Math.max(0,Math.min(1,t))*(s.length-1),a=Math.floor(e);if(a===s.length-1)return s[s.length-1];const o=e-a,p=ge(s[a]),l=ge(s[a+1]),u=Math.round(kt(p.r,l.r,o)),x=Math.round(kt(p.g,l.g,o)),b=Math.round(kt(p.b,l.b,o));return $e(u,x,b)},me=({dimensions:{width:s,height:t}})=>({top:()=>({x:Math.random()*s,y:0}),center:()=>({x:Math.round(s/2),y:Math.round(t/2)}),bottom:()=>({x:Math.random()*s,y:t}),random:()=>({x:Math.random()*s,y:Math.random()*t}),left:()=>({x:0,y:Math.random()*t}),right:()=>({x:s,y:Math.random()*t}),"top-left":()=>({x:Math.random()*(s/5),y:Math.random()*(t/5)}),"top-right":()=>({x:s,y:Math.random()*(t/5)}),"bottom-left":()=>({x:Math.random()*(s/5),y:t-Math.random()*(t/5)}),"bottom-right":()=>({x:s-Math.random()*(s/5),y:t-Math.random()*(t/5)})}),Ct=(s,t)=>{if(s.length===0)return{width:0,height:0,minX:0,minY:0,maxX:0,maxY:0};let r=1/0,e=1/0,a=-1/0,o=-1/0;return s.forEach(p=>{r=Math.min(r,p.targetX),e=Math.min(e,p.targetY),a=Math.max(a,p.targetX+t),o=Math.max(o,p.targetY+t)}),{minX:r,minY:e,maxX:a,maxY:o,width:a-r,height:o-e}},be=s=>qe.js(s,{indent_size:2,space_in_empty_paren:!1,preserve_newlines:!0}),Ke=s=>{s.x+=s.dx,s.y+=s.dy,s.dx+=(Math.random()-.5)*.1,s.dy-=.02},He=(s,t)=>t-s.createdAt>=s.lifetime,Ge=(s,t)=>{if(t>(s.revealThreshold||.99))return 1;if(t>.85&&Math.sqrt(Math.pow(s.x-s.targetX,2)+Math.pow(s.y-s.targetY,2))<=5){const a=(s.revealThreshold||.99)-.02,o=Math.max(0,(t-a)/.02);return Math.min(1,o)}return 0},Ve=(s,t,r,e,a=5)=>{const o=[];for(let p=0;p<a;p++){const l=Math.random()*Math.PI*2,u=.5+Math.random()*2;o.push({x:s,y:t,dx:Math.cos(l)*u,dy:Math.sin(l)*u-1,radius:2+Math.random()*5,color:r,opacity:.7+Math.random()*.3,createdAt:e,lifetime:Bt})}return o},Qe=({bubble:s,requestAnimationFrameTime:t,context:r,particleColors:e})=>{const a=t-s.createdAt,o=Math.min(1,a/s.lifetime),p=s.opacity*(1-o);r.beginPath(),r.arc(Math.floor(s.x),Math.floor(s.y),s.radius,0,Math.PI*2),r.fillStyle=Rt(e,o),r.globalAlpha=p,r.fill()},ye=({particle:s,context:t,particleRadius:r,imageBitmap:e})=>{t.globalAlpha=s.opacity||1,t.drawImage(e,s.targetX,s.targetY,r,r,Math.floor(s.x),Math.floor(s.y),r,r)},Ze=({particle:s,context:t,particleRadius:r,particleColors:e,revealProgress:a})=>{const o=Math.floor(r*(s.scale||1));t.globalAlpha=s.opacity||1,t.beginPath(),t.arc(Math.floor(s.x)+o/2,Math.floor(s.y)+o/2,o/2,0,2*Math.PI),t.fillStyle=e.length?Rt(e,a):s.color,t.fill()},Je=({particle:s,blendFactor:t,context:r,particleRadius:e,particleColors:a,revealProgress:o,imageBitmap:p})=>{const l=Math.floor(e*(s.scale||1));r.globalAlpha=(s.opacity||1)*(1-t),r.beginPath(),r.arc(Math.floor(s.x)+l/2,Math.floor(s.y)+l/2,l/2,0,2*Math.PI),r.fillStyle=a.length?Rt(a,o):s.color,r.fill(),r.globalAlpha=t,r.drawImage(p,s.targetX,s.targetY,e,e,Math.floor(s.x),Math.floor(s.y),e,e)},ti=({particle:s,context:t,particleRadius:r,particleColors:e,revealProgress:a,imageBitmap:o,enableImageParticles:p})=>{if(p)ye({particle:s,context:t,particleRadius:r,imageBitmap:o});else{const l=Ge(s,a);l>0&&l<1?Je({particle:s,blendFactor:l,context:t,particleRadius:r,particleColors:e,revealProgress:a,imageBitmap:o}):l>=1?ye({particle:s,context:t,particleRadius:r,imageBitmap:o}):Ze({particle:s,context:t,particleRadius:r,particleColors:e,revealProgress:a})}},ei=s=>s.x===s.targetX&&s.y===s.targetY,ot={"ease-in-out":s=>s*(2-s),"ease-in":s=>s*s,"ease-out":s=>1-(1-s)*(1-s),linear:s=>s,"quadratic-out":s=>s*(2-s),"ease-out-quart":s=>1-Math.pow(1-s,4),"ease-in-out-quint":s=>s<.5?16*s*s*s*s*s:1-Math.pow(-2*s+2,5)/2,"ease-in-quart":s=>s*s*s*s},Dt=`{
  'ease-in-out': (t) => t * (2 - t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'linear': (t) => t,
  'quadratic-out': (t) => t * (2 - t),
  'ease-out-quart': (t) => 1 - Math.pow(1 - t, 4),
  'ease-in-out-quint': (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  'ease-in-quart': (t) => t * t * t * t,
}`,W={BUILD:"BUILD",SUPER_SWIRL:"SUPER_SWIRL",OPPENHEIMER:"OPPENHEIMER",SCANNING:"SCANNING",EXPLOSION:"EXPLOSION",HELIX_SPIRAL:"HELIX_SPIRAL"},ii={factory:s=>(t,r,e,a,o)=>{const{swirlTurns:p,spiralDirection:l,easingType:u,affectOpacity:x,affectScale:b}=s,y=e-r,v=Math.min(y/o,1),E=Math.min(v,1),O=ot[u](E);if(!t._started){const n=t.initialX-t.targetX,c=t.initialY-t.targetY;t._radius=Math.sqrt(n*n+c*c),t._angle=Math.atan2(c,n),t._turns=p+Math.random(),t._started=!0}const I=t._radius*(1-O),_=t._angle+l*2*Math.PI*t._turns*O;t.x=t.targetX+I*Math.cos(_),t.y=t.targetY+I*Math.sin(_),b?t.scale=1+2*(1-O):t.scale=1,x?t.opacity=O:t.opacity=1,t.color=`rgba(255,255,255,${t.opacity})`,E>=1&&(t.x=t.targetX,t.y=t.targetY,t.opacity=1,t.scale=1)},defaultConfig:{swirlTurns:2,spiralDirection:1,easingType:"ease-in-out",affectOpacity:!0,affectScale:!0},commonControls:{startPosition:!0,delay:!0},getCode:s=>`
    return (() => {
      const config = ${JSON.stringify(s,null,2)};
      const {swirlTurns, spiralDirection, easingType, affectOpacity, affectScale} = config;
      const easingConfig = ${Dt};

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
  `},si={factory:s=>(t,r,e,a,o)=>{const{horizontalPhaseEnd:p,verticalCompressionFactor:l,scalingBoost:u,bouncyIntensity:x,bouncyOffset:b}=s,y=e-r,v=Math.min(y/o,1),E=1,O=.6,I=1.1,_=.2,n=.1,c=.5;if(t.customProps||(t.customProps={originalScale:t.scale,originalOpacity:t.opacity}),v>=1)return t.x=t.targetX,t.y=t.targetY,t.scale=t.customProps.originalScale,t.opacity=t.customProps.originalOpacity,t;const M=w=>{const S=2*Math.PI/3;return w===0?0:w===1?1:Math.pow(2,-x*w)*Math.sin((w*x-b)*S)+1};if(v<p){const w=v/p,S=M(w);t.x=t.initialX+(t.targetX-t.initialX)*S,t.y=t.initialY;const d=t.customProps.originalScale,P=1-Math.sin(w*Math.PI)*_;t.scale=d*P}else if(v<E){const w=(v-p)/(E-p),S=M(w);t.x=t.targetX;const d=(t.initialY+t.targetY)/2,P=d+(t.targetY-d)*l,f=w<O?0:(()=>{const A=(w-O)/(1-O);return 1-Math.pow(1-A,I)})(),T=t.initialY+(P-t.initialY)*S;t.y=T+(t.targetY-P)*f;const i=t.customProps.originalScale,g=1-Math.sin(w*Math.PI)*n,m=w<c?1+(1-w/c)*u:1;t.scale=i*g*m}return t},defaultConfig:{horizontalPhaseEnd:.4,verticalCompressionFactor:.45,scalingBoost:.3,bouncyIntensity:10,bouncyOffset:.75,startPosition:"center"},commonControls:{startPosition:!0,delay:!0},getCode:s=>` 
    return (() => {
      const config = ${JSON.stringify(s,null,2)};

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
  `},ai={factory:s=>(t,r,e,a,o)=>{const p=e-r,l=Math.min(p/o,1),{windStrength:u,turbulenceScale:x,oscillationAmount:b,settlingSpeed:y,particleWeight:v}=s;t.windProps||(t.windProps={originalScale:t.scale,originalOpacity:t.opacity,gustSensitivity:(.5+Math.random()*1.5)/v,gustFrequency:1+Math.random()*2,turbulenceScale:(10+Math.random()*40)*(x/25),drift:(Math.random()-.5)*2,weight:(.3+Math.random()*.7)*v,flutterAmount:(Math.random()*.8+.2)*b,flutterSpeed:3+Math.random()*6,delay:Math.random()*.15/y,turbPhaseX:Math.random()*1e3,turbPhaseY:Math.random()*1e3,sinePhaseX:Math.random()*Math.PI*2,sinePhaseY:Math.random()*Math.PI*2,opacityPhase:Math.random()*Math.PI*2,burstOpacity:Math.random()>.7});let E=Math.max(0,(l-t.windProps.delay)/(1-t.windProps.delay));E=Math.min(1,Math.pow(E,1/y));let O;if(E<.25)O=E*4*u;else if(E<.75){const L=(E-.25)/.5;O=u+Math.sin(L*Math.PI*3)*u*.3,O+=Math.sin(L*Math.PI*8)*u*.15}else O=u*(1-(E-.75)/.25);let I,_;const n=y;if(E<.25){const L=Math.pow(E/.25,2);I=t.initialX+(t.targetX-t.initialX)*L*.15*n,_=t.initialY+(t.targetY-t.initialY)*L*.15*n}else if(E<.75){const Nt=.15+(E-.25)/.5*.6*n;I=t.initialX+(t.targetX-t.initialX)*Math.min(Nt,.75),_=t.initialY+(t.targetY-t.initialY)*Math.min(Nt,.75)}else{const L=(E-.75)/.25,xe=.75+(1-Math.pow(1-L,3))*.25;I=t.initialX+(t.targetX-t.initialX)*xe,_=t.initialY+(t.targetY-t.initialY)*xe}const c=E*10,M=Math.sin((c*.3+t.windProps.turbPhaseX)*t.windProps.gustFrequency)*t.windProps.turbulenceScale,w=Math.sin((c*.7+t.windProps.turbPhaseX*.5)*t.windProps.gustFrequency*1.5)*t.windProps.turbulenceScale*.5,S=Math.sin((c*1.1+t.windProps.turbPhaseX*.8)*t.windProps.gustFrequency*2.3)*t.windProps.turbulenceScale*.3,d=Math.cos((c*.4+t.windProps.turbPhaseY)*t.windProps.gustFrequency)*t.windProps.turbulenceScale*.8,P=Math.cos((c*.9+t.windProps.turbPhaseY*.7)*t.windProps.gustFrequency*1.8)*t.windProps.turbulenceScale*.4,f=Math.cos((c*1.3+t.windProps.turbPhaseY*.3)*t.windProps.gustFrequency*2.1)*t.windProps.turbulenceScale*.25,T=(M+w+S)*O*t.windProps.gustSensitivity,i=(d+P+f)*O*t.windProps.gustSensitivity,g=30*Math.sin(E*Math.PI*.7)*t.windProps.drift*O,m=25*O*t.windProps.flutterAmount,A=m*Math.sin(E*Math.PI*t.windProps.flutterSpeed+t.windProps.sinePhaseX),k=m*.5*Math.cos(E*Math.PI*t.windProps.flutterSpeed*.7+t.windProps.sinePhaseY),R=1/t.windProps.weight;t.x=I+(T+A+g)/R,t.y=_+(i+k)/R;const C=t.windProps.originalScale,B=Math.sin(E*Math.PI*t.windProps.flutterSpeed*1.5+t.windProps.sinePhaseX)*.15*b,j=Math.sin(E*Math.PI*2)*.1*O;t.scale=C*(1+B+j);const G=t.windProps.originalOpacity;let z=0;t.windProps.burstOpacity?z=Math.sin(E*Math.PI*20+t.windProps.opacityPhase)*.2*O:z=Math.sin(E*Math.PI*10+t.windProps.opacityPhase)*.1*O;let U;E<.1?U=E/.1:E>.9?U=1:U=1+z,t.opacity=G*Math.min(1,Math.max(.2,U));let V=0,Q=100,Z=70;if(t.origColor)V=t.origColor.hue,Q=t.origColor.saturation,Z=t.origColor.lightness;else{if(t.color.startsWith("hsl")){const L=t.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);L&&(V=parseInt(L[1],10),Q=parseInt(L[2],10),Z=parseInt(L[3],10))}else V=(220+Math.random()*40)%360,Q=10+Math.random()*15,Z=70+Math.random()*20;t.origColor={hue:V,saturation:Q,lightness:Z}}const we=O*20,gi=(V+Math.sin(E*Math.PI*3)*5*O)%360,mi=Math.max(0,Q-we*.5),bi=Math.min(100,Z+we*.3);t.color=`hsl(${gi}, ${mi}%, ${bi}%)`,l>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=t.windProps.originalScale,t.opacity=t.windProps.originalOpacity)},defaultConfig:{windStrength:1,turbulenceScale:60,oscillationAmount:1.5,settlingSpeed:1.5,particleWeight:.7},commonControls:{startPosition:!0,delay:!0},getCode:s=>`
    return (() => {
      const config = ${JSON.stringify(s,null,2)};
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
  `},ni={factory:s=>(t,r,e,a,o,p)=>{const{oscillationFrequency:l,settlementThreshold:u,scanningRange:x,passDistribution:b,settlementTiming:y}=s,v=e-r,E=Math.min(v/o,1),O=l*2;if(t.animation===void 0){t.id=crypto.randomUUID();const P=t.id.split("").reduce((g,m)=>(g<<5)-g+m.charCodeAt(0),0),f=Math.abs(P),T=Math.max(1,Math.floor(O*b));let i;if(y==="early"){const g=Math.max(1,Math.floor(T/3));i=f%g+1}else if(y==="late"){const g=Math.max(1,Math.floor(T/3)),m=T-g+1;i=f%g+m}else i=f%T+1;t.animation={settled:!1,assignedPass:i,currentPass:0},t.y=t.targetY,t.opacity=1}if(t.animation.settled)return t.x=t.targetX,t.y=t.targetY,t;const I=p.maxX-p.minX;if(I<=0||!isFinite(I))return t;const _=Math.sin(E*l*Math.PI*2),n=E*O,c=Math.min(Math.floor(n)+1,O);c>t.animation.currentPass&&(t.animation.currentPass=c);const M=p.minX-x,w=p.maxX+x,S=M+(_+1)/2*(w-M);t.x=S;const d=Math.abs(t.x-t.targetX);t.animation.currentPass>=t.animation.assignedPass&&d<=u&&(t.x=t.targetX,t.y=t.targetY,t.animation.settled=!0)},defaultConfig:{oscillationFrequency:3,settlementThreshold:12,scanningRange:30,passDistribution:.85,settlementTiming:"distributed"},commonControls:{startPosition:!1,delay:!0},getCode:s=>`
    return (() => {
      const config = ${JSON.stringify(s,null,2)};
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
  `},ri={factory:s=>(t,r,e,a,o)=>{const{explosionStrength:p,deconstructionPhase:l,orbitalRadius:u,depthOffset:x}=s,b=e-r,y=Math.min(b/o,1);if(!t.isInitialized){t.isInitialized=!0;const n=p+Math.random()*p*.5,c=Math.random()*Math.PI*2,M=Math.acos(Math.random()*2-1);t.explodedPos={x:t.initialX+Math.cos(c)*Math.sin(M)*n,y:t.initialY+Math.sin(c)*Math.sin(M)*n,z:x+Math.cos(M)*n},t.finalPos={x:t.targetX,y:t.targetY,z:0}}let v,E=1;const O=l;if(y<O){const n=y/O,c=ot["ease-out-quart"](n);v={x:t.initialX+(t.explodedPos.x-t.initialX)*c,y:t.initialY+(t.explodedPos.y-t.initialY)*c,z:0+(t.explodedPos.z-0)*c},E=1+1.5*Math.sin(n*Math.PI)}else{const n=(y-O)/(1-O),c=ot["ease-in-out-quint"](n);v={x:t.explodedPos.x+(t.finalPos.x-t.explodedPos.x)*c,y:t.explodedPos.y+(t.finalPos.y-t.explodedPos.y)*c,z:t.explodedPos.z+(t.finalPos.z-t.explodedPos.z)*c},E=1+.8*Math.sin(n*Math.PI);const M=Math.max(0,(n-.7)/.3);if(M>0){const w=1-M,S=M*Math.PI*4,d=u*w*w;v.x+=Math.cos(S)*d,v.y+=Math.sin(S)*d}}const I=a.width*1.2,_=I/(I-v.z);t.x=(v.x-a.width/2)*_+a.width/2,t.y=(v.y-a.height/2)*_+a.height/2,t.scale=Math.max(0,_),t.opacity=Math.max(0,Math.min(1,_))*E,y>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1)},defaultConfig:{explosionStrength:1e3,deconstructionPhase:.4,orbitalRadius:15,depthOffset:-500},commonControls:{startPosition:!0,delay:!0},getCode:s=>`
    return (() => {
      const config = ${JSON.stringify(s,null,2)};
      const {explosionStrength, deconstructionPhase, orbitalRadius, depthOffset} = config;
      const easingConfig = ${Dt};

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
  `},oi={factory:s=>(t,r,e,a,o)=>{const{helixRadius:p,helixTurns:l,helixHeight:u,rotationSpeed:x,easingType:b,perspective:y,affectOpacity:v}=s,E=e-r,O=Math.min(E/o,1);if(!t.isInitialized){t.isInitialized=!0;const g=Math.random()*Math.PI*2,m=p/100*Math.min(a.width,a.height),A=u/100*a.height,k=(Math.random()-.5)*A;t.helixAngle=g,t.helixHeight=k,t.helixPhase=Math.random()*Math.PI*2,t.helixStartPos={x:a.width/2+Math.cos(g)*m,y:a.height/2+k,z:Math.sin(g)*m},t.actualHelixRadius=m,t.actualHelixHeight=A,t.finalPos={x:t.targetX,y:t.targetY,z:0}}const I=Math.min(O,1),_=ot[b](I),n=t.helixAngle+l*2*Math.PI*I*x,c=t.helixHeight*(1-_),M=a.width/2+Math.cos(n)*t.actualHelixRadius*(1-_),w=a.height/2+c,S=Math.sin(n)*t.actualHelixRadius*(1-_),d={x:M+(t.finalPos.x-M)*_,y:w+(t.finalPos.y-w)*_,z:S+(t.finalPos.z-S)*_},P=Math.sin(I*Math.PI*4+t.helixPhase)*10*(1-_);d.x+=P*Math.cos(n+Math.PI/2),d.y+=P*.5;const f=y/(y-d.z);t.x=(d.x-a.width/2)*f+a.width/2,t.y=(d.y-a.height/2)*f+a.height/2,t.scale=Math.max(.1,f),v?t.opacity=Math.max(0,Math.min(1,f))*(.3+.7*_):t.opacity=Math.max(0,Math.min(1,f));const T=(d.z+t.actualHelixRadius)/(t.actualHelixRadius*2),i=Math.max(.6,Math.min(1,T));t.color=`rgba(${Math.floor(255*i)}, ${Math.floor(255*i)}, 255, ${t.opacity})`,I>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1,t.color="rgba(255, 255, 255, 1)")},defaultConfig:{helixRadius:20,helixTurns:3,helixHeight:50,rotationSpeed:1,easingType:"ease-in-out-quint",perspective:800,affectOpacity:!1},commonControls:{startPosition:!1,delay:!0},getCode:s=>`
    return (() => {
      const config = ${JSON.stringify(s,null,2)};
      const {helixRadius, helixTurns, helixHeight, rotationSpeed, easingType, perspective, affectOpacity} = config;
      const easingConfig = ${Dt};

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
  `},X={[W.SUPER_SWIRL]:ii,[W.BUILD]:si,[W.OPPENHEIMER]:ai,[W.SCANNING]:ni,[W.EXPLOSION]:ri,[W.HELIX_SPIRAL]:oi};let ve;const Pe={particleRadius:5,startPosition:Te,selectedMovementFunction:_t,selectedEffect:null,effectConfigurations:{SUPER_SWIRL:X.SUPER_SWIRL.defaultConfig,BUILD:X.BUILD.defaultConfig,OPPENHEIMER:X.OPPENHEIMER.defaultConfig,SCANNING:X.SCANNING.defaultConfig,EXPLOSION:X.EXPLOSION.defaultConfig,HELIX_SPIRAL:X.HELIX_SPIRAL.defaultConfig},movementFunctionCode:De()[_t].code,text:Ee,font:Xt,particleColors:Oe,animationDuration:3e3,delay:0,enableBubbles:!1,enableImageParticles:!1},h={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:Pe,revealProgress:0,textBoundaries:null};let K;const li=async s=>{h.mainCanvas=s,h.mainContext=h.mainCanvas.getContext("bitmaprenderer"),h.frameCanvas=new OffscreenCanvas(h.mainCanvas.width,h.mainCanvas.height),h.frameContext=h.frameCanvas.getContext("2d",{willReadFrequently:!0})},_i=s=>{const{imageBitmap:t,canvas:r,dimensions:e,appProps:a}=s;if(h.imageBitmap=t,Object.keys(a).length){const u={...a.font,textColor:a.font.textColor??Xt.textColor};h.appProps={...Pe,...a,font:u}}li(r),h.frameContext.drawImage(h.imageBitmap,0,0);const{validBlocks:o,blockHeight:p,blockWidth:l}=It(h.frameContext.getImageData(0,0,h.mainCanvas.width,h.mainCanvas.height),h.appProps.particleRadius);h.textBoundaries=Ct(h.workerParticles,h.appProps.particleRadius),h.validBlocks=o,h.blockHeight=p,h.blockWidth=l,K=me({dimensions:e}),h.workerParticles=lt({validBlocks:h.validBlocks,radius:h.appProps.particleRadius,blockHeight:h.blockHeight,blockWidth:h.blockWidth,startPosition:h.appProps.startPosition,delay:h.appProps.delay})},lt=({validBlocks:s,radius:t,blockHeight:r,blockWidth:e,startPosition:a,delay:o})=>{const p=[];for(let l=0;l<r;l++)for(let u=0;u<e;u++){const x=l*e+u;if(s[x]){const b=u*t,y=l*t,v=Math.round(Math.random()*o),{x:E,y:O}=K[a]();p.push({targetX:b,targetY:y,x:E,y:O,initialX:E,initialY:O,scale:1,opacity:1,delay:v,color:Lt,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return p},ui=s=>{for(let t=h.bubbleParticles.length-1;t>=0;t--){const r=h.bubbleParticles[t];Ke(r),Qe({bubble:r,requestAnimationFrameTime:s,context:h.frameContext,particleColors:h.appProps.particleColors}),He(r,s)&&h.bubbleParticles.splice(t,1)}h.frameContext.globalAlpha=1},hi=(s,t,r,e)=>{ve(s,t,r,{width:h.mainCanvas.width,height:h.mainCanvas.height},h.appProps.animationDuration,e)},ci=(s,t)=>{if(!s.emittedBubbles&&h.appProps.enableBubbles&&s.x===s.targetX&&s.y===s.targetY){s.emittedBubbles=!0;const r=Ve(s.x,s.y,s.color,t,2+Math.floor(Math.random()*3));h.bubbleParticles.push(...r)}},pi=(s,t)=>{const r=t-s;let e=!0;return h.workerParticles.forEach(a=>{hi(a,s,t,h.textBoundaries),!(a.delay>r)&&(ti({particle:a,context:h.frameContext,particleRadius:h.appProps.particleRadius,particleColors:h.appProps.particleColors,revealProgress:h.revealProgress,imageBitmap:h.imageBitmap,enableImageParticles:h.appProps.enableImageParticles}),ci(a,t),!ei(a)&&h.revealProgress>=.99&&(e=!1))}),e},H=(s,t)=>{h.frameContext.clearRect(0,0,h.frameCanvas.width,h.frameCanvas.height);const r=t-s;h.revealProgress=Math.min(1,r/h.appProps.animationDuration),ui(t);const e=pi(s,t),a=h.frameCanvas.transferToImageBitmap();h.mainContext.transferFromImageBitmap(a);const o=e&&h.revealProgress>=1,p=h.appProps.animationDuration+(h.appProps.enableBubbles?Bt:0);o&&r>=p?h.animationFrameId&&(cancelAnimationFrame(h.animationFrameId),h.bubbleParticles=[],h.frameContext.drawImage(h.imageBitmap,0,0)):h.animationFrameId=requestAnimationFrame(u=>H(s,u))},fi=()=>{ve=new Function(h.appProps.movementFunctionCode)();const s=performance.now();h.revealProgress=0,h.bubbleParticles=[],h.workerParticles.forEach(t=>{t.emittedBubbles=!1}),H(s,s)},di=()=>{h.animationFrameId&&cancelAnimationFrame(h.animationFrameId),h.bubbleParticles=[],h.revealProgress=0,h.workerParticles=h.workerParticles.map(t=>{const r=K[h.appProps.startPosition]();return{x:r.x,y:r.y,initialX:r.x,initialY:r.y,targetX:t.targetX,targetY:t.targetY,scale:1,opacity:1,delay:t.delay,color:t.color,revealProgress:0,revealThreshold:t.revealThreshold}}),h.frameContext.clearRect(0,0,h.frameCanvas.width,h.frameCanvas.height);const s=h.frameCanvas.transferToImageBitmap();h.mainContext.transferFromImageBitmap(s),h.animationFrameId&&cancelAnimationFrame(h.animationFrameId)};self.onmessage=s=>{const{payload:t,type:r}=s.data;switch(r){case D.INITIALIZE:{_i(t),self.postMessage({type:N.INITIALIZED,data:h.appProps});break}case D.PLAY:{di(),fi();break}case D.RESIZE_PARTICLE_RADIUS:{h.appProps.particleRadius=t,h.frameContext.drawImage(h.imageBitmap,0,0);const{validBlocks:e,blockHeight:a,blockWidth:o}=It(h.frameContext.getImageData(0,0,h.mainCanvas.width,h.mainCanvas.height),h.appProps.particleRadius);if(h.validBlocks=e,h.blockHeight=a,h.blockWidth=o,h.workerParticles=lt({validBlocks:h.validBlocks,radius:h.appProps.particleRadius,blockHeight:h.blockHeight,blockWidth:h.blockWidth,startPosition:h.appProps.startPosition,delay:h.appProps.delay}),h.textBoundaries=Ct(h.workerParticles,h.appProps.particleRadius),self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps}),h.animationFrameId){cancelAnimationFrame(h.animationFrameId);const p=performance.now();H(p,p)}break}case D.UPDATE_START_POSITION:{if(h.appProps.startPosition=t,h.workerParticles.length){if(h.workerParticles.forEach(e=>{const a=K[h.appProps.startPosition]();e.initialX=a.x,e.initialY=a.y,e.x=a.x,e.y=a.y}),self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps}),h.animationFrameId){cancelAnimationFrame(h.animationFrameId);const e=performance.now();H(e,e)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:h.workerParticles});break}case D.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:e,movementFunctionCode:a}=t??{};e&&(h.appProps.selectedMovementFunction=e),a!=null&&(h.appProps.movementFunctionCode=a,h.appProps.selectedEffect=null),self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_TEXT:{h.appProps.text=t,self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_FONT:{h.appProps.font=t,self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_PARTICLE_COLORS:{if(h.appProps.particleColors=t,t.length>0,self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps}),h.animationFrameId){cancelAnimationFrame(h.animationFrameId);const e=performance.now();H(e,e)}break}case D.UPDATE_BITMAP:{if(h.imageBitmap=t,h.frameCanvas&&h.mainCanvas){h.frameCanvas.width=h.imageBitmap.width,h.frameCanvas.height=h.imageBitmap.height,h.mainCanvas.width=h.imageBitmap.width,h.mainCanvas.height=h.imageBitmap.height,h.frameContext.drawImage(h.imageBitmap,0,0);const{validBlocks:e,blockHeight:a,blockWidth:o}=It(h.frameContext.getImageData(0,0,h.mainCanvas.width,h.mainCanvas.height),h.appProps.particleRadius);h.textBoundaries=Ct(h.workerParticles,h.appProps.particleRadius),h.validBlocks=e,h.blockHeight=a,h.blockWidth=o,K=me({dimensions:{width:h.mainCanvas.width,height:h.mainCanvas.height}}),h.workerParticles=lt({validBlocks:h.validBlocks,radius:h.appProps.particleRadius,blockHeight:h.blockHeight,blockWidth:h.blockWidth,startPosition:h.appProps.startPosition,delay:h.appProps.delay})}break}case D.UPDATE_ANIMATION_DURATION:{h.appProps.animationDuration=t,self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps}),h.animationFrameId&&(h.bubbleParticles=[]);break}case D.UPDATE_DELAY:{h.appProps.delay=t,h.validBlocks&&(h.workerParticles=lt({validBlocks:h.validBlocks,radius:h.appProps.particleRadius,blockHeight:h.blockHeight,blockWidth:h.blockWidth,startPosition:h.appProps.startPosition,delay:h.appProps.delay})),self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_ENABLE_BUBBLES:{h.appProps.enableBubbles=t,self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_ENABLE_IMAGE_PARTICLES:{h.appProps.enableImageParticles=t,self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_SELECTED_EFFECT:{h.appProps.selectedEffect=t,t&&X[t].getCode&&(h.appProps.movementFunctionCode=be(X[t].getCode(h.appProps.effectConfigurations[t]))),self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}case D.UPDATE_EFFECT_CONFIGURATION:{const{effectType:e,configuration:a}=t;h.appProps.effectConfigurations[e]=a,X[e].getCode&&(h.appProps.movementFunctionCode=be(X[e].getCode(a))),self.postMessage({type:N.UPDATE_APP_PROPS,data:h.appProps});break}}}})();
