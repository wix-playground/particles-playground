import {EasingType} from "./interfaces";

const quadraticOut = (t: number) => t * (2 - t);

export const easingConfig: Record<EasingType, (t: number) => number> = {
  'ease-in-out': (t) => t * (2 - t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'linear': (t) => t,
  'quadratic-out': quadraticOut
}
