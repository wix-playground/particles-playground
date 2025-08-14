import { js as beautify } from 'js-beautify';

import {
  Coordinates,
  Dimensions,
  FontState,
  Particle,
  StartPositionType,
  TextBoundaries,
} from './interfaces';

export const getValidImageBlocks = (
  imageData: ImageData,
  particleSize: number
) => {
  const OPACITY_THRESHOLD = 10;
  const {width, height, data} = imageData;
  const blockWidth = Math.ceil(width / particleSize);
  const blockHeight = Math.ceil(height / particleSize);
  const validBlocks = new Uint8Array(
    Math.ceil(width / particleSize) * Math.ceil(height / particleSize)
  );

  let index = 0;

  for (let y = 0; y < height; y += particleSize) {
    for (let x = 0; x < width; x += particleSize) {
      let isValid = false;
      for (let dy = 0; dy < particleSize && !isValid; dy++) {
        for (let dx = 0; dx < particleSize && !isValid; dx++) {
          const srcX = x + dx;
          const srcY = y + dy;
          if (srcX < width && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            if (data[srcIndex + 3] > OPACITY_THRESHOLD) {
              isValid = true;
            }
          }
        }
      }
      validBlocks[index++] = isValid ? 1 : 0;
    }
  }
  return {validBlocks, blockWidth, blockHeight};
};

export const lerp = (start: number, end: number, t: number) =>
  start + t * (end - start);

// Convert hex color to RGB
export const hexToRgb = (hex: string): {r: number, g: number, b: number} => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return {r, g, b};
};

// Convert RGB to hex color
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Get color based on progress and array of colors
export const getColorFromProgress = (colors: string[], progress: number): string => {
  if (!colors?.length) return '#ffffff';
  if (colors.length === 1) return colors[0];

  // Ensure progress is between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Calculate which segment of the gradient we're in
  const segment = clampedProgress * (colors.length - 1);
  const segmentIndex = Math.floor(segment);

  // Handle edge case when progress is exactly 1
  if (segmentIndex === colors.length - 1) {
    return colors[colors.length - 1];
  }

  // Calculate interpolation value within this segment (0-1)
  const segmentProgress = segment - segmentIndex;

  // Get the two colors to interpolate between
  const color1 = hexToRgb(colors[segmentIndex]);
  const color2 = hexToRgb(colors[segmentIndex + 1]);

  // Interpolate RGB values
  const r = Math.round(lerp(color1.r, color2.r, segmentProgress));
  const g = Math.round(lerp(color1.g, color2.g, segmentProgress));
  const b = Math.round(lerp(color1.b, color2.b, segmentProgress));

  // Convert back to hex
  return rgbToHex(r, g, b);
};

// Get color based on progress with seamless cycling (loops smoothly back to first color)
export const getColorFromProgressCyclic = (colors: string[], progress: number): string => {
  if (!colors?.length) return '#ffffff';
  if (colors.length === 1) return colors[0];

  // Ensure progress is between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // For cyclic colors, we treat the array as a loop where the last color transitions back to the first
  // This means we have colors.length segments instead of colors.length - 1
  const segment = clampedProgress * colors.length;
  const segmentIndex = Math.floor(segment) % colors.length;
  const nextIndex = (segmentIndex + 1) % colors.length;

  // Calculate interpolation value within this segment (0-1)
  const segmentProgress = segment - Math.floor(segment);

  // Get the two colors to interpolate between
  const color1 = hexToRgb(colors[segmentIndex]);
  const color2 = hexToRgb(colors[nextIndex]);

  // Interpolate RGB values
  const r = Math.round(lerp(color1.r, color2.r, segmentProgress));
  const g = Math.round(lerp(color1.g, color2.g, segmentProgress));
  const b = Math.round(lerp(color1.b, color2.b, segmentProgress));

  // Convert back to hex
  return rgbToHex(r, g, b);
};

export const calculateDistance = (point1: Coordinates, point2: Coordinates) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

export const getStartCoordinatesConfig = ({
  dimensions: {width, height},
}: {
  dimensions: Dimensions;
}): Record<StartPositionType, () => Coordinates> => {
  const config: Record<StartPositionType, () => Coordinates> = {
    top: () => ({
      x: Math.random() * width,
      y: 0,
    }),
    center: () => ({
      x: Math.round(width / 2),
      y: Math.round(height / 2),
    }),
    bottom: () => ({
      x: Math.random() * width,
      y: height,
    }),
    random: () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }),
    left: () => ({
      x: 0,
      y: Math.random() * height,
    }),
    right: () => ({
      x: width,
      y: Math.random() * height,
    }),
    'top-left': () => ({
      x: Math.random() * (width / 5),
      y: Math.random() * (height / 5),
    }),
    'top-right': () => ({x: width, y: Math.random() * (height / 5)}),
    'bottom-left': () => ({
      x: Math.random() * (width / 5),
      y: height - Math.random() * (height / 5),
    }),
    'bottom-right': () => ({
      x: width - Math.random() * (width / 5),
      y: height - Math.random() * (height / 5),
    }),
  };
  return config;
};

export const getFontString = (font: FontState) =>
  `${font.italic ? 'italic ' : ''}${font.weight} ${font.fontSize}px '${font.fontFamily
  }'`;

export const getTextBoundaries = (
  particles: Array<Particle>,
  particleRadius: number,
): TextBoundaries => {
  if (particles.length === 0) {
    return {width: 0, height: 0, minX: 0, minY: 0, maxX: 0, maxY: 0};
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  particles.forEach(particle => {
    minX = Math.min(minX, particle.targetX);
    minY = Math.min(minY, particle.targetY);
    maxX = Math.max(maxX, particle.targetX + particleRadius);
    maxY = Math.max(maxY, particle.targetY + particleRadius);
  });

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
};


export const formatCode = (code: string) => {
  return beautify(code, {
    indent_size: 2,
    space_in_empty_paren: false,
    preserve_newlines: true
  });
};  
