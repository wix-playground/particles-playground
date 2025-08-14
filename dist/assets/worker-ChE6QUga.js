(function(){"use strict";const Ne=[],Xe="random",ft="DEV_EXAMPLE",Ye="WIX 🤠",Bt="#ffffff",Fe=["#ff0000","#00ff00","#0000ff"],Ut={fontFamily:"Arial",fontSize:90,italic:!1,weight:400,letterSpacing:0,textColor:Bt},Be=`// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`,W=`/**
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
`,Ue=`${W}
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
`,Wt=1300;var C=(i=>(i.INITIALIZE="INITIALIZE",i.PLAY="PLAY",i.RESIZE_PARTICLE_RADIUS="RESIZE_PARTICLE_RADIUS",i.UPDATE_START_POSITION="UPDATE_START_POSITION",i.UPDATE_SELECTED_MOVEMENT_FUNCTION="UPDATE_SELECTED_MOVEMENT_FUNCTION",i.UPDATE_SELECTED_EFFECT="UPDATE_SELECTED_EFFECT",i.UPDATE_EFFECT_CONFIGURATION="UPDATE_EFFECT_CONFIGURATION",i.UPDATE_BITMAP="UPDATE_BITMAP",i.UPDATE_TEXT="UPDATE_TEXT",i.UPDATE_FONT="UPDATE_FONT",i.UPDATE_PARTICLE_COLORS="UPDATE_PARTICLE_COLORS",i.UPDATE_ANIMATION_DURATION="UPDATE_ANIMATION_DURATION",i.UPDATE_DELAY="UPDATE_DELAY",i.UPDATE_ENABLE_BUBBLES="UPDATE_ENABLE_BUBBLES",i.UPDATE_ENABLE_IMAGE_PARTICLES="UPDATE_ENABLE_IMAGE_PARTICLES",i.UPDATE_ENABLE_STATIC_MODE="UPDATE_ENABLE_STATIC_MODE",i.UPDATE_PARTICLE_GAP="UPDATE_PARTICLE_GAP",i.UPDATE_SIZE_INTERPOLATION_PERCENTAGE="UPDATE_SIZE_INTERPOLATION_PERCENTAGE",i.UPDATE_INTERPOLATION_OFFSET="UPDATE_INTERPOLATION_OFFSET",i.UPDATE_SIZE_INTERPOLATION_MAX="UPDATE_SIZE_INTERPOLATION_MAX",i.UPDATE_LAYER_COUNT="UPDATE_LAYER_COUNT",i.UPDATE_LAYER_OFFSET_DISTANCE="UPDATE_LAYER_OFFSET_DISTANCE",i.UPDATE_LAYER_OFFSET_ANGLE="UPDATE_LAYER_OFFSET_ANGLE",i.UPDATE_LAYER_OPACITY_DECAY="UPDATE_LAYER_OPACITY_DECAY",i.UPDATE_LAYER_COLORS="UPDATE_LAYER_COLORS",i))(C||{}),k=(i=>(i.INITIALIZED="INITIALIZED",i.UPDATE_APP_PROPS="UPDATE_APP_PROPS",i))(k||{});const We=[{name:"linear",definition:"const linear = (t) => t;",comment:`/**
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
    }`,comment:""}],je=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
`,ze=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,qe=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,$e=`return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
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
}`,Ke=()=>Object.assign({},{[ft]:{code:`${W}${Ue}`},DEV_TWO_FRAMES:{code:`${W}${Be}`},bezier:{code:`${W}${je}`},pulseColorCycle:{code:`${W}${ze}`},timeDistortion:{code:`${W}${qe}`},elasticPlop:{code:`${W}${$e}`}},...We.map(({name:i,comment:t,definition:n})=>({[i]:{code:`${W}return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    // This is obviously inefficient because the same constant will be recalculated for every particle, but this is a playground and its not that expensive.
    ${t}
    ${n}
    const lerp = (start, end, t) => start + t * (end - start);

    const totalElapsedTime = currentTime - animationStartTime;
    const progress = Math.min(totalElapsedTime / animationDuration, 1);
    const easedProgress = ${i}(progress);

    particle.x = lerp(particle.initialX, particle.targetX, easedProgress);
    particle.y = lerp(particle.initialY, particle.targetY, easedProgress);

    if (
        Math.abs(particle.x - particle.targetX) < 1 &&
        Math.abs(particle.y - particle.targetY) < 1
    ) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    }
};`}})));var dt={exports:{}},V={},at={exports:{}},gt={},mt={},jt;function bt(){if(jt)return mt;jt=1;function i(e){this.__parent=e,this.__character_count=0,this.__indent_count=-1,this.__alignment_count=0,this.__wrap_point_index=0,this.__wrap_point_character_count=0,this.__wrap_point_indent_count=-1,this.__wrap_point_alignment_count=0,this.__items=[]}i.prototype.clone_empty=function(){var e=new i(this.__parent);return e.set_indent(this.__indent_count,this.__alignment_count),e},i.prototype.item=function(e){return e<0?this.__items[this.__items.length+e]:this.__items[e]},i.prototype.has_match=function(e){for(var s=this.__items.length-1;s>=0;s--)if(this.__items[s].match(e))return!0;return!1},i.prototype.set_indent=function(e,s){this.is_empty()&&(this.__indent_count=e||0,this.__alignment_count=s||0,this.__character_count=this.__parent.get_indent_size(this.__indent_count,this.__alignment_count))},i.prototype._set_wrap_point=function(){this.__parent.wrap_line_length&&(this.__wrap_point_index=this.__items.length,this.__wrap_point_character_count=this.__character_count,this.__wrap_point_indent_count=this.__parent.next_line.__indent_count,this.__wrap_point_alignment_count=this.__parent.next_line.__alignment_count)},i.prototype._should_wrap=function(){return this.__wrap_point_index&&this.__character_count>this.__parent.wrap_line_length&&this.__wrap_point_character_count>this.__parent.next_line.__character_count},i.prototype._allow_wrap=function(){if(this._should_wrap()){this.__parent.add_new_line();var e=this.__parent.current_line;return e.set_indent(this.__wrap_point_indent_count,this.__wrap_point_alignment_count),e.__items=this.__items.slice(this.__wrap_point_index),this.__items=this.__items.slice(0,this.__wrap_point_index),e.__character_count+=this.__character_count-this.__wrap_point_character_count,this.__character_count=this.__wrap_point_character_count,e.__items[0]===" "&&(e.__items.splice(0,1),e.__character_count-=1),!0}return!1},i.prototype.is_empty=function(){return this.__items.length===0},i.prototype.last=function(){return this.is_empty()?null:this.__items[this.__items.length-1]},i.prototype.push=function(e){this.__items.push(e);var s=e.lastIndexOf(`
`);s!==-1?this.__character_count=e.length-s:this.__character_count+=e.length},i.prototype.pop=function(){var e=null;return this.is_empty()||(e=this.__items.pop(),this.__character_count-=e.length),e},i.prototype._remove_indent=function(){this.__indent_count>0&&(this.__indent_count-=1,this.__character_count-=this.__parent.indent_size)},i.prototype._remove_wrap_indent=function(){this.__wrap_point_indent_count>0&&(this.__wrap_point_indent_count-=1)},i.prototype.trim=function(){for(;this.last()===" ";)this.__items.pop(),this.__character_count-=1},i.prototype.toString=function(){var e="";return this.is_empty()?this.__parent.indent_empty_lines&&(e=this.__parent.get_indent_string(this.__indent_count)):(e=this.__parent.get_indent_string(this.__indent_count,this.__alignment_count),e+=this.__items.join("")),e};function t(e,s){this.__cache=[""],this.__indent_size=e.indent_size,this.__indent_string=e.indent_char,e.indent_with_tabs||(this.__indent_string=new Array(e.indent_size+1).join(e.indent_char)),s=s||"",e.indent_level>0&&(s=new Array(e.indent_level+1).join(this.__indent_string)),this.__base_string=s,this.__base_string_length=s.length}t.prototype.get_indent_size=function(e,s){var l=this.__base_string_length;return s=s||0,e<0&&(l=0),l+=e*this.__indent_size,l+=s,l},t.prototype.get_indent_string=function(e,s){var l=this.__base_string;return s=s||0,e<0&&(e=0,l=""),s+=e*this.__indent_size,this.__ensure_cache(s),l+=this.__cache[s],l},t.prototype.__ensure_cache=function(e){for(;e>=this.__cache.length;)this.__add_column()},t.prototype.__add_column=function(){var e=this.__cache.length,s=0,l="";this.__indent_size&&e>=this.__indent_size&&(s=Math.floor(e/this.__indent_size),e-=s*this.__indent_size,l=new Array(s+1).join(this.__indent_string)),e&&(l+=new Array(e+1).join(" ")),this.__cache.push(l)};function n(e,s){this.__indent_cache=new t(e,s),this.raw=!1,this._end_with_newline=e.end_with_newline,this.indent_size=e.indent_size,this.wrap_line_length=e.wrap_line_length,this.indent_empty_lines=e.indent_empty_lines,this.__lines=[],this.previous_line=null,this.current_line=null,this.next_line=new i(this),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1,this.__add_outputline()}return n.prototype.__add_outputline=function(){this.previous_line=this.current_line,this.current_line=this.next_line.clone_empty(),this.__lines.push(this.current_line)},n.prototype.get_line_number=function(){return this.__lines.length},n.prototype.get_indent_string=function(e,s){return this.__indent_cache.get_indent_string(e,s)},n.prototype.get_indent_size=function(e,s){return this.__indent_cache.get_indent_size(e,s)},n.prototype.is_empty=function(){return!this.previous_line&&this.current_line.is_empty()},n.prototype.add_new_line=function(e){return this.is_empty()||!e&&this.just_added_newline()?!1:(this.raw||this.__add_outputline(),!0)},n.prototype.get_code=function(e){this.trim(!0);var s=this.current_line.pop();s&&(s[s.length-1]===`
`&&(s=s.replace(/\n+$/g,"")),this.current_line.push(s)),this._end_with_newline&&this.__add_outputline();var l=this.__lines.join(`
`);return e!==`
`&&(l=l.replace(/[\n]/g,e)),l},n.prototype.set_wrap_point=function(){this.current_line._set_wrap_point()},n.prototype.set_indent=function(e,s){return e=e||0,s=s||0,this.next_line.set_indent(e,s),this.__lines.length>1?(this.current_line.set_indent(e,s),!0):(this.current_line.set_indent(),!1)},n.prototype.add_raw_token=function(e){for(var s=0;s<e.newlines;s++)this.__add_outputline();this.current_line.set_indent(-1),this.current_line.push(e.whitespace_before),this.current_line.push(e.text),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=!1},n.prototype.add_token=function(e){this.__add_space_before_token(),this.current_line.push(e),this.space_before_token=!1,this.non_breaking_space=!1,this.previous_token_wrapped=this.current_line._allow_wrap()},n.prototype.__add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&(this.non_breaking_space||this.set_wrap_point(),this.current_line.push(" "))},n.prototype.remove_indent=function(e){for(var s=this.__lines.length;e<s;)this.__lines[e]._remove_indent(),e++;this.current_line._remove_wrap_indent()},n.prototype.trim=function(e){for(e=e===void 0?!1:e,this.current_line.trim();e&&this.__lines.length>1&&this.current_line.is_empty();)this.__lines.pop(),this.current_line=this.__lines[this.__lines.length-1],this.current_line.trim();this.previous_line=this.__lines.length>1?this.__lines[this.__lines.length-2]:null},n.prototype.just_added_newline=function(){return this.current_line.is_empty()},n.prototype.just_added_blankline=function(){return this.is_empty()||this.current_line.is_empty()&&this.previous_line.is_empty()},n.prototype.ensure_empty_line_above=function(e,s){for(var l=this.__lines.length-2;l>=0;){var p=this.__lines[l];if(p.is_empty())break;if(p.item(0).indexOf(e)!==0&&p.item(-1)!==s){this.__lines.splice(l+1,0,new i(this)),this.previous_line=this.__lines[this.__lines.length-2];break}l--}},mt.Output=n,mt}var yt={},zt;function qt(){if(zt)return yt;zt=1;function i(t,n,e,s){this.type=t,this.text=n,this.comments_before=null,this.newlines=e||0,this.whitespace_before=s||"",this.parent=null,this.next=null,this.previous=null,this.opened=null,this.closed=null,this.directives=null}return yt.Token=i,yt}var Pt={},$t;function Kt(){return $t||($t=1,function(i){var t="\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a",n="\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a",e="\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc",s="\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f",l="\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}",p="(?:"+l+"|["+t+e+"])",_="(?:"+l+"|["+n+e+s+"])*";i.identifier=new RegExp(p+_,"g"),i.identifierStart=new RegExp(p),i.identifierMatch=new RegExp("(?:"+l+"|["+n+e+s+"])+"),i.newline=/[\n\r\u2028\u2029]/,i.lineBreak=new RegExp(`\r
|`+i.newline.source),i.allLineBreaks=new RegExp(i.lineBreak.source,"g")}(Pt)),Pt}var vt={},Q={},Ht;function wt(){if(Ht)return Q;Ht=1;function i(e,s){this.raw_options=t(e,s),this.disabled=this._get_boolean("disabled"),this.eol=this._get_characters("eol","auto"),this.end_with_newline=this._get_boolean("end_with_newline"),this.indent_size=this._get_number("indent_size",4),this.indent_char=this._get_characters("indent_char"," "),this.indent_level=this._get_number("indent_level"),this.preserve_newlines=this._get_boolean("preserve_newlines",!0),this.max_preserve_newlines=this._get_number("max_preserve_newlines",32786),this.preserve_newlines||(this.max_preserve_newlines=0),this.indent_with_tabs=this._get_boolean("indent_with_tabs",this.indent_char==="	"),this.indent_with_tabs&&(this.indent_char="	",this.indent_size===1&&(this.indent_size=4)),this.wrap_line_length=this._get_number("wrap_line_length",this._get_number("max_char")),this.indent_empty_lines=this._get_boolean("indent_empty_lines"),this.templating=this._get_selection_list("templating",["auto","none","angular","django","erb","handlebars","php","smarty"],["auto"])}i.prototype._get_array=function(e,s){var l=this.raw_options[e],p=s||[];return typeof l=="object"?l!==null&&typeof l.concat=="function"&&(p=l.concat()):typeof l=="string"&&(p=l.split(/[^a-zA-Z0-9_\/\-]+/)),p},i.prototype._get_boolean=function(e,s){var l=this.raw_options[e],p=l===void 0?!!s:!!l;return p},i.prototype._get_characters=function(e,s){var l=this.raw_options[e],p=s||"";return typeof l=="string"&&(p=l.replace(/\\r/,"\r").replace(/\\n/,`
`).replace(/\\t/,"	")),p},i.prototype._get_number=function(e,s){var l=this.raw_options[e];s=parseInt(s,10),isNaN(s)&&(s=0);var p=parseInt(l,10);return isNaN(p)&&(p=s),p},i.prototype._get_selection=function(e,s,l){var p=this._get_selection_list(e,s,l);if(p.length!==1)throw new Error("Invalid Option Value: The option '"+e+`' can only be one of the following values:
`+s+`
You passed in: '`+this.raw_options[e]+"'");return p[0]},i.prototype._get_selection_list=function(e,s,l){if(!s||s.length===0)throw new Error("Selection list cannot be empty.");if(l=l||[s[0]],!this._is_valid_selection(l,s))throw new Error("Invalid Default Value!");var p=this._get_array(e,l);if(!this._is_valid_selection(p,s))throw new Error("Invalid Option Value: The option '"+e+`' can contain only the following values:
`+s+`
You passed in: '`+this.raw_options[e]+"'");return p},i.prototype._is_valid_selection=function(e,s){return e.length&&s.length&&!e.some(function(l){return s.indexOf(l)===-1})};function t(e,s){var l={};e=n(e);var p;for(p in e)p!==s&&(l[p]=e[p]);if(s&&e[s])for(p in e[s])l[p]=e[s][p];return l}function n(e){var s={},l;for(l in e){var p=l.replace(/-/g,"_");s[p]=e[l]}return s}return Q.Options=i,Q.normalizeOpts=n,Q.mergeOpts=t,Q}var Gt;function Vt(){if(Gt)return vt;Gt=1;var i=wt().Options,t=["before-newline","after-newline","preserve-newline"];function n(e){i.call(this,e,"js");var s=this.raw_options.brace_style||null;s==="expand-strict"?this.raw_options.brace_style="expand":s==="collapse-preserve-inline"?this.raw_options.brace_style="collapse,preserve-inline":this.raw_options.braces_on_own_line!==void 0&&(this.raw_options.brace_style=this.raw_options.braces_on_own_line?"expand":"collapse");var l=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_preserve_inline=!1,this.brace_style="collapse";for(var p=0;p<l.length;p++)l[p]==="preserve-inline"?this.brace_preserve_inline=!0:this.brace_style=l[p];this.unindent_chained_methods=this._get_boolean("unindent_chained_methods"),this.break_chained_methods=this._get_boolean("break_chained_methods"),this.space_in_paren=this._get_boolean("space_in_paren"),this.space_in_empty_paren=this._get_boolean("space_in_empty_paren"),this.jslint_happy=this._get_boolean("jslint_happy"),this.space_after_anon_function=this._get_boolean("space_after_anon_function"),this.space_after_named_function=this._get_boolean("space_after_named_function"),this.keep_array_indentation=this._get_boolean("keep_array_indentation"),this.space_before_conditional=this._get_boolean("space_before_conditional",!0),this.unescape_strings=this._get_boolean("unescape_strings"),this.e4x=this._get_boolean("e4x"),this.comma_first=this._get_boolean("comma_first"),this.operator_position=this._get_selection("operator_position",t),this.test_output_raw=this._get_boolean("test_output_raw"),this.jslint_happy&&(this.space_after_anon_function=!0)}return n.prototype=new i,vt.Options=n,vt}var q={},Tt={},Qt;function xt(){if(Qt)return Tt;Qt=1;var i=RegExp.prototype.hasOwnProperty("sticky");function t(n){this.__input=n||"",this.__input_length=this.__input.length,this.__position=0}return t.prototype.restart=function(){this.__position=0},t.prototype.back=function(){this.__position>0&&(this.__position-=1)},t.prototype.hasNext=function(){return this.__position<this.__input_length},t.prototype.next=function(){var n=null;return this.hasNext()&&(n=this.__input.charAt(this.__position),this.__position+=1),n},t.prototype.peek=function(n){var e=null;return n=n||0,n+=this.__position,n>=0&&n<this.__input_length&&(e=this.__input.charAt(n)),e},t.prototype.__match=function(n,e){n.lastIndex=e;var s=n.exec(this.__input);return s&&!(i&&n.sticky)&&s.index!==e&&(s=null),s},t.prototype.test=function(n,e){return e=e||0,e+=this.__position,e>=0&&e<this.__input_length?!!this.__match(n,e):!1},t.prototype.testChar=function(n,e){var s=this.peek(e);return n.lastIndex=0,s!==null&&n.test(s)},t.prototype.match=function(n){var e=this.__match(n,this.__position);return e?this.__position+=e[0].length:e=null,e},t.prototype.read=function(n,e,s){var l="",p;return n&&(p=this.match(n),p&&(l+=p[0])),e&&(p||!n)&&(l+=this.readUntil(e,s)),l},t.prototype.readUntil=function(n,e){var s="",l=this.__position;n.lastIndex=this.__position;var p=n.exec(this.__input);return p?(l=p.index,e&&(l+=p[0].length)):l=this.__input_length,s=this.__input.substring(this.__position,l),this.__position=l,s},t.prototype.readUntilAfter=function(n){return this.readUntil(n,!0)},t.prototype.get_regexp=function(n,e){var s=null,l="g";return e&&i&&(l="y"),typeof n=="string"&&n!==""?s=new RegExp(n,l):n&&(s=new RegExp(n.source,l)),s},t.prototype.get_literal_regexp=function(n){return RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"))},t.prototype.peekUntilAfter=function(n){var e=this.__position,s=this.readUntilAfter(n);return this.__position=e,s},t.prototype.lookBack=function(n){var e=this.__position-1;return e>=n.length&&this.__input.substring(e-n.length,e).toLowerCase()===n},Tt.InputScanner=t,Tt}var st={},Et={},Zt;function He(){if(Zt)return Et;Zt=1;function i(t){this.__tokens=[],this.__tokens_length=this.__tokens.length,this.__position=0,this.__parent_token=t}return i.prototype.restart=function(){this.__position=0},i.prototype.isEmpty=function(){return this.__tokens_length===0},i.prototype.hasNext=function(){return this.__position<this.__tokens_length},i.prototype.next=function(){var t=null;return this.hasNext()&&(t=this.__tokens[this.__position],this.__position+=1),t},i.prototype.peek=function(t){var n=null;return t=t||0,t+=this.__position,t>=0&&t<this.__tokens_length&&(n=this.__tokens[t]),n},i.prototype.add=function(t){this.__parent_token&&(t.parent=this.__parent_token),this.__tokens.push(t),this.__tokens_length+=1},Et.TokenStream=i,Et}var Ot={},Mt={},Jt;function nt(){if(Jt)return Mt;Jt=1;function i(t,n){this._input=t,this._starting_pattern=null,this._match_pattern=null,this._until_pattern=null,this._until_after=!1,n&&(this._starting_pattern=this._input.get_regexp(n._starting_pattern,!0),this._match_pattern=this._input.get_regexp(n._match_pattern,!0),this._until_pattern=this._input.get_regexp(n._until_pattern),this._until_after=n._until_after)}return i.prototype.read=function(){var t=this._input.read(this._starting_pattern);return(!this._starting_pattern||t)&&(t+=this._input.read(this._match_pattern,this._until_pattern,this._until_after)),t},i.prototype.read_match=function(){return this._input.match(this._match_pattern)},i.prototype.until_after=function(t){var n=this._create();return n._until_after=!0,n._until_pattern=this._input.get_regexp(t),n._update(),n},i.prototype.until=function(t){var n=this._create();return n._until_after=!1,n._until_pattern=this._input.get_regexp(t),n._update(),n},i.prototype.starting_with=function(t){var n=this._create();return n._starting_pattern=this._input.get_regexp(t,!0),n._update(),n},i.prototype.matching=function(t){var n=this._create();return n._match_pattern=this._input.get_regexp(t,!0),n._update(),n},i.prototype._create=function(){return new i(this._input,this)},i.prototype._update=function(){},Mt.Pattern=i,Mt}var te;function Ge(){if(te)return Ot;te=1;var i=nt().Pattern;function t(n,e){i.call(this,n,e),e?this._line_regexp=this._input.get_regexp(e._line_regexp):this.__set_whitespace_patterns("",""),this.newline_count=0,this.whitespace_before_token=""}return t.prototype=new i,t.prototype.__set_whitespace_patterns=function(n,e){n+="\\t ",e+="\\n\\r",this._match_pattern=this._input.get_regexp("["+n+e+"]+",!0),this._newline_regexp=this._input.get_regexp("\\r\\n|["+e+"]")},t.prototype.read=function(){this.newline_count=0,this.whitespace_before_token="";var n=this._input.read(this._match_pattern);if(n===" ")this.whitespace_before_token=" ";else if(n){var e=this.__split(this._newline_regexp,n);this.newline_count=e.length-1,this.whitespace_before_token=e[this.newline_count]}return n},t.prototype.matching=function(n,e){var s=this._create();return s.__set_whitespace_patterns(n,e),s._update(),s},t.prototype._create=function(){return new t(this._input,this)},t.prototype.__split=function(n,e){n.lastIndex=0;for(var s=0,l=[],p=n.exec(e);p;)l.push(e.substring(s,p.index)),s=p.index+p[0].length,p=n.exec(e);return s<e.length?l.push(e.substring(s,e.length)):l.push(""),l},Ot.WhitespacePattern=t,Ot}var ee;function rt(){if(ee)return st;ee=1;var i=xt().InputScanner,t=qt().Token,n=He().TokenStream,e=Ge().WhitespacePattern,s={START:"TK_START",RAW:"TK_RAW",EOF:"TK_EOF"},l=function(p,_){this._input=new i(p),this._options=_||{},this.__tokens=null,this._patterns={},this._patterns.whitespace=new e(this._input)};return l.prototype.tokenize=function(){this._input.restart(),this.__tokens=new n,this._reset();for(var p,_=new t(s.START,""),u=null,T=[],b=new n;_.type!==s.EOF;){for(p=this._get_next_token(_,u);this._is_comment(p);)b.add(p),p=this._get_next_token(_,u);b.isEmpty()||(p.comments_before=b,b=new n),p.parent=u,this._is_opening(p)?(T.push(u),u=p):u&&this._is_closing(p,u)&&(p.opened=u,u.closed=p,u=T.pop(),p.parent=u),p.previous=_,_.next=p,this.__tokens.add(p),_=p}return this.__tokens},l.prototype._is_first_token=function(){return this.__tokens.isEmpty()},l.prototype._reset=function(){},l.prototype._get_next_token=function(p,_){this._readWhitespace();var u=this._input.read(/.+/g);return u?this._create_token(s.RAW,u):this._create_token(s.EOF,"")},l.prototype._is_comment=function(p){return!1},l.prototype._is_opening=function(p){return!1},l.prototype._is_closing=function(p,_){return!1},l.prototype._create_token=function(p,_){var u=new t(p,_,this._patterns.whitespace.newline_count,this._patterns.whitespace.whitespace_before_token);return u},l.prototype._readWhitespace=function(){return this._patterns.whitespace.read()},st.Tokenizer=l,st.TOKEN=s,st}var St={},ie;function At(){if(ie)return St;ie=1;function i(t,n){t=typeof t=="string"?t:t.source,n=typeof n=="string"?n:n.source,this.__directives_block_pattern=new RegExp(t+/ beautify( \w+[:]\w+)+ /.source+n,"g"),this.__directive_pattern=/ (\w+)[:](\w+)/g,this.__directives_end_ignore_pattern=new RegExp(t+/\sbeautify\signore:end\s/.source+n,"g")}return i.prototype.get_directives=function(t){if(!t.match(this.__directives_block_pattern))return null;var n={};this.__directive_pattern.lastIndex=0;for(var e=this.__directive_pattern.exec(t);e;)n[e[1]]=e[2],e=this.__directive_pattern.exec(t);return n},i.prototype.readIgnored=function(t){return t.readUntilAfter(this.__directives_end_ignore_pattern)},St.Directives=i,St}var It={},ae;function se(){if(ae)return It;ae=1;var i=nt().Pattern,t={django:!1,erb:!1,handlebars:!1,php:!1,smarty:!1,angular:!1};function n(e,s){i.call(this,e,s),this.__template_pattern=null,this._disabled=Object.assign({},t),this._excluded=Object.assign({},t),s&&(this.__template_pattern=this._input.get_regexp(s.__template_pattern),this._excluded=Object.assign(this._excluded,s._excluded),this._disabled=Object.assign(this._disabled,s._disabled));var l=new i(e);this.__patterns={handlebars_comment:l.starting_with(/{{!--/).until_after(/--}}/),handlebars_unescaped:l.starting_with(/{{{/).until_after(/}}}/),handlebars:l.starting_with(/{{/).until_after(/}}/),php:l.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),erb:l.starting_with(/<%[^%]/).until_after(/[^%]%>/),django:l.starting_with(/{%/).until_after(/%}/),django_value:l.starting_with(/{{/).until_after(/}}/),django_comment:l.starting_with(/{#/).until_after(/#}/),smarty:l.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),smarty_comment:l.starting_with(/{\*/).until_after(/\*}/),smarty_literal:l.starting_with(/{literal}/).until_after(/{\/literal}/)}}return n.prototype=new i,n.prototype._create=function(){return new n(this._input,this)},n.prototype._update=function(){this.__set_templated_pattern()},n.prototype.disable=function(e){var s=this._create();return s._disabled[e]=!0,s._update(),s},n.prototype.read_options=function(e){var s=this._create();for(var l in t)s._disabled[l]=e.templating.indexOf(l)===-1;return s._update(),s},n.prototype.exclude=function(e){var s=this._create();return s._excluded[e]=!0,s._update(),s},n.prototype.read=function(){var e="";this._match_pattern?e=this._input.read(this._starting_pattern):e=this._input.read(this._starting_pattern,this.__template_pattern);for(var s=this._read_template();s;)this._match_pattern?s+=this._input.read(this._match_pattern):s+=this._input.readUntil(this.__template_pattern),e+=s,s=this._read_template();return this._until_after&&(e+=this._input.readUntilAfter(this._until_pattern)),e},n.prototype.__set_templated_pattern=function(){var e=[];this._disabled.php||e.push(this.__patterns.php._starting_pattern.source),this._disabled.handlebars||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.angular||e.push(this.__patterns.handlebars._starting_pattern.source),this._disabled.erb||e.push(this.__patterns.erb._starting_pattern.source),this._disabled.django||(e.push(this.__patterns.django._starting_pattern.source),e.push(this.__patterns.django_value._starting_pattern.source),e.push(this.__patterns.django_comment._starting_pattern.source)),this._disabled.smarty||e.push(this.__patterns.smarty._starting_pattern.source),this._until_pattern&&e.push(this._until_pattern.source),this.__template_pattern=this._input.get_regexp("(?:"+e.join("|")+")")},n.prototype._read_template=function(){var e="",s=this._input.peek();if(s==="<"){var l=this._input.peek(1);!this._disabled.php&&!this._excluded.php&&l==="?"&&(e=e||this.__patterns.php.read()),!this._disabled.erb&&!this._excluded.erb&&l==="%"&&(e=e||this.__patterns.erb.read())}else s==="{"&&(!this._disabled.handlebars&&!this._excluded.handlebars&&(e=e||this.__patterns.handlebars_comment.read(),e=e||this.__patterns.handlebars_unescaped.read(),e=e||this.__patterns.handlebars.read()),this._disabled.django||(!this._excluded.django&&!this._excluded.handlebars&&(e=e||this.__patterns.django_value.read()),this._excluded.django||(e=e||this.__patterns.django_comment.read(),e=e||this.__patterns.django.read())),this._disabled.smarty||this._disabled.django&&this._disabled.handlebars&&(e=e||this.__patterns.smarty_comment.read(),e=e||this.__patterns.smarty_literal.read(),e=e||this.__patterns.smarty.read()));return e},It.TemplatablePattern=n,It}var ne;function ot(){if(ne)return q;ne=1;var i=xt().InputScanner,t=rt().Tokenizer,n=rt().TOKEN,e=At().Directives,s=Kt(),l=nt().Pattern,p=se().TemplatablePattern;function _(d,v){return v.indexOf(d)!==-1}var u={START_EXPR:"TK_START_EXPR",END_EXPR:"TK_END_EXPR",START_BLOCK:"TK_START_BLOCK",END_BLOCK:"TK_END_BLOCK",WORD:"TK_WORD",RESERVED:"TK_RESERVED",SEMICOLON:"TK_SEMICOLON",STRING:"TK_STRING",EQUALS:"TK_EQUALS",OPERATOR:"TK_OPERATOR",COMMA:"TK_COMMA",BLOCK_COMMENT:"TK_BLOCK_COMMENT",COMMENT:"TK_COMMENT",DOT:"TK_DOT",UNKNOWN:"TK_UNKNOWN",START:n.START,RAW:n.RAW,EOF:n.EOF},T=new e(/\/\*/,/\*\//),b=/0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/,g=/[0-9]/,y=/[^\d\.]/,x=">>> === !== &&= ??= ||= << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "),O=">>>= ... >>= <<= === >>> !== **= &&= ??= ||= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";O=O.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),O="\\?\\.(?!\\d) "+O,O=O.replace(/ /g,"|");var A=new RegExp(O),c="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","),r=c.concat(["do","in","of","else","get","set","new","catch","finally","typeof","yield","async","await","from","as","class","extends"]),h=new RegExp("^(?:"+r.join("|")+")$"),M,w=function(d,v){t.call(this,d,v),this._patterns.whitespace=this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,/\u2028\u2029/.source);var f=new l(this._input),E=new p(this._input).read_options(this._options);this.__patterns={template:E,identifier:E.starting_with(s.identifier).matching(s.identifierMatch),number:f.matching(b),punct:f.matching(A),comment:f.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),block_comment:f.starting_with(/\/\*/).until_after(/\*\//),html_comment_start:f.matching(/<!--/),html_comment_end:f.matching(/-->/),include:f.starting_with(/#include/).until_after(s.lineBreak),shebang:f.starting_with(/#!/).until_after(s.lineBreak),xml:f.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),single_quote:E.until(/['\\\n\r\u2028\u2029]/),double_quote:E.until(/["\\\n\r\u2028\u2029]/),template_text:E.until(/[`\\$]/),template_expression:E.until(/[`}\\]/)}};w.prototype=new t,w.prototype._is_comment=function(d){return d.type===u.COMMENT||d.type===u.BLOCK_COMMENT||d.type===u.UNKNOWN},w.prototype._is_opening=function(d){return d.type===u.START_BLOCK||d.type===u.START_EXPR},w.prototype._is_closing=function(d,v){return(d.type===u.END_BLOCK||d.type===u.END_EXPR)&&v&&(d.text==="]"&&v.text==="["||d.text===")"&&v.text==="("||d.text==="}"&&v.text==="{")},w.prototype._reset=function(){M=!1},w.prototype._get_next_token=function(d,v){var f=null;this._readWhitespace();var E=this._input.peek();return E===null?this._create_token(u.EOF,""):(f=f||this._read_non_javascript(E),f=f||this._read_string(E),f=f||this._read_pair(E,this._input.peek(1)),f=f||this._read_word(d),f=f||this._read_singles(E),f=f||this._read_comment(E),f=f||this._read_regexp(E,d),f=f||this._read_xml(E,d),f=f||this._read_punctuation(),f=f||this._create_token(u.UNKNOWN,this._input.next()),f)},w.prototype._read_word=function(d){var v;if(v=this.__patterns.identifier.read(),v!=="")return v=v.replace(s.allLineBreaks,`
`),!(d.type===u.DOT||d.type===u.RESERVED&&(d.text==="set"||d.text==="get"))&&h.test(v)?(v==="in"||v==="of")&&(d.type===u.WORD||d.type===u.STRING)?this._create_token(u.OPERATOR,v):this._create_token(u.RESERVED,v):this._create_token(u.WORD,v);if(v=this.__patterns.number.read(),v!=="")return this._create_token(u.WORD,v)},w.prototype._read_singles=function(d){var v=null;return d==="("||d==="["?v=this._create_token(u.START_EXPR,d):d===")"||d==="]"?v=this._create_token(u.END_EXPR,d):d==="{"?v=this._create_token(u.START_BLOCK,d):d==="}"?v=this._create_token(u.END_BLOCK,d):d===";"?v=this._create_token(u.SEMICOLON,d):d==="."&&y.test(this._input.peek(1))?v=this._create_token(u.DOT,d):d===","&&(v=this._create_token(u.COMMA,d)),v&&this._input.next(),v},w.prototype._read_pair=function(d,v){var f=null;return d==="#"&&v==="{"&&(f=this._create_token(u.START_BLOCK,d+v)),f&&(this._input.next(),this._input.next()),f},w.prototype._read_punctuation=function(){var d=this.__patterns.punct.read();if(d!=="")return d==="="?this._create_token(u.EQUALS,d):d==="?."?this._create_token(u.DOT,d):this._create_token(u.OPERATOR,d)},w.prototype._read_non_javascript=function(d){var v="";if(d==="#"){if(this._is_first_token()&&(v=this.__patterns.shebang.read(),v))return this._create_token(u.UNKNOWN,v.trim()+`
`);if(v=this.__patterns.include.read(),v)return this._create_token(u.UNKNOWN,v.trim()+`
`);d=this._input.next();var f="#";if(this._input.hasNext()&&this._input.testChar(g)){do d=this._input.next(),f+=d;while(this._input.hasNext()&&d!=="#"&&d!=="=");return d==="#"||(this._input.peek()==="["&&this._input.peek(1)==="]"?(f+="[]",this._input.next(),this._input.next()):this._input.peek()==="{"&&this._input.peek(1)==="}"&&(f+="{}",this._input.next(),this._input.next())),this._create_token(u.WORD,f)}this._input.back()}else if(d==="<"&&this._is_first_token()){if(v=this.__patterns.html_comment_start.read(),v){for(;this._input.hasNext()&&!this._input.testChar(s.newline);)v+=this._input.next();return M=!0,this._create_token(u.COMMENT,v)}}else if(M&&d==="-"&&(v=this.__patterns.html_comment_end.read(),v))return M=!1,this._create_token(u.COMMENT,v);return null},w.prototype._read_comment=function(d){var v=null;if(d==="/"){var f="";if(this._input.peek(1)==="*"){f=this.__patterns.block_comment.read();var E=T.get_directives(f);E&&E.ignore==="start"&&(f+=T.readIgnored(this._input)),f=f.replace(s.allLineBreaks,`
`),v=this._create_token(u.BLOCK_COMMENT,f),v.directives=E}else this._input.peek(1)==="/"&&(f=this.__patterns.comment.read(),v=this._create_token(u.COMMENT,f))}return v},w.prototype._read_string=function(d){if(d==="`"||d==="'"||d==='"'){var v=this._input.next();return this.has_char_escapes=!1,d==="`"?v+=this._read_string_recursive("`",!0,"${"):v+=this._read_string_recursive(d),this.has_char_escapes&&this._options.unescape_strings&&(v=S(v)),this._input.peek()===d&&(v+=this._input.next()),v=v.replace(s.allLineBreaks,`
`),this._create_token(u.STRING,v)}return null},w.prototype._allow_regexp_or_xml=function(d){return d.type===u.RESERVED&&_(d.text,["return","case","throw","else","do","typeof","yield"])||d.type===u.END_EXPR&&d.text===")"&&d.opened.previous.type===u.RESERVED&&_(d.opened.previous.text,["if","while","for"])||_(d.type,[u.COMMENT,u.START_EXPR,u.START_BLOCK,u.START,u.END_BLOCK,u.OPERATOR,u.EQUALS,u.EOF,u.SEMICOLON,u.COMMA])},w.prototype._read_regexp=function(d,v){if(d==="/"&&this._allow_regexp_or_xml(v)){for(var f=this._input.next(),E=!1,a=!1;this._input.hasNext()&&(E||a||this._input.peek()!==d)&&!this._input.testChar(s.newline);)f+=this._input.peek(),E?E=!1:(E=this._input.peek()==="\\",this._input.peek()==="["?a=!0:this._input.peek()==="]"&&(a=!1)),this._input.next();return this._input.peek()===d&&(f+=this._input.next(),f+=this._input.read(s.identifier)),this._create_token(u.STRING,f)}return null},w.prototype._read_xml=function(d,v){if(this._options.e4x&&d==="<"&&this._allow_regexp_or_xml(v)){var f="",E=this.__patterns.xml.read_match();if(E){for(var a=E[2].replace(/^{\s+/,"{").replace(/\s+}$/,"}"),m=a.indexOf("{")===0,P=0;E;){var I=!!E[1],R=E[2],D=!!E[E.length-1]||R.slice(0,8)==="![CDATA[";if(!D&&(R===a||m&&R.replace(/^{\s+/,"{").replace(/\s+}$/,"}"))&&(I?--P:++P),f+=E[0],P<=0)break;E=this.__patterns.xml.read_match()}return E||(f+=this._input.match(/[\s\S]*/g)[0]),f=f.replace(s.allLineBreaks,`
`),this._create_token(u.STRING,f)}}return null};function S(d){for(var v="",f=0,E=new i(d),a=null;E.hasNext();)if(a=E.match(/([\s]|[^\\]|\\\\)+/g),a&&(v+=a[0]),E.peek()==="\\"){if(E.next(),E.peek()==="x")a=E.match(/x([0-9A-Fa-f]{2})/g);else if(E.peek()==="u")a=E.match(/u([0-9A-Fa-f]{4})/g),a||(a=E.match(/u\{([0-9A-Fa-f]+)\}/g));else{v+="\\",E.hasNext()&&(v+=E.next());continue}if(!a||(f=parseInt(a[1],16),f>126&&f<=255&&a[0].indexOf("x")===0))return d;f>=0&&f<32||f>1114111?v+="\\"+a[0]:f===34||f===39||f===92?v+="\\"+String.fromCharCode(f):v+=String.fromCharCode(f)}return v}return w.prototype._read_string_recursive=function(d,v,f){var E,a;d==="'"?a=this.__patterns.single_quote:d==='"'?a=this.__patterns.double_quote:d==="`"?a=this.__patterns.template_text:d==="}"&&(a=this.__patterns.template_expression);for(var m=a.read(),P="";this._input.hasNext();){if(P=this._input.next(),P===d||!v&&s.newline.test(P)){this._input.back();break}else P==="\\"&&this._input.hasNext()?(E=this._input.peek(),E==="x"||E==="u"?this.has_char_escapes=!0:E==="\r"&&this._input.peek(1)===`
`&&this._input.next(),P+=this._input.next()):f&&(f==="${"&&P==="$"&&this._input.peek()==="{"&&(P+=this._input.next()),f===P&&(d==="`"?P+=this._read_string_recursive("}",v,"`"):P+=this._read_string_recursive("`",v,"${"),this._input.hasNext()&&(P+=this._input.next())));P+=a.read(),m+=P}return m},q.Tokenizer=w,q.TOKEN=u,q.positionable_operators=x.slice(),q.line_starters=c.slice(),q}var re;function Ve(){if(re)return gt;re=1;var i=bt().Output,t=qt().Token,n=Kt(),e=Vt().Options,s=ot().Tokenizer,l=ot().line_starters,p=ot().positionable_operators,_=ot().TOKEN;function u(a,m){return m.indexOf(a)!==-1}function T(a){return a.replace(/^\s+/g,"")}function b(a){for(var m={},P=0;P<a.length;P++)m[a[P].replace(/-/g,"_")]=a[P];return m}function g(a,m){return a&&a.type===_.RESERVED&&a.text===m}function y(a,m){return a&&a.type===_.RESERVED&&u(a.text,m)}var x=["case","return","do","if","throw","else","await","break","continue","async"],O=["before-newline","after-newline","preserve-newline"],A=b(O),c=[A.before_newline,A.preserve_newline],r={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"};function h(a,m){m.multiline_frame||m.mode===r.ForInitializer||m.mode===r.Conditional||a.remove_indent(m.start_line_index)}function M(a){a=a.replace(n.allLineBreaks,`
`);for(var m=[],P=a.indexOf(`
`);P!==-1;)m.push(a.substring(0,P)),a=a.substring(P+1),P=a.indexOf(`
`);return a.length&&m.push(a),m}function w(a){return a===r.ArrayLiteral}function S(a){return u(a,[r.Expression,r.ForInitializer,r.Conditional])}function d(a,m){for(var P=0;P<a.length;P++){var I=a[P].trim();if(I.charAt(0)!==m)return!1}return!0}function v(a,m){for(var P=0,I=a.length,R;P<I;P++)if(R=a[P],R&&R.indexOf(m)!==0)return!1;return!0}function f(a,m){m=m||{},this._source_text=a||"",this._output=null,this._tokens=null,this._last_last_text=null,this._flags=null,this._previous_flags=null,this._flag_store=null,this._options=new e(m)}f.prototype.create_flags=function(a,m){var P=0;a&&(P=a.indentation_level,!this._output.just_added_newline()&&a.line_indent_level>P&&(P=a.line_indent_level));var I={mode:m,parent:a,last_token:a?a.last_token:new t(_.START_BLOCK,""),last_word:a?a.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,inline_frame:!1,if_block:!1,else_block:!1,class_start_block:!1,do_block:!1,do_while:!1,import_block:!1,in_case_statement:!1,in_case:!1,case_body:!1,case_block:!1,indentation_level:P,alignment:0,line_indent_level:a?a.line_indent_level:P,start_line_index:this._output.get_line_number(),ternary_depth:0};return I},f.prototype._reset=function(a){var m=a.match(/^[\t ]*/)[0];this._last_last_text="",this._output=new i(this._options,m),this._output.raw=this._options.test_output_raw,this._flag_store=[],this.set_mode(r.BlockStatement);var P=new s(a,this._options);return this._tokens=P.tokenize(),a},f.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var a,m=this._reset(this._source_text),P=this._options.eol;this._options.eol==="auto"&&(P=`
`,m&&n.lineBreak.test(m||"")&&(P=m.match(n.lineBreak)[0]));for(var I=this._tokens.next();I;)this.handle_token(I),this._last_last_text=this._flags.last_token.text,this._flags.last_token=I,I=this._tokens.next();return a=this._output.get_code(P),a},f.prototype.handle_token=function(a,m){a.type===_.START_EXPR?this.handle_start_expr(a):a.type===_.END_EXPR?this.handle_end_expr(a):a.type===_.START_BLOCK?this.handle_start_block(a):a.type===_.END_BLOCK?this.handle_end_block(a):a.type===_.WORD?this.handle_word(a):a.type===_.RESERVED?this.handle_word(a):a.type===_.SEMICOLON?this.handle_semicolon(a):a.type===_.STRING?this.handle_string(a):a.type===_.EQUALS?this.handle_equals(a):a.type===_.OPERATOR?this.handle_operator(a):a.type===_.COMMA?this.handle_comma(a):a.type===_.BLOCK_COMMENT?this.handle_block_comment(a,m):a.type===_.COMMENT?this.handle_comment(a,m):a.type===_.DOT?this.handle_dot(a):a.type===_.EOF?this.handle_eof(a):a.type===_.UNKNOWN?this.handle_unknown(a,m):this.handle_unknown(a,m)},f.prototype.handle_whitespace_and_comments=function(a,m){var P=a.newlines,I=this._options.keep_array_indentation&&w(this._flags.mode);if(a.comments_before)for(var R=a.comments_before.next();R;)this.handle_whitespace_and_comments(R,m),this.handle_token(R,m),R=a.comments_before.next();if(I)for(var D=0;D<P;D+=1)this.print_newline(D>0,m);else if(this._options.max_preserve_newlines&&P>this._options.max_preserve_newlines&&(P=this._options.max_preserve_newlines),this._options.preserve_newlines&&P>1){this.print_newline(!1,m);for(var L=1;L<P;L+=1)this.print_newline(!0,m)}};var E=["async","break","continue","return","throw","yield"];return f.prototype.allow_wrap_or_preserved_newline=function(a,m){if(m=m===void 0?!1:m,!this._output.just_added_newline()){var P=this._options.preserve_newlines&&a.newlines||m,I=u(this._flags.last_token.text,p)||u(a.text,p);if(I){var R=u(this._flags.last_token.text,p)&&u(this._options.operator_position,c)||u(a.text,p);P=P&&R}if(P)this.print_newline(!1,!0);else if(this._options.wrap_line_length){if(y(this._flags.last_token,E))return;this._output.set_wrap_point()}}},f.prototype.print_newline=function(a,m){if(!m&&this._flags.last_token.text!==";"&&this._flags.last_token.text!==","&&this._flags.last_token.text!=="="&&(this._flags.last_token.type!==_.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++"))for(var P=this._tokens.peek();this._flags.mode===r.Statement&&!(this._flags.if_block&&g(P,"else"))&&!this._flags.do_block;)this.restore_mode();this._output.add_new_line(a)&&(this._flags.multiline_frame=!0)},f.prototype.print_token_line_indentation=function(a){this._output.just_added_newline()&&(this._options.keep_array_indentation&&a.newlines&&(a.text==="["||w(this._flags.mode))?(this._output.current_line.set_indent(-1),this._output.current_line.push(a.whitespace_before),this._output.space_before_token=!1):this._output.set_indent(this._flags.indentation_level,this._flags.alignment)&&(this._flags.line_indent_level=this._flags.indentation_level))},f.prototype.print_token=function(a){if(this._output.raw){this._output.add_raw_token(a);return}if(this._options.comma_first&&a.previous&&a.previous.type===_.COMMA&&this._output.just_added_newline()&&this._output.previous_line.last()===","){var m=this._output.previous_line.pop();this._output.previous_line.is_empty()&&(this._output.previous_line.push(m),this._output.trim(!0),this._output.current_line.pop(),this._output.trim()),this.print_token_line_indentation(a),this._output.add_token(","),this._output.space_before_token=!0}this.print_token_line_indentation(a),this._output.non_breaking_space=!0,this._output.add_token(a.text),this._output.previous_token_wrapped&&(this._flags.multiline_frame=!0)},f.prototype.indent=function(){this._flags.indentation_level+=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment)},f.prototype.deindent=function(){this._flags.indentation_level>0&&(!this._flags.parent||this._flags.indentation_level>this._flags.parent.indentation_level)&&(this._flags.indentation_level-=1,this._output.set_indent(this._flags.indentation_level,this._flags.alignment))},f.prototype.set_mode=function(a){this._flags?(this._flag_store.push(this._flags),this._previous_flags=this._flags):this._previous_flags=this.create_flags(null,a),this._flags=this.create_flags(this._previous_flags,a),this._output.set_indent(this._flags.indentation_level,this._flags.alignment)},f.prototype.restore_mode=function(){this._flag_store.length>0&&(this._previous_flags=this._flags,this._flags=this._flag_store.pop(),this._previous_flags.mode===r.Statement&&h(this._output,this._previous_flags),this._output.set_indent(this._flags.indentation_level,this._flags.alignment))},f.prototype.start_of_object_property=function(){return this._flags.parent.mode===r.ObjectLiteral&&this._flags.mode===r.Statement&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||y(this._flags.last_token,["get","set"]))},f.prototype.start_of_statement=function(a){var m=!1;return m=m||y(this._flags.last_token,["var","let","const"])&&a.type===_.WORD,m=m||g(this._flags.last_token,"do"),m=m||!(this._flags.parent.mode===r.ObjectLiteral&&this._flags.mode===r.Statement)&&y(this._flags.last_token,E)&&!a.newlines,m=m||g(this._flags.last_token,"else")&&!(g(a,"if")&&!a.comments_before),m=m||this._flags.last_token.type===_.END_EXPR&&(this._previous_flags.mode===r.ForInitializer||this._previous_flags.mode===r.Conditional),m=m||this._flags.last_token.type===_.WORD&&this._flags.mode===r.BlockStatement&&!this._flags.in_case&&!(a.text==="--"||a.text==="++")&&this._last_last_text!=="function"&&a.type!==_.WORD&&a.type!==_.RESERVED,m=m||this._flags.mode===r.ObjectLiteral&&(this._flags.last_token.text===":"&&this._flags.ternary_depth===0||y(this._flags.last_token,["get","set"])),m?(this.set_mode(r.Statement),this.indent(),this.handle_whitespace_and_comments(a,!0),this.start_of_object_property()||this.allow_wrap_or_preserved_newline(a,y(a,["do","for","if","while"])),!0):!1},f.prototype.handle_start_expr=function(a){this.start_of_statement(a)||this.handle_whitespace_and_comments(a);var m=r.Expression;if(a.text==="["){if(this._flags.last_token.type===_.WORD||this._flags.last_token.text===")"){y(this._flags.last_token,l)&&(this._output.space_before_token=!0),this.print_token(a),this.set_mode(m),this.indent(),this._options.space_in_paren&&(this._output.space_before_token=!0);return}m=r.ArrayLiteral,w(this._flags.mode)&&(this._flags.last_token.text==="["||this._flags.last_token.text===","&&(this._last_last_text==="]"||this._last_last_text==="}"))&&(this._options.keep_array_indentation||this.print_newline()),u(this._flags.last_token.type,[_.START_EXPR,_.END_EXPR,_.WORD,_.OPERATOR,_.DOT])||(this._output.space_before_token=!0)}else{if(this._flags.last_token.type===_.RESERVED)this._flags.last_token.text==="for"?(this._output.space_before_token=this._options.space_before_conditional,m=r.ForInitializer):u(this._flags.last_token.text,["if","while","switch"])?(this._output.space_before_token=this._options.space_before_conditional,m=r.Conditional):u(this._flags.last_word,["await","async"])?this._output.space_before_token=!0:this._flags.last_token.text==="import"&&a.whitespace_before===""?this._output.space_before_token=!1:(u(this._flags.last_token.text,l)||this._flags.last_token.text==="catch")&&(this._output.space_before_token=!0);else if(this._flags.last_token.type===_.EQUALS||this._flags.last_token.type===_.OPERATOR)this.start_of_object_property()||this.allow_wrap_or_preserved_newline(a);else if(this._flags.last_token.type===_.WORD){this._output.space_before_token=!1;var P=this._tokens.peek(-3);if(this._options.space_after_named_function&&P){var I=this._tokens.peek(-4);y(P,["async","function"])||P.text==="*"&&y(I,["async","function"])?this._output.space_before_token=!0:this._flags.mode===r.ObjectLiteral?(P.text==="{"||P.text===","||P.text==="*"&&(I.text==="{"||I.text===","))&&(this._output.space_before_token=!0):this._flags.parent&&this._flags.parent.class_start_block&&(this._output.space_before_token=!0)}}else this.allow_wrap_or_preserved_newline(a);(this._flags.last_token.type===_.RESERVED&&(this._flags.last_word==="function"||this._flags.last_word==="typeof")||this._flags.last_token.text==="*"&&(u(this._last_last_text,["function","yield"])||this._flags.mode===r.ObjectLiteral&&u(this._last_last_text,["{",","])))&&(this._output.space_before_token=this._options.space_after_anon_function)}this._flags.last_token.text===";"||this._flags.last_token.type===_.START_BLOCK?this.print_newline():(this._flags.last_token.type===_.END_EXPR||this._flags.last_token.type===_.START_EXPR||this._flags.last_token.type===_.END_BLOCK||this._flags.last_token.text==="."||this._flags.last_token.type===_.COMMA)&&this.allow_wrap_or_preserved_newline(a,a.newlines),this.print_token(a),this.set_mode(m),this._options.space_in_paren&&(this._output.space_before_token=!0),this.indent()},f.prototype.handle_end_expr=function(a){for(;this._flags.mode===r.Statement;)this.restore_mode();this.handle_whitespace_and_comments(a),this._flags.multiline_frame&&this.allow_wrap_or_preserved_newline(a,a.text==="]"&&w(this._flags.mode)&&!this._options.keep_array_indentation),this._options.space_in_paren&&(this._flags.last_token.type===_.START_EXPR&&!this._options.space_in_empty_paren?(this._output.trim(),this._output.space_before_token=!1):this._output.space_before_token=!0),this.deindent(),this.print_token(a),this.restore_mode(),h(this._output,this._previous_flags),this._flags.do_while&&this._previous_flags.mode===r.Conditional&&(this._previous_flags.mode=r.Expression,this._flags.do_block=!1,this._flags.do_while=!1)},f.prototype.handle_start_block=function(a){this.handle_whitespace_and_comments(a);var m=this._tokens.peek(),P=this._tokens.peek(1);this._flags.last_word==="switch"&&this._flags.last_token.type===_.END_EXPR?(this.set_mode(r.BlockStatement),this._flags.in_case_statement=!0):this._flags.case_body?this.set_mode(r.BlockStatement):P&&(u(P.text,[":",","])&&u(m.type,[_.STRING,_.WORD,_.RESERVED])||u(m.text,["get","set","..."])&&u(P.type,[_.WORD,_.RESERVED]))?u(this._last_last_text,["class","interface"])&&!u(P.text,[":",","])?this.set_mode(r.BlockStatement):this.set_mode(r.ObjectLiteral):this._flags.last_token.type===_.OPERATOR&&this._flags.last_token.text==="=>"?this.set_mode(r.BlockStatement):u(this._flags.last_token.type,[_.EQUALS,_.START_EXPR,_.COMMA,_.OPERATOR])||y(this._flags.last_token,["return","throw","import","default"])?this.set_mode(r.ObjectLiteral):this.set_mode(r.BlockStatement),this._flags.last_token&&y(this._flags.last_token.previous,["class","extends"])&&(this._flags.class_start_block=!0);var I=!m.comments_before&&m.text==="}",R=I&&this._flags.last_word==="function"&&this._flags.last_token.type===_.END_EXPR;if(this._options.brace_preserve_inline){var D=0,L=null;this._flags.inline_frame=!0;do if(D+=1,L=this._tokens.peek(D-1),L.newlines){this._flags.inline_frame=!1;break}while(L.type!==_.EOF&&!(L.type===_.END_BLOCK&&L.opened===a))}(this._options.brace_style==="expand"||this._options.brace_style==="none"&&a.newlines)&&!this._flags.inline_frame?this._flags.last_token.type!==_.OPERATOR&&(R||this._flags.last_token.type===_.EQUALS||y(this._flags.last_token,x)&&this._flags.last_token.text!=="else")?this._output.space_before_token=!0:this.print_newline(!1,!0):(w(this._previous_flags.mode)&&(this._flags.last_token.type===_.START_EXPR||this._flags.last_token.type===_.COMMA)&&((this._flags.last_token.type===_.COMMA||this._options.space_in_paren)&&(this._output.space_before_token=!0),(this._flags.last_token.type===_.COMMA||this._flags.last_token.type===_.START_EXPR&&this._flags.inline_frame)&&(this.allow_wrap_or_preserved_newline(a),this._previous_flags.multiline_frame=this._previous_flags.multiline_frame||this._flags.multiline_frame,this._flags.multiline_frame=!1)),this._flags.last_token.type!==_.OPERATOR&&this._flags.last_token.type!==_.START_EXPR&&(u(this._flags.last_token.type,[_.START_BLOCK,_.SEMICOLON])&&!this._flags.inline_frame?this.print_newline():this._output.space_before_token=!0)),this.print_token(a),this.indent(),!I&&!(this._options.brace_preserve_inline&&this._flags.inline_frame)&&this.print_newline()},f.prototype.handle_end_block=function(a){for(this.handle_whitespace_and_comments(a);this._flags.mode===r.Statement;)this.restore_mode();var m=this._flags.last_token.type===_.START_BLOCK;this._flags.inline_frame&&!m?this._output.space_before_token=!0:this._options.brace_style==="expand"?m||this.print_newline():m||(w(this._flags.mode)&&this._options.keep_array_indentation?(this._options.keep_array_indentation=!1,this.print_newline(),this._options.keep_array_indentation=!0):this.print_newline()),this.restore_mode(),this.print_token(a)},f.prototype.handle_word=function(a){if(a.type===_.RESERVED){if(u(a.text,["set","get"])&&this._flags.mode!==r.ObjectLiteral)a.type=_.WORD;else if(a.text==="import"&&u(this._tokens.peek().text,["(","."]))a.type=_.WORD;else if(u(a.text,["as","from"])&&!this._flags.import_block)a.type=_.WORD;else if(this._flags.mode===r.ObjectLiteral){var m=this._tokens.peek();m.text===":"&&(a.type=_.WORD)}}if(this.start_of_statement(a)?y(this._flags.last_token,["var","let","const"])&&a.type===_.WORD&&(this._flags.declaration_statement=!0):a.newlines&&!S(this._flags.mode)&&(this._flags.last_token.type!==_.OPERATOR||this._flags.last_token.text==="--"||this._flags.last_token.text==="++")&&this._flags.last_token.type!==_.EQUALS&&(this._options.preserve_newlines||!y(this._flags.last_token,["var","let","const","set","get"]))?(this.handle_whitespace_and_comments(a),this.print_newline()):this.handle_whitespace_and_comments(a),this._flags.do_block&&!this._flags.do_while)if(g(a,"while")){this._output.space_before_token=!0,this.print_token(a),this._output.space_before_token=!0,this._flags.do_while=!0;return}else this.print_newline(),this._flags.do_block=!1;if(this._flags.if_block)if(!this._flags.else_block&&g(a,"else"))this._flags.else_block=!0;else{for(;this._flags.mode===r.Statement;)this.restore_mode();this._flags.if_block=!1,this._flags.else_block=!1}if(this._flags.in_case_statement&&y(a,["case","default"])){this.print_newline(),!this._flags.case_block&&(this._flags.case_body||this._options.jslint_happy)&&this.deindent(),this._flags.case_body=!1,this.print_token(a),this._flags.in_case=!0;return}if((this._flags.last_token.type===_.COMMA||this._flags.last_token.type===_.START_EXPR||this._flags.last_token.type===_.EQUALS||this._flags.last_token.type===_.OPERATOR)&&!this.start_of_object_property()&&!(u(this._flags.last_token.text,["+","-"])&&this._last_last_text===":"&&this._flags.parent.mode===r.ObjectLiteral)&&this.allow_wrap_or_preserved_newline(a),g(a,"function")){(u(this._flags.last_token.text,["}",";"])||this._output.just_added_newline()&&!(u(this._flags.last_token.text,["(","[","{",":","=",","])||this._flags.last_token.type===_.OPERATOR))&&!this._output.just_added_blankline()&&!a.comments_before&&(this.print_newline(),this.print_newline(!0)),this._flags.last_token.type===_.RESERVED||this._flags.last_token.type===_.WORD?y(this._flags.last_token,["get","set","new","export"])||y(this._flags.last_token,E)?this._output.space_before_token=!0:g(this._flags.last_token,"default")&&this._last_last_text==="export"?this._output.space_before_token=!0:this._flags.last_token.text==="declare"?this._output.space_before_token=!0:this.print_newline():this._flags.last_token.type===_.OPERATOR||this._flags.last_token.text==="="?this._output.space_before_token=!0:!this._flags.multiline_frame&&(S(this._flags.mode)||w(this._flags.mode))||this.print_newline(),this.print_token(a),this._flags.last_word=a.text;return}var P="NONE";if(this._flags.last_token.type===_.END_BLOCK?this._previous_flags.inline_frame?P="SPACE":y(a,["else","catch","finally","from"])?this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&a.newlines?P="NEWLINE":(P="SPACE",this._output.space_before_token=!0):P="NEWLINE":this._flags.last_token.type===_.SEMICOLON&&this._flags.mode===r.BlockStatement?P="NEWLINE":this._flags.last_token.type===_.SEMICOLON&&S(this._flags.mode)?P="SPACE":this._flags.last_token.type===_.STRING?P="NEWLINE":this._flags.last_token.type===_.RESERVED||this._flags.last_token.type===_.WORD||this._flags.last_token.text==="*"&&(u(this._last_last_text,["function","yield"])||this._flags.mode===r.ObjectLiteral&&u(this._last_last_text,["{",","]))?P="SPACE":this._flags.last_token.type===_.START_BLOCK?this._flags.inline_frame?P="SPACE":P="NEWLINE":this._flags.last_token.type===_.END_EXPR&&(this._output.space_before_token=!0,P="NEWLINE"),y(a,l)&&this._flags.last_token.text!==")"&&(this._flags.inline_frame||this._flags.last_token.text==="else"||this._flags.last_token.text==="export"?P="SPACE":P="NEWLINE"),y(a,["else","catch","finally"]))if((!(this._flags.last_token.type===_.END_BLOCK&&this._previous_flags.mode===r.BlockStatement)||this._options.brace_style==="expand"||this._options.brace_style==="end-expand"||this._options.brace_style==="none"&&a.newlines)&&!this._flags.inline_frame)this.print_newline();else{this._output.trim(!0);var I=this._output.current_line;I.last()!=="}"&&this.print_newline(),this._output.space_before_token=!0}else P==="NEWLINE"?y(this._flags.last_token,x)?this._output.space_before_token=!0:this._flags.last_token.text==="declare"&&y(a,["var","let","const"])?this._output.space_before_token=!0:this._flags.last_token.type!==_.END_EXPR?(this._flags.last_token.type!==_.START_EXPR||!y(a,["var","let","const"]))&&this._flags.last_token.text!==":"&&(g(a,"if")&&g(a.previous,"else")?this._output.space_before_token=!0:this.print_newline()):y(a,l)&&this._flags.last_token.text!==")"&&this.print_newline():this._flags.multiline_frame&&w(this._flags.mode)&&this._flags.last_token.text===","&&this._last_last_text==="}"?this.print_newline():P==="SPACE"&&(this._output.space_before_token=!0);a.previous&&(a.previous.type===_.WORD||a.previous.type===_.RESERVED)&&(this._output.space_before_token=!0),this.print_token(a),this._flags.last_word=a.text,a.type===_.RESERVED&&(a.text==="do"?this._flags.do_block=!0:a.text==="if"?this._flags.if_block=!0:a.text==="import"?this._flags.import_block=!0:this._flags.import_block&&g(a,"from")&&(this._flags.import_block=!1))},f.prototype.handle_semicolon=function(a){this.start_of_statement(a)?this._output.space_before_token=!1:this.handle_whitespace_and_comments(a);for(var m=this._tokens.peek();this._flags.mode===r.Statement&&!(this._flags.if_block&&g(m,"else"))&&!this._flags.do_block;)this.restore_mode();this._flags.import_block&&(this._flags.import_block=!1),this.print_token(a)},f.prototype.handle_string=function(a){a.text.startsWith("`")&&a.newlines===0&&a.whitespace_before===""&&(a.previous.text===")"||this._flags.last_token.type===_.WORD)||(this.start_of_statement(a)?this._output.space_before_token=!0:(this.handle_whitespace_and_comments(a),this._flags.last_token.type===_.RESERVED||this._flags.last_token.type===_.WORD||this._flags.inline_frame?this._output.space_before_token=!0:this._flags.last_token.type===_.COMMA||this._flags.last_token.type===_.START_EXPR||this._flags.last_token.type===_.EQUALS||this._flags.last_token.type===_.OPERATOR?this.start_of_object_property()||this.allow_wrap_or_preserved_newline(a):a.text.startsWith("`")&&this._flags.last_token.type===_.END_EXPR&&(a.previous.text==="]"||a.previous.text===")")&&a.newlines===0?this._output.space_before_token=!0:this.print_newline())),this.print_token(a)},f.prototype.handle_equals=function(a){this.start_of_statement(a)||this.handle_whitespace_and_comments(a),this._flags.declaration_statement&&(this._flags.declaration_assignment=!0),this._output.space_before_token=!0,this.print_token(a),this._output.space_before_token=!0},f.prototype.handle_comma=function(a){this.handle_whitespace_and_comments(a,!0),this.print_token(a),this._output.space_before_token=!0,this._flags.declaration_statement?(S(this._flags.parent.mode)&&(this._flags.declaration_assignment=!1),this._flags.declaration_assignment?(this._flags.declaration_assignment=!1,this.print_newline(!1,!0)):this._options.comma_first&&this.allow_wrap_or_preserved_newline(a)):this._flags.mode===r.ObjectLiteral||this._flags.mode===r.Statement&&this._flags.parent.mode===r.ObjectLiteral?(this._flags.mode===r.Statement&&this.restore_mode(),this._flags.inline_frame||this.print_newline()):this._options.comma_first&&this.allow_wrap_or_preserved_newline(a)},f.prototype.handle_operator=function(a){var m=a.text==="*"&&(y(this._flags.last_token,["function","yield"])||u(this._flags.last_token.type,[_.START_BLOCK,_.COMMA,_.END_BLOCK,_.SEMICOLON])),P=u(a.text,["-","+"])&&(u(this._flags.last_token.type,[_.START_BLOCK,_.START_EXPR,_.EQUALS,_.OPERATOR])||u(this._flags.last_token.text,l)||this._flags.last_token.text===",");if(!this.start_of_statement(a)){var I=!m;this.handle_whitespace_and_comments(a,I)}if(a.text==="*"&&this._flags.last_token.type===_.DOT){this.print_token(a);return}if(a.text==="::"){this.print_token(a);return}if(u(a.text,["-","+"])&&this.start_of_object_property()){this.print_token(a);return}if(this._flags.last_token.type===_.OPERATOR&&u(this._options.operator_position,c)&&this.allow_wrap_or_preserved_newline(a),a.text===":"&&this._flags.in_case){this.print_token(a),this._flags.in_case=!1,this._flags.case_body=!0,this._tokens.peek().type!==_.START_BLOCK?(this.indent(),this.print_newline(),this._flags.case_block=!1):(this._flags.case_block=!0,this._output.space_before_token=!0);return}var R=!0,D=!0,L=!1;if(a.text===":"?this._flags.ternary_depth===0?R=!1:(this._flags.ternary_depth-=1,L=!0):a.text==="?"&&(this._flags.ternary_depth+=1),!P&&!m&&this._options.preserve_newlines&&u(a.text,p)){var B=a.text===":",H=B&&L,J=B&&!L;switch(this._options.operator_position){case A.before_newline:this._output.space_before_token=!J,this.print_token(a),(!B||H)&&this.allow_wrap_or_preserved_newline(a),this._output.space_before_token=!0;return;case A.after_newline:this._output.space_before_token=!0,!B||H?this._tokens.peek().newlines?this.print_newline(!1,!0):this.allow_wrap_or_preserved_newline(a):this._output.space_before_token=!1,this.print_token(a),this._output.space_before_token=!0;return;case A.preserve_newline:J||this.allow_wrap_or_preserved_newline(a),R=!(this._output.just_added_newline()||J),this._output.space_before_token=R,this.print_token(a),this._output.space_before_token=!0;return}}if(m){this.allow_wrap_or_preserved_newline(a),R=!1;var G=this._tokens.peek();D=G&&u(G.type,[_.WORD,_.RESERVED])}else if(a.text==="...")this.allow_wrap_or_preserved_newline(a),R=this._flags.last_token.type===_.START_BLOCK,D=!1;else if(u(a.text,["--","++","!","~"])||P){if((this._flags.last_token.type===_.COMMA||this._flags.last_token.type===_.START_EXPR)&&this.allow_wrap_or_preserved_newline(a),R=!1,D=!1,a.newlines&&(a.text==="--"||a.text==="++"||a.text==="~")){var z=y(this._flags.last_token,x)&&a.newlines;z&&(this._previous_flags.if_block||this._previous_flags.else_block)&&this.restore_mode(),this.print_newline(z,!0)}this._flags.last_token.text===";"&&S(this._flags.mode)&&(R=!0),this._flags.last_token.type===_.RESERVED?R=!0:this._flags.last_token.type===_.END_EXPR?R=!(this._flags.last_token.text==="]"&&(a.text==="--"||a.text==="++")):this._flags.last_token.type===_.OPERATOR&&(R=u(a.text,["--","-","++","+"])&&u(this._flags.last_token.text,["--","-","++","+"]),u(a.text,["+","-"])&&u(this._flags.last_token.text,["--","++"])&&(D=!0)),(this._flags.mode===r.BlockStatement&&!this._flags.inline_frame||this._flags.mode===r.Statement)&&(this._flags.last_token.text==="{"||this._flags.last_token.text===";")&&this.print_newline()}this._output.space_before_token=this._output.space_before_token||R,this.print_token(a),this._output.space_before_token=D},f.prototype.handle_block_comment=function(a,m){if(this._output.raw){this._output.add_raw_token(a),a.directives&&a.directives.preserve==="end"&&(this._output.raw=this._options.test_output_raw);return}if(a.directives){this.print_newline(!1,m),this.print_token(a),a.directives.preserve==="start"&&(this._output.raw=!0),this.print_newline(!1,!0);return}if(!n.newline.test(a.text)&&!a.newlines){this._output.space_before_token=!0,this.print_token(a),this._output.space_before_token=!0;return}else this.print_block_commment(a,m)},f.prototype.print_block_commment=function(a,m){var P=M(a.text),I,R=!1,D=!1,L=a.whitespace_before,B=L.length;if(this.print_newline(!1,m),this.print_token_line_indentation(a),this._output.add_token(P[0]),this.print_newline(!1,m),P.length>1){for(P=P.slice(1),R=d(P,"*"),D=v(P,L),R&&(this._flags.alignment=1),I=0;I<P.length;I++)R?(this.print_token_line_indentation(a),this._output.add_token(T(P[I]))):D&&P[I]?(this.print_token_line_indentation(a),this._output.add_token(P[I].substring(B))):(this._output.current_line.set_indent(-1),this._output.add_token(P[I])),this.print_newline(!1,m);this._flags.alignment=0}},f.prototype.handle_comment=function(a,m){a.newlines?this.print_newline(!1,m):this._output.trim(!0),this._output.space_before_token=!0,this.print_token(a),this.print_newline(!1,m)},f.prototype.handle_dot=function(a){this.start_of_statement(a)||this.handle_whitespace_and_comments(a,!0),this._flags.last_token.text.match("^[0-9]+$")&&(this._output.space_before_token=!0),y(this._flags.last_token,x)?this._output.space_before_token=!1:this.allow_wrap_or_preserved_newline(a,this._flags.last_token.text===")"&&this._options.break_chained_methods),this._options.unindent_chained_methods&&this._output.just_added_newline()&&this.deindent(),this.print_token(a)},f.prototype.handle_unknown=function(a,m){this.print_token(a),a.text[a.text.length-1]===`
`&&this.print_newline(!1,m)},f.prototype.handle_eof=function(a){for(;this._flags.mode===r.Statement;)this.restore_mode();this.handle_whitespace_and_comments(a)},gt.Beautifier=f,gt}var oe;function Qe(){if(oe)return at.exports;oe=1;var i=Ve().Beautifier,t=Vt().Options;function n(e,s){var l=new i(e,s);return l.beautify()}return at.exports=n,at.exports.defaultOptions=function(){return new t},at.exports}var lt={exports:{}},Rt={},Ct={},le;function _e(){if(le)return Ct;le=1;var i=wt().Options;function t(n){i.call(this,n,"css"),this.selector_separator_newline=this._get_boolean("selector_separator_newline",!0),this.newline_between_rules=this._get_boolean("newline_between_rules",!0);var e=this._get_boolean("space_around_selector_separator");this.space_around_combinator=this._get_boolean("space_around_combinator")||e;var s=this._get_selection_list("brace_style",["collapse","expand","end-expand","none","preserve-inline"]);this.brace_style="collapse";for(var l=0;l<s.length;l++)s[l]!=="expand"?this.brace_style="collapse":this.brace_style=s[l]}return t.prototype=new i,Ct.Options=t,Ct}var ue;function Ze(){if(ue)return Rt;ue=1;var i=_e().Options,t=bt().Output,n=xt().InputScanner,e=At().Directives,s=new e(/\/\*/,/\*\//),l=/\r\n|[\r\n]/,p=/\r\n|[\r\n]/g,_=/\s/,u=/(?:\s|\n)+/g,T=/\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,b=/\/\/(?:[^\n\r\u2028\u2029]*)/g;function g(y,x){this._source_text=y||"",this._options=new i(x),this._ch=null,this._input=null,this.NESTED_AT_RULE={page:!0,"font-face":!0,keyframes:!0,media:!0,supports:!0,document:!0},this.CONDITIONAL_GROUP_RULE={media:!0,supports:!0,document:!0},this.NON_SEMICOLON_NEWLINE_PROPERTY=["grid-template-areas","grid-template"]}return g.prototype.eatString=function(y){var x="";for(this._ch=this._input.next();this._ch;){if(x+=this._ch,this._ch==="\\")x+=this._input.next();else if(y.indexOf(this._ch)!==-1||this._ch===`
`)break;this._ch=this._input.next()}return x},g.prototype.eatWhitespace=function(y){for(var x=_.test(this._input.peek()),O=0;_.test(this._input.peek());)this._ch=this._input.next(),y&&this._ch===`
`&&(O===0||O<this._options.max_preserve_newlines)&&(O++,this._output.add_new_line(!0));return x},g.prototype.foundNestedPseudoClass=function(){for(var y=0,x=1,O=this._input.peek(x);O;){if(O==="{")return!0;if(O==="(")y+=1;else if(O===")"){if(y===0)return!1;y-=1}else if(O===";"||O==="}")return!1;x++,O=this._input.peek(x)}return!1},g.prototype.print_string=function(y){this._output.set_indent(this._indentLevel),this._output.non_breaking_space=!0,this._output.add_token(y)},g.prototype.preserveSingleSpace=function(y){y&&(this._output.space_before_token=!0)},g.prototype.indent=function(){this._indentLevel++},g.prototype.outdent=function(){this._indentLevel>0&&this._indentLevel--},g.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var y=this._source_text,x=this._options.eol;x==="auto"&&(x=`
`,y&&l.test(y||"")&&(x=y.match(l)[0])),y=y.replace(p,`
`);var O=y.match(/^[\t ]*/)[0];this._output=new t(this._options,O),this._input=new n(y),this._indentLevel=0,this._nestedLevel=0,this._ch=null;for(var A=0,c=!1,r=!1,h=!1,M=!1,w=!1,S=this._ch,d=!1,v,f,E;v=this._input.read(u),f=v!=="",E=S,this._ch=this._input.next(),this._ch==="\\"&&this._input.hasNext()&&(this._ch+=this._input.next()),S=this._ch,this._ch;)if(this._ch==="/"&&this._input.peek()==="*"){this._output.add_new_line(),this._input.back();var a=this._input.read(T),m=s.get_directives(a);m&&m.ignore==="start"&&(a+=s.readIgnored(this._input)),this.print_string(a),this.eatWhitespace(!0),this._output.add_new_line()}else if(this._ch==="/"&&this._input.peek()==="/")this._output.space_before_token=!0,this._input.back(),this.print_string(this._input.read(b)),this.eatWhitespace(!0);else if(this._ch==="$"){this.preserveSingleSpace(f),this.print_string(this._ch);var P=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);P.match(/[ :]$/)&&(P=this.eatString(": ").replace(/\s+$/,""),this.print_string(P),this._output.space_before_token=!0),A===0&&P.indexOf(":")!==-1&&(r=!0,this.indent())}else if(this._ch==="@")if(this.preserveSingleSpace(f),this._input.peek()==="{")this.print_string(this._ch+this.eatString("}"));else{this.print_string(this._ch);var I=this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);I.match(/[ :]$/)&&(I=this.eatString(": ").replace(/\s+$/,""),this.print_string(I),this._output.space_before_token=!0),A===0&&I.indexOf(":")!==-1?(r=!0,this.indent()):I in this.NESTED_AT_RULE?(this._nestedLevel+=1,I in this.CONDITIONAL_GROUP_RULE&&(h=!0)):A===0&&!r&&(M=!0)}else if(this._ch==="#"&&this._input.peek()==="{")this.preserveSingleSpace(f),this.print_string(this._ch+this.eatString("}"));else if(this._ch==="{")r&&(r=!1,this.outdent()),M=!1,h?(h=!1,c=this._indentLevel>=this._nestedLevel):c=this._indentLevel>=this._nestedLevel-1,this._options.newline_between_rules&&c&&this._output.previous_line&&this._output.previous_line.item(-1)!=="{"&&this._output.ensure_empty_line_above("/",","),this._output.space_before_token=!0,this._options.brace_style==="expand"?(this._output.add_new_line(),this.print_string(this._ch),this.indent(),this._output.set_indent(this._indentLevel)):(E==="("?this._output.space_before_token=!1:E!==","&&this.indent(),this.print_string(this._ch)),this.eatWhitespace(!0),this._output.add_new_line();else if(this._ch==="}")this.outdent(),this._output.add_new_line(),E==="{"&&this._output.trim(!0),r&&(this.outdent(),r=!1),this.print_string(this._ch),c=!1,this._nestedLevel&&this._nestedLevel--,this.eatWhitespace(!0),this._output.add_new_line(),this._options.newline_between_rules&&!this._output.just_added_blankline()&&this._input.peek()!=="}"&&this._output.add_new_line(!0),this._input.peek()===")"&&(this._output.trim(!0),this._options.brace_style==="expand"&&this._output.add_new_line(!0));else if(this._ch===":"){for(var R=0;R<this.NON_SEMICOLON_NEWLINE_PROPERTY.length;R++)if(this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[R])){d=!0;break}(c||h)&&!(this._input.lookBack("&")||this.foundNestedPseudoClass())&&!this._input.lookBack("(")&&!M&&A===0?(this.print_string(":"),r||(r=!0,this._output.space_before_token=!0,this.eatWhitespace(!0),this.indent())):(this._input.lookBack(" ")&&(this._output.space_before_token=!0),this._input.peek()===":"?(this._ch=this._input.next(),this.print_string("::")):this.print_string(":"))}else if(this._ch==='"'||this._ch==="'"){var D=E==='"'||E==="'";this.preserveSingleSpace(D||f),this.print_string(this._ch+this.eatString(this._ch)),this.eatWhitespace(!0)}else if(this._ch===";")d=!1,A===0?(r&&(this.outdent(),r=!1),M=!1,this.print_string(this._ch),this.eatWhitespace(!0),this._input.peek()!=="/"&&this._output.add_new_line()):(this.print_string(this._ch),this.eatWhitespace(!0),this._output.space_before_token=!0);else if(this._ch==="(")if(this._input.lookBack("url"))this.print_string(this._ch),this.eatWhitespace(),A++,this.indent(),this._ch=this._input.next(),this._ch===")"||this._ch==='"'||this._ch==="'"?this._input.back():this._ch&&(this.print_string(this._ch+this.eatString(")")),A&&(A--,this.outdent()));else{var L=!1;this._input.lookBack("with")&&(L=!0),this.preserveSingleSpace(f||L),this.print_string(this._ch),r&&E==="$"&&this._options.selector_separator_newline?(this._output.add_new_line(),w=!0):(this.eatWhitespace(),A++,this.indent())}else if(this._ch===")")A&&(A--,this.outdent()),w&&this._input.peek()===";"&&this._options.selector_separator_newline&&(w=!1,this.outdent(),this._output.add_new_line()),this.print_string(this._ch);else if(this._ch===",")this.print_string(this._ch),this.eatWhitespace(!0),this._options.selector_separator_newline&&(!r||w)&&A===0&&!M?this._output.add_new_line():this._output.space_before_token=!0;else if((this._ch===">"||this._ch==="+"||this._ch==="~")&&!r&&A===0)this._options.space_around_combinator?(this._output.space_before_token=!0,this.print_string(this._ch),this._output.space_before_token=!0):(this.print_string(this._ch),this.eatWhitespace(),this._ch&&_.test(this._ch)&&(this._ch=""));else if(this._ch==="]")this.print_string(this._ch);else if(this._ch==="[")this.preserveSingleSpace(f),this.print_string(this._ch);else if(this._ch==="=")this.eatWhitespace(),this.print_string("="),_.test(this._ch)&&(this._ch="");else if(this._ch==="!"&&!this._input.lookBack("\\"))this._output.space_before_token=!0,this.print_string(this._ch);else{var B=E==='"'||E==="'";this.preserveSingleSpace(B||f),this.print_string(this._ch),!this._output.just_added_newline()&&this._input.peek()===`
`&&d&&this._output.add_new_line()}var H=this._output.get_code(x);return H},Rt.Beautifier=g,Rt}var ce;function Je(){if(ce)return lt.exports;ce=1;var i=Ze().Beautifier,t=_e().Options;function n(e,s){var l=new i(e,s);return l.beautify()}return lt.exports=n,lt.exports.defaultOptions=function(){return new t},lt.exports}var _t={exports:{}},kt={},Dt={},pe;function he(){if(pe)return Dt;pe=1;var i=wt().Options;function t(n){i.call(this,n,"html"),this.templating.length===1&&this.templating[0]==="auto"&&(this.templating=["django","erb","handlebars","php"]),this.indent_inner_html=this._get_boolean("indent_inner_html"),this.indent_body_inner_html=this._get_boolean("indent_body_inner_html",!0),this.indent_head_inner_html=this._get_boolean("indent_head_inner_html",!0),this.indent_handlebars=this._get_boolean("indent_handlebars",!0),this.wrap_attributes=this._get_selection("wrap_attributes",["auto","force","force-aligned","force-expand-multiline","aligned-multiple","preserve","preserve-aligned"]),this.wrap_attributes_min_attrs=this._get_number("wrap_attributes_min_attrs",2),this.wrap_attributes_indent_size=this._get_number("wrap_attributes_indent_size",this.indent_size),this.extra_liners=this._get_array("extra_liners",["head","body","/html"]),this.inline=this._get_array("inline",["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","big","strike","tt"]),this.inline_custom_elements=this._get_boolean("inline_custom_elements",!0),this.void_elements=this._get_array("void_elements",["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","basefont","isindex"]),this.unformatted=this._get_array("unformatted",[]),this.content_unformatted=this._get_array("content_unformatted",["pre","textarea"]),this.unformatted_content_delimiter=this._get_characters("unformatted_content_delimiter"),this.indent_scripts=this._get_selection("indent_scripts",["normal","keep","separate"])}return t.prototype=new i,Dt.Options=t,Dt}var ut={},fe;function de(){if(fe)return ut;fe=1;var i=rt().Tokenizer,t=rt().TOKEN,n=At().Directives,e=se().TemplatablePattern,s=nt().Pattern,l={TAG_OPEN:"TK_TAG_OPEN",TAG_CLOSE:"TK_TAG_CLOSE",CONTROL_FLOW_OPEN:"TK_CONTROL_FLOW_OPEN",CONTROL_FLOW_CLOSE:"TK_CONTROL_FLOW_CLOSE",ATTRIBUTE:"TK_ATTRIBUTE",EQUALS:"TK_EQUALS",VALUE:"TK_VALUE",COMMENT:"TK_COMMENT",TEXT:"TK_TEXT",UNKNOWN:"TK_UNKNOWN",START:t.START,RAW:t.RAW,EOF:t.EOF},p=new n(/<\!--/,/-->/),_=function(u,T){i.call(this,u,T),this._current_tag_name="";var b=new e(this._input).read_options(this._options),g=new s(this._input);if(this.__patterns={word:b.until(/[\n\r\t <]/),word_control_flow_close_excluded:b.until(/[\n\r\t <}]/),single_quote:b.until_after(/'/),double_quote:b.until_after(/"/),attribute:b.until(/[\n\r\t =>]|\/>/),element_name:b.until(/[\n\r\t >\/]/),angular_control_flow_start:g.matching(/\@[a-zA-Z]+[^({]*[({]/),handlebars_comment:g.starting_with(/{{!--/).until_after(/--}}/),handlebars:g.starting_with(/{{/).until_after(/}}/),handlebars_open:g.until(/[\n\r\t }]/),handlebars_raw_close:g.until(/}}/),comment:g.starting_with(/<!--/).until_after(/-->/),cdata:g.starting_with(/<!\[CDATA\[/).until_after(/]]>/),conditional_comment:g.starting_with(/<!\[/).until_after(/]>/),processing:g.starting_with(/<\?/).until_after(/\?>/)},this._options.indent_handlebars&&(this.__patterns.word=this.__patterns.word.exclude("handlebars"),this.__patterns.word_control_flow_close_excluded=this.__patterns.word_control_flow_close_excluded.exclude("handlebars")),this._unformatted_content_delimiter=null,this._options.unformatted_content_delimiter){var y=this._input.get_literal_regexp(this._options.unformatted_content_delimiter);this.__patterns.unformatted_content_delimiter=g.matching(y).until_after(y)}};return _.prototype=new i,_.prototype._is_comment=function(u){return!1},_.prototype._is_opening=function(u){return u.type===l.TAG_OPEN||u.type===l.CONTROL_FLOW_OPEN},_.prototype._is_closing=function(u,T){return u.type===l.TAG_CLOSE&&T&&((u.text===">"||u.text==="/>")&&T.text[0]==="<"||u.text==="}}"&&T.text[0]==="{"&&T.text[1]==="{")||u.type===l.CONTROL_FLOW_CLOSE&&u.text==="}"&&T.text.endsWith("{")},_.prototype._reset=function(){this._current_tag_name=""},_.prototype._get_next_token=function(u,T){var b=null;this._readWhitespace();var g=this._input.peek();return g===null?this._create_token(l.EOF,""):(b=b||this._read_open_handlebars(g,T),b=b||this._read_attribute(g,u,T),b=b||this._read_close(g,T),b=b||this._read_script_and_style(g,u),b=b||this._read_control_flows(g,T),b=b||this._read_raw_content(g,u,T),b=b||this._read_content_word(g,T),b=b||this._read_comment_or_cdata(g),b=b||this._read_processing(g),b=b||this._read_open(g,T),b=b||this._create_token(l.UNKNOWN,this._input.next()),b)},_.prototype._read_comment_or_cdata=function(u){var T=null,b=null,g=null;if(u==="<"){var y=this._input.peek(1);y==="!"&&(b=this.__patterns.comment.read(),b?(g=p.get_directives(b),g&&g.ignore==="start"&&(b+=p.readIgnored(this._input))):b=this.__patterns.cdata.read()),b&&(T=this._create_token(l.COMMENT,b),T.directives=g)}return T},_.prototype._read_processing=function(u){var T=null,b=null,g=null;if(u==="<"){var y=this._input.peek(1);(y==="!"||y==="?")&&(b=this.__patterns.conditional_comment.read(),b=b||this.__patterns.processing.read()),b&&(T=this._create_token(l.COMMENT,b),T.directives=g)}return T},_.prototype._read_open=function(u,T){var b=null,g=null;return(!T||T.type===l.CONTROL_FLOW_OPEN)&&u==="<"&&(b=this._input.next(),this._input.peek()==="/"&&(b+=this._input.next()),b+=this.__patterns.element_name.read(),g=this._create_token(l.TAG_OPEN,b)),g},_.prototype._read_open_handlebars=function(u,T){var b=null,g=null;return(!T||T.type===l.CONTROL_FLOW_OPEN)&&(this._options.templating.includes("angular")||this._options.indent_handlebars)&&u==="{"&&this._input.peek(1)==="{"&&(this._options.indent_handlebars&&this._input.peek(2)==="!"?(b=this.__patterns.handlebars_comment.read(),b=b||this.__patterns.handlebars.read(),g=this._create_token(l.COMMENT,b)):(b=this.__patterns.handlebars_open.read(),g=this._create_token(l.TAG_OPEN,b))),g},_.prototype._read_control_flows=function(u,T){var b="",g=null;if(!this._options.templating.includes("angular"))return g;if(u==="@"){if(b=this.__patterns.angular_control_flow_start.read(),b==="")return g;for(var y=b.endsWith("(")?1:0,x=0;!(b.endsWith("{")&&y===x);){var O=this._input.next();if(O===null)break;O==="("?y++:O===")"&&x++,b+=O}g=this._create_token(l.CONTROL_FLOW_OPEN,b)}else u==="}"&&T&&T.type===l.CONTROL_FLOW_OPEN&&(b=this._input.next(),g=this._create_token(l.CONTROL_FLOW_CLOSE,b));return g},_.prototype._read_close=function(u,T){var b=null,g=null;return T&&T.type===l.TAG_OPEN&&(T.text[0]==="<"&&(u===">"||u==="/"&&this._input.peek(1)===">")?(b=this._input.next(),u==="/"&&(b+=this._input.next()),g=this._create_token(l.TAG_CLOSE,b)):T.text[0]==="{"&&u==="}"&&this._input.peek(1)==="}"&&(this._input.next(),this._input.next(),g=this._create_token(l.TAG_CLOSE,"}}"))),g},_.prototype._read_attribute=function(u,T,b){var g=null,y="";if(b&&b.text[0]==="<")if(u==="=")g=this._create_token(l.EQUALS,this._input.next());else if(u==='"'||u==="'"){var x=this._input.next();u==='"'?x+=this.__patterns.double_quote.read():x+=this.__patterns.single_quote.read(),g=this._create_token(l.VALUE,x)}else y=this.__patterns.attribute.read(),y&&(T.type===l.EQUALS?g=this._create_token(l.VALUE,y):g=this._create_token(l.ATTRIBUTE,y));return g},_.prototype._is_content_unformatted=function(u){return this._options.void_elements.indexOf(u)===-1&&(this._options.content_unformatted.indexOf(u)!==-1||this._options.unformatted.indexOf(u)!==-1)},_.prototype._read_raw_content=function(u,T,b){var g="";if(b&&b.text[0]==="{")g=this.__patterns.handlebars_raw_close.read();else if(T.type===l.TAG_CLOSE&&T.opened.text[0]==="<"&&T.text[0]!=="/"){var y=T.opened.text.substr(1).toLowerCase();this._is_content_unformatted(y)&&(g=this._input.readUntil(new RegExp("</"+y+"[\\n\\r\\t ]*?>","ig")))}return g?this._create_token(l.TEXT,g):null},_.prototype._read_script_and_style=function(u,T){if(T.type===l.TAG_CLOSE&&T.opened.text[0]==="<"&&T.text[0]!=="/"){var b=T.opened.text.substr(1).toLowerCase();if(b==="script"||b==="style"){var g=this._read_comment_or_cdata(u);if(g)return g.type=l.TEXT,g;var y=this._input.readUntil(new RegExp("</"+b+"[\\n\\r\\t ]*?>","ig"));if(y)return this._create_token(l.TEXT,y)}}return null},_.prototype._read_content_word=function(u,T){var b="";return this._options.unformatted_content_delimiter&&u===this._options.unformatted_content_delimiter[0]&&(b=this.__patterns.unformatted_content_delimiter.read()),b||(b=T&&T.type===l.CONTROL_FLOW_OPEN?this.__patterns.word_control_flow_close_excluded.read():this.__patterns.word.read()),b?this._create_token(l.TEXT,b):null},ut.Tokenizer=_,ut.TOKEN=l,ut}var ge;function ti(){if(ge)return kt;ge=1;var i=he().Options,t=bt().Output,n=de().Tokenizer,e=de().TOKEN,s=/\r\n|[\r\n]/,l=/\r\n|[\r\n]/g,p=function(c,r){this.indent_level=0,this.alignment_size=0,this.max_preserve_newlines=c.max_preserve_newlines,this.preserve_newlines=c.preserve_newlines,this._output=new t(c,r)};p.prototype.current_line_has_match=function(c){return this._output.current_line.has_match(c)},p.prototype.set_space_before_token=function(c,r){this._output.space_before_token=c,this._output.non_breaking_space=r},p.prototype.set_wrap_point=function(){this._output.set_indent(this.indent_level,this.alignment_size),this._output.set_wrap_point()},p.prototype.add_raw_token=function(c){this._output.add_raw_token(c)},p.prototype.print_preserved_newlines=function(c){var r=0;c.type!==e.TEXT&&c.previous.type!==e.TEXT&&(r=c.newlines?1:0),this.preserve_newlines&&(r=c.newlines<this.max_preserve_newlines+1?c.newlines:this.max_preserve_newlines+1);for(var h=0;h<r;h++)this.print_newline(h>0);return r!==0},p.prototype.traverse_whitespace=function(c){return c.whitespace_before||c.newlines?(this.print_preserved_newlines(c)||(this._output.space_before_token=!0),!0):!1},p.prototype.previous_token_wrapped=function(){return this._output.previous_token_wrapped},p.prototype.print_newline=function(c){this._output.add_new_line(c)},p.prototype.print_token=function(c){c.text&&(this._output.set_indent(this.indent_level,this.alignment_size),this._output.add_token(c.text))},p.prototype.indent=function(){this.indent_level++},p.prototype.deindent=function(){this.indent_level>0&&(this.indent_level--,this._output.set_indent(this.indent_level,this.alignment_size))},p.prototype.get_full_indent=function(c){return c=this.indent_level+(c||0),c<1?"":this._output.get_indent_string(c)};var _=function(c){for(var r=null,h=c.next;h.type!==e.EOF&&c.closed!==h;){if(h.type===e.ATTRIBUTE&&h.text==="type"){h.next&&h.next.type===e.EQUALS&&h.next.next&&h.next.next.type===e.VALUE&&(r=h.next.next.text);break}h=h.next}return r},u=function(c,r){var h=null,M=null;return r.closed?(c==="script"?h="text/javascript":c==="style"&&(h="text/css"),h=_(r)||h,h.search("text/css")>-1?M="css":h.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/)>-1?M="javascript":h.search(/(text|application|dojo)\/(x-)?(html)/)>-1?M="html":h.search(/test\/null/)>-1&&(M="null"),M):null};function T(c,r){return r.indexOf(c)!==-1}function b(c,r,h){this.parent=c||null,this.tag=r?r.tag_name:"",this.indent_level=h||0,this.parser_token=r||null}function g(c){this._printer=c,this._current_frame=null}g.prototype.get_parser_token=function(){return this._current_frame?this._current_frame.parser_token:null},g.prototype.record_tag=function(c){var r=new b(this._current_frame,c,this._printer.indent_level);this._current_frame=r},g.prototype._try_pop_frame=function(c){var r=null;return c&&(r=c.parser_token,this._printer.indent_level=c.indent_level,this._current_frame=c.parent),r},g.prototype._get_frame=function(c,r){for(var h=this._current_frame;h&&c.indexOf(h.tag)===-1;){if(r&&r.indexOf(h.tag)!==-1){h=null;break}h=h.parent}return h},g.prototype.try_pop=function(c,r){var h=this._get_frame([c],r);return this._try_pop_frame(h)},g.prototype.indent_to_tag=function(c){var r=this._get_frame(c);r&&(this._printer.indent_level=r.indent_level)};function y(c,r,h,M){this._source_text=c||"",r=r||{},this._js_beautify=h,this._css_beautify=M,this._tag_stack=null;var w=new i(r,"html");this._options=w,this._is_wrap_attributes_force=this._options.wrap_attributes.substr(0,5)==="force",this._is_wrap_attributes_force_expand_multiline=this._options.wrap_attributes==="force-expand-multiline",this._is_wrap_attributes_force_aligned=this._options.wrap_attributes==="force-aligned",this._is_wrap_attributes_aligned_multiple=this._options.wrap_attributes==="aligned-multiple",this._is_wrap_attributes_preserve=this._options.wrap_attributes.substr(0,8)==="preserve",this._is_wrap_attributes_preserve_aligned=this._options.wrap_attributes==="preserve-aligned"}y.prototype.beautify=function(){if(this._options.disabled)return this._source_text;var c=this._source_text,r=this._options.eol;this._options.eol==="auto"&&(r=`
`,c&&s.test(c)&&(r=c.match(s)[0])),c=c.replace(l,`
`);var h=c.match(/^[\t ]*/)[0],M={text:"",type:""},w=new x(this._options),S=new p(this._options,h),d=new n(c,this._options).tokenize();this._tag_stack=new g(S);for(var v=null,f=d.next();f.type!==e.EOF;)f.type===e.TAG_OPEN||f.type===e.COMMENT?(v=this._handle_tag_open(S,f,w,M,d),w=v):f.type===e.ATTRIBUTE||f.type===e.EQUALS||f.type===e.VALUE||f.type===e.TEXT&&!w.tag_complete?v=this._handle_inside_tag(S,f,w,M):f.type===e.TAG_CLOSE?v=this._handle_tag_close(S,f,w):f.type===e.TEXT?v=this._handle_text(S,f,w):f.type===e.CONTROL_FLOW_OPEN?v=this._handle_control_flow_open(S,f):f.type===e.CONTROL_FLOW_CLOSE?v=this._handle_control_flow_close(S,f):S.add_raw_token(f),M=v,f=d.next();var E=S._output.get_code(r);return E},y.prototype._handle_control_flow_open=function(c,r){var h={text:r.text,type:r.type};return c.set_space_before_token(r.newlines||r.whitespace_before!=="",!0),r.newlines?c.print_preserved_newlines(r):c.set_space_before_token(r.newlines||r.whitespace_before!=="",!0),c.print_token(r),c.indent(),h},y.prototype._handle_control_flow_close=function(c,r){var h={text:r.text,type:r.type};return c.deindent(),r.newlines?c.print_preserved_newlines(r):c.set_space_before_token(r.newlines||r.whitespace_before!=="",!0),c.print_token(r),h},y.prototype._handle_tag_close=function(c,r,h){var M={text:r.text,type:r.type};return c.alignment_size=0,h.tag_complete=!0,c.set_space_before_token(r.newlines||r.whitespace_before!=="",!0),h.is_unformatted?c.add_raw_token(r):(h.tag_start_char==="<"&&(c.set_space_before_token(r.text[0]==="/",!0),this._is_wrap_attributes_force_expand_multiline&&h.has_wrapped_attrs&&c.print_newline(!1)),c.print_token(r)),h.indent_content&&!(h.is_unformatted||h.is_content_unformatted)&&(c.indent(),h.indent_content=!1),!h.is_inline_element&&!(h.is_unformatted||h.is_content_unformatted)&&c.set_wrap_point(),M},y.prototype._handle_inside_tag=function(c,r,h,M){var w=h.has_wrapped_attrs,S={text:r.text,type:r.type};return c.set_space_before_token(r.newlines||r.whitespace_before!=="",!0),h.is_unformatted?c.add_raw_token(r):h.tag_start_char==="{"&&r.type===e.TEXT?c.print_preserved_newlines(r)?(r.newlines=0,c.add_raw_token(r)):c.print_token(r):(r.type===e.ATTRIBUTE?c.set_space_before_token(!0):(r.type===e.EQUALS||r.type===e.VALUE&&r.previous.type===e.EQUALS)&&c.set_space_before_token(!1),r.type===e.ATTRIBUTE&&h.tag_start_char==="<"&&((this._is_wrap_attributes_preserve||this._is_wrap_attributes_preserve_aligned)&&(c.traverse_whitespace(r),w=w||r.newlines!==0),this._is_wrap_attributes_force&&h.attr_count>=this._options.wrap_attributes_min_attrs&&(M.type!==e.TAG_OPEN||this._is_wrap_attributes_force_expand_multiline)&&(c.print_newline(!1),w=!0)),c.print_token(r),w=w||c.previous_token_wrapped(),h.has_wrapped_attrs=w),S},y.prototype._handle_text=function(c,r,h){var M={text:r.text,type:"TK_CONTENT"};return h.custom_beautifier_name?this._print_custom_beatifier_text(c,r,h):h.is_unformatted||h.is_content_unformatted?c.add_raw_token(r):(c.traverse_whitespace(r),c.print_token(r)),M},y.prototype._print_custom_beatifier_text=function(c,r,h){var M=this;if(r.text!==""){var w=r.text,S,d=1,v="",f="";h.custom_beautifier_name==="javascript"&&typeof this._js_beautify=="function"?S=this._js_beautify:h.custom_beautifier_name==="css"&&typeof this._css_beautify=="function"?S=this._css_beautify:h.custom_beautifier_name==="html"&&(S=function(R,D){var L=new y(R,D,M._js_beautify,M._css_beautify);return L.beautify()}),this._options.indent_scripts==="keep"?d=0:this._options.indent_scripts==="separate"&&(d=-c.indent_level);var E=c.get_full_indent(d);if(w=w.replace(/\n[ \t]*$/,""),h.custom_beautifier_name!=="html"&&w[0]==="<"&&w.match(/^(<!--|<!\[CDATA\[)/)){var a=/^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(w);if(!a){c.add_raw_token(r);return}v=E+a[1]+`
`,w=a[4],a[5]&&(f=E+a[5]),w=w.replace(/\n[ \t]*$/,""),(a[2]||a[3].indexOf(`
`)!==-1)&&(a=a[3].match(/[ \t]+$/),a&&(r.whitespace_before=a[0]))}if(w)if(S){var m=function(){this.eol=`
`};m.prototype=this._options.raw_options;var P=new m;w=S(E+w,P)}else{var I=r.whitespace_before;I&&(w=w.replace(new RegExp(`
(`+I+")?","g"),`
`)),w=E+w.replace(/\n/g,`
`+E)}v&&(w?w=v+w+`
`+f:w=v+f),c.print_newline(!1),w&&(r.text=w,r.whitespace_before="",r.newlines=0,c.add_raw_token(r),c.print_newline(!0))}},y.prototype._handle_tag_open=function(c,r,h,M,w){var S=this._get_tag_open_token(r);if((h.is_unformatted||h.is_content_unformatted)&&!h.is_empty_element&&r.type===e.TAG_OPEN&&!S.is_start_tag?(c.add_raw_token(r),S.start_tag_token=this._tag_stack.try_pop(S.tag_name)):(c.traverse_whitespace(r),this._set_tag_position(c,r,S,h,M),S.is_inline_element||c.set_wrap_point(),c.print_token(r)),S.is_start_tag&&this._is_wrap_attributes_force){var d=0,v;do v=w.peek(d),v.type===e.ATTRIBUTE&&(S.attr_count+=1),d+=1;while(v.type!==e.EOF&&v.type!==e.TAG_CLOSE)}return(this._is_wrap_attributes_force_aligned||this._is_wrap_attributes_aligned_multiple||this._is_wrap_attributes_preserve_aligned)&&(S.alignment_size=r.text.length+1),!S.tag_complete&&!S.is_unformatted&&(c.alignment_size=S.alignment_size),S};var x=function(c,r,h){if(this.parent=r||null,this.text="",this.type="TK_TAG_OPEN",this.tag_name="",this.is_inline_element=!1,this.is_unformatted=!1,this.is_content_unformatted=!1,this.is_empty_element=!1,this.is_start_tag=!1,this.is_end_tag=!1,this.indent_content=!1,this.multiline_content=!1,this.custom_beautifier_name=null,this.start_tag_token=null,this.attr_count=0,this.has_wrapped_attrs=!1,this.alignment_size=0,this.tag_complete=!1,this.tag_start_char="",this.tag_check="",!h)this.tag_complete=!0;else{var M;this.tag_start_char=h.text[0],this.text=h.text,this.tag_start_char==="<"?(M=h.text.match(/^<([^\s>]*)/),this.tag_check=M?M[1]:""):(M=h.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/),this.tag_check=M?M[1]:"",(h.text.startsWith("{{#>")||h.text.startsWith("{{~#>"))&&this.tag_check[0]===">"&&(this.tag_check===">"&&h.next!==null?this.tag_check=h.next.text.split(" ")[0]:this.tag_check=h.text.split(">")[1])),this.tag_check=this.tag_check.toLowerCase(),h.type===e.COMMENT&&(this.tag_complete=!0),this.is_start_tag=this.tag_check.charAt(0)!=="/",this.tag_name=this.is_start_tag?this.tag_check:this.tag_check.substr(1),this.is_end_tag=!this.is_start_tag||h.closed&&h.closed.text==="/>";var w=2;this.tag_start_char==="{"&&this.text.length>=3&&this.text.charAt(2)==="~"&&(w=3),this.is_end_tag=this.is_end_tag||this.tag_start_char==="{"&&(!c.indent_handlebars||this.text.length<3||/[^#\^]/.test(this.text.charAt(w)))}};y.prototype._get_tag_open_token=function(c){var r=new x(this._options,this._tag_stack.get_parser_token(),c);return r.alignment_size=this._options.wrap_attributes_indent_size,r.is_end_tag=r.is_end_tag||T(r.tag_check,this._options.void_elements),r.is_empty_element=r.tag_complete||r.is_start_tag&&r.is_end_tag,r.is_unformatted=!r.tag_complete&&T(r.tag_check,this._options.unformatted),r.is_content_unformatted=!r.is_empty_element&&T(r.tag_check,this._options.content_unformatted),r.is_inline_element=T(r.tag_name,this._options.inline)||this._options.inline_custom_elements&&r.tag_name.includes("-")||r.tag_start_char==="{",r},y.prototype._set_tag_position=function(c,r,h,M,w){if(h.is_empty_element||(h.is_end_tag?h.start_tag_token=this._tag_stack.try_pop(h.tag_name):(this._do_optional_end_element(h)&&(h.is_inline_element||c.print_newline(!1)),this._tag_stack.record_tag(h),(h.tag_name==="script"||h.tag_name==="style")&&!(h.is_unformatted||h.is_content_unformatted)&&(h.custom_beautifier_name=u(h.tag_check,r)))),T(h.tag_check,this._options.extra_liners)&&(c.print_newline(!1),c._output.just_added_blankline()||c.print_newline(!0)),h.is_empty_element){if(h.tag_start_char==="{"&&h.tag_check==="else"){this._tag_stack.indent_to_tag(["if","unless","each"]),h.indent_content=!0;var S=c.current_line_has_match(/{{#if/);S||c.print_newline(!1)}h.tag_name==="!--"&&w.type===e.TAG_CLOSE&&M.is_end_tag&&h.text.indexOf(`
`)===-1||(h.is_inline_element||h.is_unformatted||c.print_newline(!1),this._calcluate_parent_multiline(c,h))}else if(h.is_end_tag){var d=!1;d=h.start_tag_token&&h.start_tag_token.multiline_content,d=d||!h.is_inline_element&&!(M.is_inline_element||M.is_unformatted)&&!(w.type===e.TAG_CLOSE&&h.start_tag_token===M)&&w.type!=="TK_CONTENT",(h.is_content_unformatted||h.is_unformatted)&&(d=!1),d&&c.print_newline(!1)}else h.indent_content=!h.custom_beautifier_name,h.tag_start_char==="<"&&(h.tag_name==="html"?h.indent_content=this._options.indent_inner_html:h.tag_name==="head"?h.indent_content=this._options.indent_head_inner_html:h.tag_name==="body"&&(h.indent_content=this._options.indent_body_inner_html)),!(h.is_inline_element||h.is_unformatted)&&(w.type!=="TK_CONTENT"||h.is_content_unformatted)&&c.print_newline(!1),this._calcluate_parent_multiline(c,h)},y.prototype._calcluate_parent_multiline=function(c,r){r.parent&&c._output.just_added_newline()&&!((r.is_inline_element||r.is_unformatted)&&r.parent.is_inline_element)&&(r.parent.multiline_content=!0)};var O=["address","article","aside","blockquote","details","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","main","menu","nav","ol","p","pre","section","table","ul"],A=["a","audio","del","ins","map","noscript","video"];return y.prototype._do_optional_end_element=function(c){var r=null;if(!(c.is_empty_element||!c.is_start_tag||!c.parent)){if(c.tag_name==="body")r=r||this._tag_stack.try_pop("head");else if(c.tag_name==="li")r=r||this._tag_stack.try_pop("li",["ol","ul","menu"]);else if(c.tag_name==="dd"||c.tag_name==="dt")r=r||this._tag_stack.try_pop("dt",["dl"]),r=r||this._tag_stack.try_pop("dd",["dl"]);else if(c.parent.tag_name==="p"&&O.indexOf(c.tag_name)!==-1){var h=c.parent.parent;(!h||A.indexOf(h.tag_name)===-1)&&(r=r||this._tag_stack.try_pop("p"))}else c.tag_name==="rp"||c.tag_name==="rt"?(r=r||this._tag_stack.try_pop("rt",["ruby","rtc"]),r=r||this._tag_stack.try_pop("rp",["ruby","rtc"])):c.tag_name==="optgroup"?r=r||this._tag_stack.try_pop("optgroup",["select"]):c.tag_name==="option"?r=r||this._tag_stack.try_pop("option",["select","datalist","optgroup"]):c.tag_name==="colgroup"?r=r||this._tag_stack.try_pop("caption",["table"]):c.tag_name==="thead"?(r=r||this._tag_stack.try_pop("caption",["table"]),r=r||this._tag_stack.try_pop("colgroup",["table"])):c.tag_name==="tbody"||c.tag_name==="tfoot"?(r=r||this._tag_stack.try_pop("caption",["table"]),r=r||this._tag_stack.try_pop("colgroup",["table"]),r=r||this._tag_stack.try_pop("thead",["table"]),r=r||this._tag_stack.try_pop("tbody",["table"])):c.tag_name==="tr"?(r=r||this._tag_stack.try_pop("caption",["table"]),r=r||this._tag_stack.try_pop("colgroup",["table"]),r=r||this._tag_stack.try_pop("tr",["table","thead","tbody","tfoot"])):(c.tag_name==="th"||c.tag_name==="td")&&(r=r||this._tag_stack.try_pop("td",["table","thead","tbody","tfoot","tr"]),r=r||this._tag_stack.try_pop("th",["table","thead","tbody","tfoot","tr"]));return c.parent=this._tag_stack.get_parser_token(),r}},kt.Beautifier=y,kt}var me;function ei(){if(me)return _t.exports;me=1;var i=ti().Beautifier,t=he().Options;function n(e,s,l,p){var _=new i(e,s,l,p);return _.beautify()}return _t.exports=n,_t.exports.defaultOptions=function(){return new t},_t.exports}var be;function ii(){if(be)return V;be=1;var i=Qe(),t=Je(),n=ei();function e(s,l,p,_){return p=p||i,_=_||t,n(s,l,p,_)}return e.defaultOptions=n.defaultOptions,V.js=i,V.css=t,V.html=e,V}var ye;function ai(){return ye||(ye=1,function(i){function t(n,e,s){var l=function(p,_){return n.js_beautify(p,_)};return l.js=n.js_beautify,l.css=e.css_beautify,l.html=s.html_beautify,l.js_beautify=n.js_beautify,l.css_beautify=e.css_beautify,l.html_beautify=s.html_beautify,l}(function(n){var e=ii();e.js_beautify=e.js,e.css_beautify=e.css,e.html_beautify=e.html,n.exports=t(e,e,e)})(i)}(dt)),dt.exports}var si=ai();const Lt=(i,t)=>{const{width:e,height:s,data:l}=i,p=Math.ceil(e/t),_=Math.ceil(s/t),u=new Uint8Array(Math.ceil(e/t)*Math.ceil(s/t));let T=0;for(let b=0;b<s;b+=t)for(let g=0;g<e;g+=t){let y=!1;for(let x=0;x<t&&!y;x++)for(let O=0;O<t&&!y;O++){const A=g+O,c=b+x;if(A<e&&c<s){const r=(c*e+A)*4;l[r+3]>10&&(y=!0)}}u[T++]=y?1:0}return{validBlocks:u,blockWidth:p,blockHeight:_}},U=(i,t,n)=>i+n*(t-i),ct=i=>{i=i.replace(/^#/,"");const t=parseInt(i,16),n=t>>16&255,e=t>>8&255,s=t&255;return{r:n,g:e,b:s}},Pe=(i,t,n)=>"#"+((1<<24)+(i<<16)+(t<<8)+n).toString(16).slice(1),Nt=(i,t)=>{if(!(i!=null&&i.length))return"#ffffff";if(i.length===1)return i[0];const e=Math.max(0,Math.min(1,t))*(i.length-1),s=Math.floor(e);if(s===i.length-1)return i[i.length-1];const l=e-s,p=ct(i[s]),_=ct(i[s+1]),u=Math.round(U(p.r,_.r,l)),T=Math.round(U(p.g,_.g,l)),b=Math.round(U(p.b,_.b,l));return Pe(u,T,b)},ni=(i,t)=>{if(!(i!=null&&i.length))return"#ffffff";if(i.length===1)return i[0];const e=Math.max(0,Math.min(1,t))*i.length,s=Math.floor(e)%i.length,l=(s+1)%i.length,p=e-Math.floor(e),_=ct(i[s]),u=ct(i[l]),T=Math.round(U(_.r,u.r,p)),b=Math.round(U(_.g,u.g,p)),g=Math.round(U(_.b,u.b,p));return Pe(T,b,g)},ve=({dimensions:{width:i,height:t}})=>({top:()=>({x:Math.random()*i,y:0}),center:()=>({x:Math.round(i/2),y:Math.round(t/2)}),bottom:()=>({x:Math.random()*i,y:t}),random:()=>({x:Math.random()*i,y:Math.random()*t}),left:()=>({x:0,y:Math.random()*t}),right:()=>({x:i,y:Math.random()*t}),"top-left":()=>({x:Math.random()*(i/5),y:Math.random()*(t/5)}),"top-right":()=>({x:i,y:Math.random()*(t/5)}),"bottom-left":()=>({x:Math.random()*(i/5),y:t-Math.random()*(t/5)}),"bottom-right":()=>({x:i-Math.random()*(i/5),y:t-Math.random()*(t/5)})}),Xt=(i,t)=>{if(i.length===0)return{width:0,height:0,minX:0,minY:0,maxX:0,maxY:0};let n=1/0,e=1/0,s=-1/0,l=-1/0;return i.forEach(p=>{n=Math.min(n,p.targetX),e=Math.min(e,p.targetY),s=Math.max(s,p.targetX+t),l=Math.max(l,p.targetY+t)}),{minX:n,minY:e,maxX:s,maxY:l,width:s-n,height:l-e}},we=i=>si.js(i,{indent_size:2,space_in_empty_paren:!1,preserve_newlines:!0}),ri=i=>{i.x+=i.dx,i.y+=i.dy,i.dx+=(Math.random()-.5)*.1,i.dy-=.02},oi=(i,t)=>t-i.createdAt>=i.lifetime,li=(i,t)=>{if(t>(i.revealThreshold||.99))return 1;if(t>.85&&Math.sqrt(Math.pow(i.x-i.targetX,2)+Math.pow(i.y-i.targetY,2))<=5){const s=(i.revealThreshold||.99)-.02,l=Math.max(0,(t-s)/.02);return Math.min(1,l)}return 0},_i=(i,t,n,e,s=5)=>{const l=[];for(let p=0;p<s;p++){const _=Math.random()*Math.PI*2,u=.5+Math.random()*2;l.push({x:i,y:t,dx:Math.cos(_)*u,dy:Math.sin(_)*u-1,radius:2+Math.random()*5,color:n,opacity:.7+Math.random()*.3,createdAt:e,lifetime:Wt})}return l},ui=({bubble:i,requestAnimationFrameTime:t,context:n,particleColors:e})=>{const s=t-i.createdAt,l=Math.min(1,s/i.lifetime),p=i.opacity*(1-l);n.beginPath(),n.arc(Math.floor(i.x),Math.floor(i.y),i.radius,0,Math.PI*2),n.fillStyle=Nt(e,l),n.globalAlpha=p,n.fill()},Te=({particle:i,context:t,particleRadius:n,imageBitmap:e})=>{const s=i.scale||1,l=Math.floor(n*s),p=Math.floor(i.x)+n/2,_=Math.floor(i.y)+n/2,u=p-l/2,T=_-l/2;t.globalAlpha=i.opacity||1,t.drawImage(e,i.targetX,i.targetY,n,n,u,T,l,l)},xe=({particle:i,context:t,particleRadius:n,particleColors:e,revealProgress:s,enableStaticMode:l=!1})=>{const p=i.scale||1,_=Math.floor(n*p),u=Math.floor(i.x)+n/2,T=Math.floor(i.y)+n/2;l||(t.globalAlpha=i.opacity||1),t.beginPath(),t.arc(u,T,_/2,0,2*Math.PI),t.fillStyle=l&&i.color?i.color:e.length?Nt(e,s):i.color,t.fill()},ci=({particle:i,blendFactor:t,context:n,particleRadius:e,particleColors:s,revealProgress:l,imageBitmap:p})=>{const _=i.scale||1,u=Math.floor(e*_),T=Math.floor(i.x)+e/2,b=Math.floor(i.y)+e/2;n.globalAlpha=(i.opacity||1)*(1-t),n.beginPath(),n.arc(T,b,u/2,0,2*Math.PI),n.fillStyle=i.color?i.color:s.length?Nt(s,l):i.color,n.fill(),n.globalAlpha=t;const g=T-u/2,y=b-u/2;n.drawImage(p,i.targetX,i.targetY,e,e,g,y,u,u)},Ee=({particle:i,context:t,particleRadius:n,particleColors:e,revealProgress:s,imageBitmap:l,enableImageParticles:p,enableStaticMode:_=!1})=>{if(_)xe({particle:i,context:t,particleRadius:n,particleColors:e,revealProgress:s,enableStaticMode:_});else if(p)Te({particle:i,context:t,particleRadius:n,imageBitmap:l});else{const u=li(i,s);u>0&&u<1?ci({particle:i,blendFactor:u,context:t,particleRadius:n,particleColors:e,revealProgress:s,imageBitmap:l}):u>=1?Te({particle:i,context:t,particleRadius:n,imageBitmap:l}):xe({particle:i,context:t,particleRadius:n,particleColors:e,revealProgress:s,enableStaticMode:_})}},pi=i=>i.x===i.targetX&&i.y===i.targetY,pt={"ease-in-out":i=>i*(2-i),"ease-in":i=>i*i,"ease-out":i=>1-(1-i)*(1-i),linear:i=>i,"quadratic-out":i=>i*(2-i),"ease-out-quart":i=>1-Math.pow(1-i,4),"ease-in-out-quint":i=>i<.5?16*i*i*i*i*i:1-Math.pow(-2*i+2,5)/2,"ease-in-quart":i=>i*i*i*i},Yt=`{
  'ease-in-out': (t) => t * (2 - t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'linear': (t) => t,
  'quadratic-out': (t) => t * (2 - t),
  'ease-out-quart': (t) => 1 - Math.pow(1 - t, 4),
  'ease-in-out-quint': (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  'ease-in-quart': (t) => t * t * t * t,
}`,j={BUILD:"BUILD",SUPER_SWIRL:"SUPER_SWIRL",OPPENHEIMER:"OPPENHEIMER",SCANNING:"SCANNING",EXPLOSION:"EXPLOSION",HELIX_SPIRAL:"HELIX_SPIRAL",PERLIN:"PERLIN"};class Y{constructor(t,n,e){this.x=t,this.y=n,this.z=e}dot2(t,n){return this.x*t+this.y*n}}const hi=[new Y(1,1,0),new Y(-1,1,0),new Y(1,-1,0),new Y(-1,-1,0),new Y(1,0,1),new Y(-1,0,1),new Y(1,0,-1),new Y(-1,0,-1),new Y(0,1,1),new Y(0,-1,1),new Y(0,1,-1),new Y(0,-1,-1)],Oe=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],$=new Array(512),K=new Array(512);(i=>{i>0&&i<1&&(i*=65536),i=Math.floor(i),i<256&&(i|=i<<8);for(let t=0;t<256;t++){let n;t&1?n=Oe[t]^i&255:n=Oe[t]^i>>8&255,$[t]=$[t+256]=n,K[t]=K[t+256]=hi[n%12]}})(0);const Me=i=>i*i*i*(i*(i*6-15)+10),Se=(i,t)=>{let n=Math.floor(i),e=Math.floor(t);i=i-n,t=t-e,n=n&255,e=e&255;const s=K[n+$[e]].dot2(i,t),l=K[n+$[e+1]].dot2(i,t-1),p=K[n+1+$[e]].dot2(i-1,t),_=K[n+1+$[e+1]].dot2(i-1,t-1),u=Me(i);return U(U(s,p,u),U(l,_,u),Me(t))},fi={factory:i=>(t,n,e,s,l)=>{const{swirlTurns:p,spiralDirection:_,easingType:u,affectOpacity:T,affectScale:b}=i,g=e-n,y=Math.min(g/l,1),x=Math.min(y,1),O=pt[u](x);if(!t._started){const r=t.initialX-t.targetX,h=t.initialY-t.targetY;t._radius=Math.sqrt(r*r+h*h),t._angle=Math.atan2(h,r),t._turns=p+Math.random(),t._started=!0}const A=t._radius*(1-O),c=t._angle+_*2*Math.PI*t._turns*O;t.x=t.targetX+A*Math.cos(c),t.y=t.targetY+A*Math.sin(c),b?t.scale=1+2*(1-O):t.scale=1,T?t.opacity=O:t.opacity=1,t.color=`rgba(255,255,255,${t.opacity})`,x>=1&&(t.x=t.targetX,t.y=t.targetY,t.opacity=1,t.scale=1)},defaultConfig:{swirlTurns:2,spiralDirection:1,easingType:"ease-in-out",affectOpacity:!0,affectScale:!0},commonControls:{startPosition:!0,delay:!0},getCode:i=>`
    return (() => {
      const config = ${JSON.stringify(i,null,2)};
      const {swirlTurns, spiralDirection, easingType, affectOpacity, affectScale} = config;
      const easingConfig = ${Yt};

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
  `},di={factory:i=>(t,n,e,s,l)=>{const{horizontalPhaseEnd:p,verticalCompressionFactor:_,scalingBoost:u,bouncyIntensity:T,bouncyOffset:b}=i,g=e-n,y=Math.min(g/l,1),x=1,O=.6,A=1.1,c=.2,r=.1,h=.5;if(t.customProps||(t.customProps={originalScale:t.scale,originalOpacity:t.opacity}),y>=1)return t.x=t.targetX,t.y=t.targetY,t.scale=t.customProps.originalScale,t.opacity=t.customProps.originalOpacity,t;const M=w=>{const S=2*Math.PI/3;return w===0?0:w===1?1:Math.pow(2,-T*w)*Math.sin((w*T-b)*S)+1};if(y<p){const w=y/p,S=M(w);t.x=t.initialX+(t.targetX-t.initialX)*S,t.y=t.initialY;const d=t.customProps.originalScale,v=1-Math.sin(w*Math.PI)*c;t.scale=d*v}else if(y<x){const w=(y-p)/(x-p),S=M(w);t.x=t.targetX;const d=(t.initialY+t.targetY)/2,v=d+(t.targetY-d)*_,f=w<O?0:(()=>{const I=(w-O)/(1-O);return 1-Math.pow(1-I,A)})(),E=t.initialY+(v-t.initialY)*S;t.y=E+(t.targetY-v)*f;const a=t.customProps.originalScale,m=1-Math.sin(w*Math.PI)*r,P=w<h?1+(1-w/h)*u:1;t.scale=a*m*P}return t},defaultConfig:{horizontalPhaseEnd:.4,verticalCompressionFactor:.45,scalingBoost:.3,bouncyIntensity:10,bouncyOffset:.75,startPosition:"center"},commonControls:{startPosition:!0,delay:!0},getCode:i=>`
    return (() => {
      const config = ${JSON.stringify(i,null,2)};

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
  `},gi={factory:i=>(t,n,e,s,l)=>{const p=e-n,_=Math.min(p/l,1),{windStrength:u,turbulenceScale:T,oscillationAmount:b,settlingSpeed:g,particleWeight:y}=i;t.windProps||(t.windProps={originalScale:t.scale,originalOpacity:t.opacity,gustSensitivity:(.5+Math.random()*1.5)/y,gustFrequency:1+Math.random()*2,turbulenceScale:(10+Math.random()*40)*(T/25),drift:(Math.random()-.5)*2,weight:(.3+Math.random()*.7)*y,flutterAmount:(Math.random()*.8+.2)*b,flutterSpeed:3+Math.random()*6,delay:Math.random()*.15/g,turbPhaseX:Math.random()*1e3,turbPhaseY:Math.random()*1e3,sinePhaseX:Math.random()*Math.PI*2,sinePhaseY:Math.random()*Math.PI*2,opacityPhase:Math.random()*Math.PI*2,burstOpacity:Math.random()>.7});let x=Math.max(0,(_-t.windProps.delay)/(1-t.windProps.delay));x=Math.min(1,Math.pow(x,1/g));let O;if(x<.25)O=x*4*u;else if(x<.75){const X=(x-.25)/.5;O=u+Math.sin(X*Math.PI*3)*u*.3,O+=Math.sin(X*Math.PI*8)*u*.15}else O=u*(1-(x-.75)/.25);let A,c;const r=g;if(x<.25){const X=Math.pow(x/.25,2);A=t.initialX+(t.targetX-t.initialX)*X*.15*r,c=t.initialY+(t.targetY-t.initialY)*X*.15*r}else if(x<.75){const Ft=.15+(x-.25)/.5*.6*r;A=t.initialX+(t.targetX-t.initialX)*Math.min(Ft,.75),c=t.initialY+(t.targetY-t.initialY)*Math.min(Ft,.75)}else{const X=(x-.75)/.25,Le=.75+(1-Math.pow(1-X,3))*.25;A=t.initialX+(t.targetX-t.initialX)*Le,c=t.initialY+(t.targetY-t.initialY)*Le}const h=x*10,M=Math.sin((h*.3+t.windProps.turbPhaseX)*t.windProps.gustFrequency)*t.windProps.turbulenceScale,w=Math.sin((h*.7+t.windProps.turbPhaseX*.5)*t.windProps.gustFrequency*1.5)*t.windProps.turbulenceScale*.5,S=Math.sin((h*1.1+t.windProps.turbPhaseX*.8)*t.windProps.gustFrequency*2.3)*t.windProps.turbulenceScale*.3,d=Math.cos((h*.4+t.windProps.turbPhaseY)*t.windProps.gustFrequency)*t.windProps.turbulenceScale*.8,v=Math.cos((h*.9+t.windProps.turbPhaseY*.7)*t.windProps.gustFrequency*1.8)*t.windProps.turbulenceScale*.4,f=Math.cos((h*1.3+t.windProps.turbPhaseY*.3)*t.windProps.gustFrequency*2.1)*t.windProps.turbulenceScale*.25,E=(M+w+S)*O*t.windProps.gustSensitivity,a=(d+v+f)*O*t.windProps.gustSensitivity,m=30*Math.sin(x*Math.PI*.7)*t.windProps.drift*O,P=25*O*t.windProps.flutterAmount,I=P*Math.sin(x*Math.PI*t.windProps.flutterSpeed+t.windProps.sinePhaseX),R=P*.5*Math.cos(x*Math.PI*t.windProps.flutterSpeed*.7+t.windProps.sinePhaseY),D=1/t.windProps.weight;t.x=A+(E+I+m)/D,t.y=c+(a+R)/D;const L=t.windProps.originalScale,B=Math.sin(x*Math.PI*t.windProps.flutterSpeed*1.5+t.windProps.sinePhaseX)*.15*b,H=Math.sin(x*Math.PI*2)*.1*O;t.scale=L*(1+B+H);const J=t.windProps.originalOpacity;let G=0;t.windProps.burstOpacity?G=Math.sin(x*Math.PI*20+t.windProps.opacityPhase)*.2*O:G=Math.sin(x*Math.PI*10+t.windProps.opacityPhase)*.1*O;let z;x<.1?z=x/.1:x>.9?z=1:z=1+G,t.opacity=J*Math.min(1,Math.max(.2,z));let tt=0,et=100,it=70;if(t.origColor)tt=t.origColor.hue,et=t.origColor.saturation,it=t.origColor.lightness;else{if(t.color.startsWith("hsl")){const X=t.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);X&&(tt=parseInt(X[1],10),et=parseInt(X[2],10),it=parseInt(X[3],10))}else tt=(220+Math.random()*40)%360,et=10+Math.random()*15,it=70+Math.random()*20;t.origColor={hue:tt,saturation:et,lightness:it}}const De=O*20,Mi=(tt+Math.sin(x*Math.PI*3)*5*O)%360,Si=Math.max(0,et-De*.5),Ai=Math.min(100,it+De*.3);t.color=`hsl(${Mi}, ${Si}%, ${Ai}%)`,_>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=t.windProps.originalScale,t.opacity=t.windProps.originalOpacity)},defaultConfig:{windStrength:1,turbulenceScale:60,oscillationAmount:1.5,settlingSpeed:1.5,particleWeight:.7},commonControls:{startPosition:!0,delay:!0},getCode:i=>`
    return (() => {
      const config = ${JSON.stringify(i,null,2)};
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
  `},mi={factory:i=>(t,n,e,s,l,p)=>{const{oscillationFrequency:_,settlementThreshold:u,scanningRange:T,passDistribution:b,settlementTiming:g}=i,y=e-n,x=Math.min(y/l,1),O=_*2;if(t.animation===void 0){t.id=crypto.randomUUID();const v=t.id.split("").reduce((m,P)=>(m<<5)-m+P.charCodeAt(0),0),f=Math.abs(v),E=Math.max(1,Math.floor(O*b));let a;if(g==="early"){const m=Math.max(1,Math.floor(E/3));a=f%m+1}else if(g==="late"){const m=Math.max(1,Math.floor(E/3)),P=E-m+1;a=f%m+P}else a=f%E+1;t.animation={settled:!1,assignedPass:a,currentPass:0},t.y=t.targetY,t.opacity=1}if(t.animation.settled)return t.x=t.targetX,t.y=t.targetY,t;const A=p.maxX-p.minX;if(A<=0||!isFinite(A))return t;const c=Math.sin(x*_*Math.PI*2),r=x*O,h=Math.min(Math.floor(r)+1,O);h>t.animation.currentPass&&(t.animation.currentPass=h);const M=p.minX-T,w=p.maxX+T,S=M+(c+1)/2*(w-M);t.x=S;const d=Math.abs(t.x-t.targetX);t.animation.currentPass>=t.animation.assignedPass&&d<=u&&(t.x=t.targetX,t.y=t.targetY,t.animation.settled=!0)},defaultConfig:{oscillationFrequency:3,settlementThreshold:12,scanningRange:30,passDistribution:.85,settlementTiming:"distributed"},commonControls:{startPosition:!1,delay:!0},getCode:i=>`
    return (() => {
      const config = ${JSON.stringify(i,null,2)};
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
  `},bi={factory:i=>(t,n,e,s,l)=>{const{explosionStrength:p,deconstructionPhase:_,orbitalRadius:u,depthOffset:T}=i,b=e-n,g=Math.min(b/l,1);if(!t.isInitialized){t.isInitialized=!0;const r=p+Math.random()*p*.5,h=Math.random()*Math.PI*2,M=Math.acos(Math.random()*2-1);t.explodedPos={x:t.initialX+Math.cos(h)*Math.sin(M)*r,y:t.initialY+Math.sin(h)*Math.sin(M)*r,z:T+Math.cos(M)*r},t.finalPos={x:t.targetX,y:t.targetY,z:0}}let y,x=1;const O=_;if(g<O){const r=g/O,h=pt["ease-out-quart"](r);y={x:t.initialX+(t.explodedPos.x-t.initialX)*h,y:t.initialY+(t.explodedPos.y-t.initialY)*h,z:0+(t.explodedPos.z-0)*h},x=1+1.5*Math.sin(r*Math.PI)}else{const r=(g-O)/(1-O),h=pt["ease-in-out-quint"](r);y={x:t.explodedPos.x+(t.finalPos.x-t.explodedPos.x)*h,y:t.explodedPos.y+(t.finalPos.y-t.explodedPos.y)*h,z:t.explodedPos.z+(t.finalPos.z-t.explodedPos.z)*h},x=1+.8*Math.sin(r*Math.PI);const M=Math.max(0,(r-.7)/.3);if(M>0){const w=1-M,S=M*Math.PI*4,d=u*w*w;y.x+=Math.cos(S)*d,y.y+=Math.sin(S)*d}}const A=s.width*1.2,c=A/(A-y.z);t.x=(y.x-s.width/2)*c+s.width/2,t.y=(y.y-s.height/2)*c+s.height/2,t.scale=Math.max(0,c),t.opacity=Math.max(0,Math.min(1,c))*x,g>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1)},defaultConfig:{explosionStrength:1e3,deconstructionPhase:.4,orbitalRadius:15,depthOffset:-500},commonControls:{startPosition:!0,delay:!0},getCode:i=>`
    return (() => {
      const config = ${JSON.stringify(i,null,2)};
      const {explosionStrength, deconstructionPhase, orbitalRadius, depthOffset} = config;
      const easingConfig = ${Yt};

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
  `},yi={factory:i=>(t,n,e,s,l)=>{const{helixRadius:p,helixTurns:_,helixHeight:u,rotationSpeed:T,easingType:b,perspective:g,affectOpacity:y}=i,x=e-n,O=Math.min(x/l,1);if(!t.isInitialized){t.isInitialized=!0;const m=Math.random()*Math.PI*2,P=p/100*Math.min(s.width,s.height),I=u/100*s.height,R=(Math.random()-.5)*I;t.helixAngle=m,t.helixHeight=R,t.helixPhase=Math.random()*Math.PI*2,t.helixStartPos={x:s.width/2+Math.cos(m)*P,y:s.height/2+R,z:Math.sin(m)*P},t.actualHelixRadius=P,t.actualHelixHeight=I,t.finalPos={x:t.targetX,y:t.targetY,z:0}}const A=Math.min(O,1),c=pt[b](A),r=t.helixAngle+_*2*Math.PI*A*T,h=t.helixHeight*(1-c),M=s.width/2+Math.cos(r)*t.actualHelixRadius*(1-c),w=s.height/2+h,S=Math.sin(r)*t.actualHelixRadius*(1-c),d={x:M+(t.finalPos.x-M)*c,y:w+(t.finalPos.y-w)*c,z:S+(t.finalPos.z-S)*c},v=Math.sin(A*Math.PI*4+t.helixPhase)*10*(1-c);d.x+=v*Math.cos(r+Math.PI/2),d.y+=v*.5;const f=g/(g-d.z);t.x=(d.x-s.width/2)*f+s.width/2,t.y=(d.y-s.height/2)*f+s.height/2,t.scale=Math.max(.1,f),y?t.opacity=Math.max(0,Math.min(1,f))*(.3+.7*c):t.opacity=Math.max(0,Math.min(1,f));const E=(d.z+t.actualHelixRadius)/(t.actualHelixRadius*2),a=Math.max(.6,Math.min(1,E));t.color=`rgba(${Math.floor(255*a)}, ${Math.floor(255*a)}, 255, ${t.opacity})`,A>=1&&(t.x=t.targetX,t.y=t.targetY,t.scale=1,t.opacity=1,t.color="rgba(255, 255, 255, 1)")},defaultConfig:{helixRadius:20,helixTurns:3,helixHeight:50,rotationSpeed:1,easingType:"ease-in-out-quint",perspective:800,affectOpacity:!1},commonControls:{startPosition:!1,delay:!0},getCode:i=>`
    return (() => {
      const config = ${JSON.stringify(i,null,2)};
      const {helixRadius, helixTurns, helixHeight, rotationSpeed, easingType, perspective, affectOpacity} = config;
      const easingConfig = ${Yt};

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
  `},Pi={factory:i=>(t,n,e,s,l)=>{const{driftSpeed:p,effectStrength:_,noiseScale:u,constantSpacing:T,scaleMultiplier:b}=i,g=(e-n)*p,y=t.targetX/u,x=t.targetY/u,O=(Se(y+g,x)+1)/2,A=(Se(y+10+g,x+10+g)+1)/2,c=O*_;t.scale=1+c*b;const r=A*Math.PI*2,h=Math.cos(r)*T,M=Math.sin(r)*T;t.x=t.targetX+h,t.y=t.targetY+M},defaultConfig:{driftSpeed:5e-4,effectStrength:3,noiseScale:600,constantSpacing:100,scaleMultiplier:2.5},commonControls:{},getCode:i=>`return (() => {
  const config = ${JSON.stringify(i,null,2)};

  class Grad {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    dot2(x, y) {
      return this.x * x + this.y * y;
    }
  }

  const lerp = (start, end, progress) =>
    start + (end - start) * progress;


  const grad3 = [
    new Grad(1, 1, 0),
    new Grad(-1, 1, 0),
    new Grad(1, -1, 0),
    new Grad(-1, -1, 0),
    new Grad(1, 0, 1),
    new Grad(-1, 0, 1),
    new Grad(1, 0, -1),
    new Grad(-1, 0, -1),
    new Grad(0, 1, 1),
    new Grad(0, -1, 1),
    new Grad(0, 1, -1),
    new Grad(0, -1, -1),
  ];

  const p = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
    36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
    75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
    149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
    27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
    92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
    209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
    164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
    147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
    28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
    155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
    178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
    191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
    181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
    61, 156, 180,
  ];

  // To remove the need for index wrapping, double the permutation table length
  const perm = new Array(512);
  const gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  const seed = (seedValue) => {
    if (seedValue > 0 && seedValue < 1) {
      // Scale the seed out
      seedValue *= 65536;
    }

    seedValue = Math.floor(seedValue);
    if (seedValue < 256) {
      seedValue |= seedValue << 8;
    }

    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = p[i] ^ (seedValue & 255);
      } else {
        v = p[i] ^ ((seedValue >> 8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  seed(0);

  const fade = (t) => {
    return t * t * t * (t * (t * 6 - 15) + 10);
  };

  // 2D Perlin Noise
  const perlin2 = (x, y) => {
    // Find unit grid cell containing point
    let X = Math.floor(x);
    let Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X;
    y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255;
    Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    const n00 = gradP[X + perm[Y]].dot2(x, y);
    const n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
    const n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
    const n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

    // Compute the fade curve value for x
    const u = fade(x);

    // Interpolate the four results
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
  };
  return (particle, animationStartTime, currentTime, canvasDimensions, animationDuration) => {
    const {driftSpeed, effectStrength, noiseScale, constantSpacing, scaleMultiplier} = config;

    // Calculate a time-based offset for drifting noise
    const timeOffset = (currentTime - animationStartTime) * driftSpeed;

    // Define base coordinates for sampling from the noise field
    const noiseX = particle.targetX / noiseScale;
    const noiseY = particle.targetY / noiseScale;

    // Sample two different points in the noise field, adding the time offset to make it drift
    const visualNoise = (perlin2(noiseX + timeOffset, noiseY) + 1) / 2;
    const positionNoise = (perlin2(noiseX + 10 + timeOffset, noiseY + 10 + timeOffset) + 1) / 2;

    // Apply visual effects: scale based on noise
    const visualEffectAmount = visualNoise * effectStrength;
    particle.scale = 1 + visualEffectAmount * scaleMultiplier;

    // Apply positional offset: particles orbit their target at a fixed distance
    const angle = positionNoise * Math.PI * 2;
    const offsetX = Math.cos(angle) * constantSpacing;
    const offsetY = Math.sin(angle) * constantSpacing;

    particle.x = particle.targetX + offsetX;
    particle.y = particle.targetY + offsetY;
  };

})()`},F={[j.SUPER_SWIRL]:fi,[j.BUILD]:di,[j.OPPENHEIMER]:gi,[j.SCANNING]:mi,[j.EXPLOSION]:bi,[j.HELIX_SPIRAL]:yi,[j.PERLIN]:Pi};let Ae;const Ie={particleRadius:5,startPosition:Xe,selectedMovementFunction:ft,selectedEffect:null,effectConfigurations:{SUPER_SWIRL:F.SUPER_SWIRL.defaultConfig,BUILD:F.BUILD.defaultConfig,OPPENHEIMER:F.OPPENHEIMER.defaultConfig,SCANNING:F.SCANNING.defaultConfig,EXPLOSION:F.EXPLOSION.defaultConfig,HELIX_SPIRAL:F.HELIX_SPIRAL.defaultConfig,PERLIN:F.PERLIN.defaultConfig},movementFunctionCode:Ke()[ft].code,text:Ye,font:Ut,particleColors:Fe,animationDuration:3e3,delay:0,enableBubbles:!1,enableImageParticles:!1,enableStaticMode:!1,particleGap:0,sizeInterpolationPercentage:0,interpolationOffset:400,sizeInterpolationMax:1.5,layerCount:1,layerOffsetDistance:5,layerOffsetAngle:225,layerOpacityDecay:.3,layerColors:Ne},o={workerParticles:[],bubbleParticles:[],imageBitmap:null,animationFrameId:0,frameCanvas:null,frameContext:null,mainCanvas:null,mainContext:null,validBlocks:null,blockHeight:0,blockWidth:0,appProps:Ie,revealProgress:0,textBoundaries:null};let Z;const vi=async i=>{o.mainCanvas=i,o.mainContext=o.mainCanvas.getContext("bitmaprenderer"),o.frameCanvas=new OffscreenCanvas(o.mainCanvas.width,o.mainCanvas.height),o.frameContext=o.frameCanvas.getContext("2d",{willReadFrequently:!0})},wi=i=>{const{imageBitmap:t,canvas:n,dimensions:e,appProps:s}=i;if(o.imageBitmap=t,Object.keys(s).length){const u={...s.font,textColor:s.font.textColor??Ut.textColor};o.appProps={...Ie,...s,font:u}}vi(n),o.frameContext.drawImage(o.imageBitmap,0,0);const{validBlocks:l,blockHeight:p,blockWidth:_}=Lt(o.frameContext.getImageData(0,0,o.mainCanvas.width,o.mainCanvas.height),o.appProps.particleRadius);o.textBoundaries=Xt(o.workerParticles,o.appProps.particleRadius),o.validBlocks=l,o.blockHeight=p,o.blockWidth=_,Z=ve({dimensions:e}),o.workerParticles=ht({validBlocks:o.validBlocks,radius:o.appProps.particleRadius,blockHeight:o.blockHeight,blockWidth:o.blockWidth,startPosition:o.appProps.startPosition,delay:o.appProps.delay})},ht=({validBlocks:i,radius:t,blockHeight:n,blockWidth:e,startPosition:s,delay:l})=>{const p=[];for(let _=0;_<n;_++)for(let u=0;u<e;u++){const T=_*e+u;if(i[T]){const b=u*t,g=_*t,y=Math.round(Math.random()*l),{x,y:O}=Z[s]();p.push({targetX:b,targetY:g,x,y:O,initialX:x,initialY:O,scale:1,opacity:1,delay:y,color:Bt,revealProgress:0,revealThreshold:.97+Math.random()*.02,reachedTarget:!1,emittedBubbles:!1})}}return p},Ti=i=>{for(let t=o.bubbleParticles.length-1;t>=0;t--){const n=o.bubbleParticles[t];ri(n),ui({bubble:n,requestAnimationFrameTime:i,context:o.frameContext,particleColors:o.appProps.particleColors}),oi(n,i)&&o.bubbleParticles.splice(t,1)}o.frameContext.globalAlpha=1},xi=(i,t,n,e)=>{Ae(i,t,n,{width:o.mainCanvas.width,height:o.mainCanvas.height},o.appProps.animationDuration,e)},Re=(i,t)=>{if(!i.emittedBubbles&&o.appProps.enableBubbles&&i.x===i.targetX&&i.y===i.targetY){i.emittedBubbles=!0;const n=_i(i.x,i.y,i.color,t,2+Math.floor(Math.random()*3));o.bubbleParticles.push(...n)}},Ei=(i,t,n,e,s)=>{const l=s*Math.PI/180,p=Math.cos(l)*e*n,_=Math.sin(l)*e*n;if(o.appProps.particleGap>0){const g=(o.textBoundaries.minX+o.textBoundaries.maxX)/2,y=(o.textBoundaries.minY+o.textBoundaries.maxY)/2,x=i.targetX-g,O=i.targetY-y,A=1+o.appProps.particleGap/50;i.x=g+x*A+p,i.y=y+O*A+_}else i.x=i.targetX+p,i.y=i.targetY+_;const u=(i.initialX*9301+i.initialY*49297)%23,T=u/23*o.appProps.interpolationOffset,b=t+T;if(o.appProps.layerColors.length>n&&o.appProps.layerColors[n])i.color=o.appProps.layerColors[n];else if(o.appProps.particleColors.length>0){const g=b%o.appProps.animationDuration/o.appProps.animationDuration;i.color=ni(o.appProps.particleColors,g)}if(o.appProps.sizeInterpolationPercentage>0)if(u/23<o.appProps.sizeInterpolationPercentage/100){const x=o.appProps.sizeInterpolationMax,O=.5,A=x-O,c=Math.sin(b*.003)*(A/2)+(O+x)/2;i.scale=c}else i.scale=1;else i.scale=1},Oi=(i,t)=>{const n=t-i;let e=!0;if(o.appProps.enableStaticMode){for(let s=o.appProps.layerCount-1;s>=0;s--){const l=s===0?1:Math.max(.1,1-s*o.appProps.layerOpacityDecay);o.frameContext.globalAlpha=l,o.workerParticles.forEach(p=>{if(p.delay>n)return;const _={...p};Ei(_,n,s,o.appProps.layerOffsetDistance,o.appProps.layerOffsetAngle),Ee({particle:_,context:o.frameContext,particleRadius:o.appProps.particleRadius,particleColors:o.appProps.particleColors,revealProgress:o.revealProgress,imageBitmap:o.imageBitmap,enableImageParticles:o.appProps.enableImageParticles,enableStaticMode:o.appProps.enableStaticMode}),s===0&&Re(_,t)})}o.frameContext.globalAlpha=1}else o.workerParticles.forEach(s=>{xi(s,i,t,o.textBoundaries),!(s.delay>n)&&(Ee({particle:s,context:o.frameContext,particleRadius:o.appProps.particleRadius,particleColors:o.appProps.particleColors,revealProgress:o.revealProgress,imageBitmap:o.imageBitmap,enableImageParticles:o.appProps.enableImageParticles,enableStaticMode:o.appProps.enableStaticMode}),Re(s,t),!pi(s)&&o.revealProgress>=.99&&(e=!1))});return e},N=(i,t)=>{o.frameContext.clearRect(0,0,o.frameCanvas.width,o.frameCanvas.height);const n=t-i;o.revealProgress=Math.min(1,n/o.appProps.animationDuration),Ti(t);const e=Oi(i,t),s=o.frameCanvas.transferToImageBitmap();o.mainContext.transferFromImageBitmap(s);const l=e&&o.revealProgress>=1,p=o.appProps.animationDuration+(o.appProps.enableBubbles?Wt:0);(o.appProps.enableStaticMode?!1:l&&n>=p)?o.animationFrameId&&(cancelAnimationFrame(o.animationFrameId),o.bubbleParticles=[],o.frameContext.drawImage(o.imageBitmap,0,0)):o.animationFrameId=requestAnimationFrame(u=>N(i,u))},Ce=()=>{Ae=new Function(o.appProps.movementFunctionCode)();const i=performance.now();o.revealProgress=0,o.bubbleParticles=[],o.workerParticles.forEach(t=>{t.emittedBubbles=!1}),N(i,i)},ke=()=>{o.animationFrameId&&cancelAnimationFrame(o.animationFrameId),o.bubbleParticles=[],o.revealProgress=0,o.workerParticles=o.workerParticles.map(t=>{const n=Z[o.appProps.startPosition]();return{x:n.x,y:n.y,initialX:n.x,initialY:n.y,targetX:t.targetX,targetY:t.targetY,scale:1,opacity:1,delay:t.delay,color:t.color,revealProgress:0,revealThreshold:t.revealThreshold}}),o.frameContext.clearRect(0,0,o.frameCanvas.width,o.frameCanvas.height);const i=o.frameCanvas.transferToImageBitmap();o.mainContext.transferFromImageBitmap(i),o.animationFrameId&&cancelAnimationFrame(o.animationFrameId)};self.onmessage=i=>{const{payload:t,type:n}=i.data;switch(n){case C.INITIALIZE:{wi(t),self.postMessage({type:k.INITIALIZED,data:o.appProps});break}case C.PLAY:{ke(),Ce();break}case C.RESIZE_PARTICLE_RADIUS:{o.appProps.particleRadius=t,o.frameContext.drawImage(o.imageBitmap,0,0);const{validBlocks:e,blockHeight:s,blockWidth:l}=Lt(o.frameContext.getImageData(0,0,o.mainCanvas.width,o.mainCanvas.height),o.appProps.particleRadius);if(o.validBlocks=e,o.blockHeight=s,o.blockWidth=l,o.workerParticles=ht({validBlocks:o.validBlocks,radius:o.appProps.particleRadius,blockHeight:o.blockHeight,blockWidth:o.blockWidth,startPosition:o.appProps.startPosition,delay:o.appProps.delay}),o.textBoundaries=Xt(o.workerParticles,o.appProps.particleRadius),self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const p=performance.now();N(p,p)}break}case C.UPDATE_START_POSITION:{if(o.appProps.startPosition=t,o.workerParticles.length){if(o.workerParticles.forEach(e=>{const s=Z[o.appProps.startPosition]();e.initialX=s.x,e.initialY=s.y,e.x=s.x,e.y=s.y}),self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}}else console.error("updateStartPosition failed, particles were not initialized",{workerParticles:o.workerParticles});break}case C.UPDATE_SELECTED_MOVEMENT_FUNCTION:{const{key:e,movementFunctionCode:s}=t??{};e&&(o.appProps.selectedMovementFunction=e),s!=null&&(o.appProps.movementFunctionCode=s,o.appProps.selectedEffect=null),self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_TEXT:{o.appProps.text=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_FONT:{o.appProps.font=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_PARTICLE_COLORS:{if(o.appProps.particleColors=t,t.length>0,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_BITMAP:{if(o.imageBitmap=t,o.frameCanvas&&o.mainCanvas){o.frameCanvas.width=o.imageBitmap.width,o.frameCanvas.height=o.imageBitmap.height,o.mainCanvas.width=o.imageBitmap.width,o.mainCanvas.height=o.imageBitmap.height,o.frameContext.drawImage(o.imageBitmap,0,0);const{validBlocks:e,blockHeight:s,blockWidth:l}=Lt(o.frameContext.getImageData(0,0,o.mainCanvas.width,o.mainCanvas.height),o.appProps.particleRadius);o.textBoundaries=Xt(o.workerParticles,o.appProps.particleRadius),o.validBlocks=e,o.blockHeight=s,o.blockWidth=l,Z=ve({dimensions:{width:o.mainCanvas.width,height:o.mainCanvas.height}}),o.workerParticles=ht({validBlocks:o.validBlocks,radius:o.appProps.particleRadius,blockHeight:o.blockHeight,blockWidth:o.blockWidth,startPosition:o.appProps.startPosition,delay:o.appProps.delay})}break}case C.UPDATE_ANIMATION_DURATION:{o.appProps.animationDuration=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.animationFrameId&&(o.bubbleParticles=[]);break}case C.UPDATE_DELAY:{o.appProps.delay=t,o.validBlocks&&(o.workerParticles=ht({validBlocks:o.validBlocks,radius:o.appProps.particleRadius,blockHeight:o.blockHeight,blockWidth:o.blockWidth,startPosition:o.appProps.startPosition,delay:o.appProps.delay})),self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_ENABLE_BUBBLES:{o.appProps.enableBubbles=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_ENABLE_IMAGE_PARTICLES:{o.appProps.enableImageParticles=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_ENABLE_STATIC_MODE:{if(o.appProps.enableStaticMode=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_PARTICLE_GAP:{if(o.appProps.particleGap=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_SIZE_INTERPOLATION_PERCENTAGE:{if(o.appProps.sizeInterpolationPercentage=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_INTERPOLATION_OFFSET:{if(o.appProps.interpolationOffset=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_SIZE_INTERPOLATION_MAX:{if(o.appProps.sizeInterpolationMax=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_LAYER_COUNT:{if(o.appProps.layerCount=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_LAYER_OFFSET_DISTANCE:{if(o.appProps.layerOffsetDistance=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_LAYER_OFFSET_ANGLE:{if(o.appProps.layerOffsetAngle=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_LAYER_OPACITY_DECAY:{if(o.appProps.layerOpacityDecay=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_LAYER_COLORS:{if(o.appProps.layerColors=t,self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),o.appProps.enableStaticMode&&o.animationFrameId){cancelAnimationFrame(o.animationFrameId);const e=performance.now();N(e,e)}break}case C.UPDATE_SELECTED_EFFECT:{o.appProps.selectedEffect=t,t&&F[t].getCode&&(o.appProps.movementFunctionCode=we(F[t].getCode(o.appProps.effectConfigurations[t]))),self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps});break}case C.UPDATE_EFFECT_CONFIGURATION:{const{effectType:e,configuration:s}=t;o.appProps.effectConfigurations[e]=s,F[e].getCode&&(o.appProps.movementFunctionCode=we(F[e].getCode(s))),self.postMessage({type:k.UPDATE_APP_PROPS,data:o.appProps}),ke(),Ce();break}}}})();
