import {EasingType} from "./interfaces";

export const easingConfig: Record<EasingType, (t: number) => number> = {
  'ease-in-out': (t) => t * (2 - t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'linear': (t) => t,
  'quadratic-out': (t: number) => t * (2 - t),
  'ease-out-quart': (t) => 1 - Math.pow(1 - t, 4),
  'ease-in-out-quint': (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  'ease-in-quart': (t) => t * t * t * t,
}

export const easingConfigString = `{
  'ease-in-out': (t) => t * (2 - t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'linear': (t) => t,
  'quadratic-out': (t) => t * (2 - t),
  'ease-out-quart': (t) => 1 - Math.pow(1 - t, 4),
  'ease-in-out-quint': (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  'ease-in-quart': (t) => t * t * t * t,
}`

export const getEasingOptions = () => Object.keys(easingConfig).map((key) => ({
  value: key,
  label: key.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}))
