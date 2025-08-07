import {EasingType} from "./interfaces";

const quadraticOut = (t: number) => t * (2 - t);

export const easingConfig: Record<EasingType, (t: number) => number> = {
  'ease-in-out': (t) => t * (2 - t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'linear': (t) => t,
  'quadratic-out': quadraticOut
}

export const getEasingOptions = () => Object.keys(easingConfig).map((key) => ({
  value: key,
  label: key.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}))
