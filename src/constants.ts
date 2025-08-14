import {FontState, StartPositionType} from './interfaces';

export const DEFAULT_PARTICLE_RADIUS = 5;
export const DEFAULT_ANIMATION_DURATION = 3000; // 3 seconds in milliseconds
export const DEFAULT_DELAY = 0; // 0 seconds in milliseconds
export const DEFAULT_ENABLE_BUBBLES = false; // Default setting for bubble emission
export const DEFAULT_ENABLE_IMAGE_PARTICLES = false; // Default setting for image particle rendering
export const DEFAULT_ENABLE_STATIC_MODE = false; // Default setting for static rendering mode
export const DEFAULT_PARTICLE_GAP = 0; // Default gap between particles in static mode (in pixels)
export const DEFAULT_SIZE_INTERPOLATION_PERCENTAGE = 0; // Default percentage of particles that should interpolate size (0-100%)
export const DEFAULT_INTERPOLATION_OFFSET = 400; // Default maximum offset for staggered animations (in milliseconds)
export const DEFAULT_SIZE_INTERPOLATION_MAX = 1.5; // Default maximum scale during size interpolation (1.0 = original size)
export const DEFAULT_LAYER_COUNT = 1; // Default number of layers (1-5)
export const DEFAULT_LAYER_OFFSET_DISTANCE = 5; // Default distance between layers in pixels
export const DEFAULT_LAYER_OFFSET_ANGLE = 225; // Default direction angle in degrees (bottom-right shadow)
export const DEFAULT_LAYER_OPACITY_DECAY = 0.3; // Default opacity reduction per layer (0.1-0.9)
export const DEFAULT_LAYER_COLORS: string[] = []; // Default layer colors (empty array means use particle colors)
export const DEFAULT_START_POSITION: StartPositionType = 'random';
export const DEFAULT_MOVEMENT_FUNCTION_KEY = 'DEV_EXAMPLE';
export const DEFAULT_PARTICLES_TEXT = 'WIX 🤠';
export const DEFAULT_PARTICLE_COLOR = '#ffffff';
export const DEFAULT_PARTICLE_COLORS = ['#ff0000', '#00ff00', '#0000ff'];
export const DEFAULT_FONT_STATE: FontState = {
    fontFamily: 'Arial',
    fontSize: 90,
    italic: false,
    weight: 400,
    letterSpacing: 0,
    textColor: DEFAULT_PARTICLE_COLOR,
}

export const COPY_AI_PROMPT_TEXT = 'Copy AI prompt';
export const AI_PROMPT_TOOLTIP_TEXT =
    'Copy an AI friendly prompt to your clipboard and run it on a LLM to receive an AI generated movement function.';
export const COPIED_TEXT = 'Copied!';
export const COPY_ERROR_TEXT = 'Copy error, try again';

export const COPY_SHAREABLE_LINK_TEXT = 'Copy shareable link';
export const GENERATING_LINK_TEXT = 'Generating link...';

export const SNIPPET_QUERY_PARAM = 'snippet';

export const DEV_EXAMPLE_CODE = `// This function will be called twice for each particle, because all particles reach the target in two frames.
return (particle, animationStartTime, currentTime, canvasDimensions) => {
    if (particle.x === 0 && particle.y === 0) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
    } else {
        particle.x = 0
        particle.y = 0
    }
}`;

export const EXAMPLE_JSDOC = `/**
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
`

export const EXAMPLE_CODE = `${EXAMPLE_JSDOC}
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
`;

export const EXAMPLE_AI_PROMPT = `
Write a new particle movement function following the same contract as the example below, but with a more visually interesting animation (e.g., curves, easing, oscillations, swirls, etc.).
* Move all relevant animation parameters (speed, easing, oscillation amplitude, swirl radius, etc.) into a config object so they can be easily tweaked at runtime.
* The animation must ensure that all particles reach their target coordinates exactly within the given animationDuration.
* Do not include JSDoc comments in your code — they are already provided in the example.
* The function should be self-contained, returning another function that will be called every animation frame to update particle properties.
* You may extend the particle object with additional properties needed for your effect.

${EXAMPLE_CODE}`
    ;

export const DATA_TEST_IDS = {
    FONT_FAMILY_SELECT: 'font-family-select',
    FONT_WEIGHT_SELECT: 'font-weight-select',
    FONT_SIZE_INPUT: 'font-size-input',
    LETTER_SPACING_INPUT: 'letter-spacing-input',
    FONT_ITALIC_CHECKBOX: 'font-italic-checkbox',
    TEXT_INPUT: 'text-input',
    TEXT_COLOR_INPUT: 'text-color-input',
    STATIC_MODE_TOGGLE: 'static-mode-toggle',
    PARTICLE_GAP_SLIDER: 'particle-gap-slider',
    SIZE_INTERPOLATION_SLIDER: 'size-interpolation-slider',
    INTERPOLATION_OFFSET_SLIDER: 'interpolation-offset-slider',
    SIZE_INTERPOLATION_MAX_SLIDER: 'size-interpolation-max-slider',
}

export const BUBBLE_PARTICLE_LIFETIME = 1300
