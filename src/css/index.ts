import { serializeStyles } from '@emotion/serialize';
import type { Interpolation, Keyframes } from '@emotion/serialize';
import type { Theme } from '@emotion/react';

export * from './components';

export const css = (...args: Interpolation<Theme>[]) => serializeStyles(args);
export const keyframes = (...args: Interpolation<Theme>[]): Keyframes => {
  const insertable = css(...args);
  const name = `animation-${insertable.name}`;

  return {
    name,
    styles: `@keyframes ${name}{${insertable.styles}}`,
    anim: 1,
    toString() {
      return `_EMO_${this.name}_${this.styles}_EMO_`
    }
  } as Keyframes;
};

export type {
  ArrayClassNamesArg,
  ArrayInterpolation,
  CSSObject,
  ClassNamesArg,
  ClassNamesProps,
  ClassNamesContent,
  ComponentSelector,
  DistributiveOmit,
  EmotionCache,
  FunctionInterpolation,
  GlobalProps,
  Interpolation,
  Keyframes,
  PropsOf,
  SerializedStyles,
  Theme,
  ThemeProviderProps,
} from '@emotion/react';
