import { serializeStyles } from '@emotion/serialize';
import type { Interpolation, Keyframes } from '@emotion/serialize';
import type { Theme } from '@emotion/react';

export const css = (...args: (TemplateStringsArray | Interpolation<Theme>)[]) => serializeStyles(args);
export const keyframes = (...args: (TemplateStringsArray | Interpolation<Theme>)[]): Keyframes => {
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

