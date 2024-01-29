import { css } from 'gamjeong/css';
import type { SerializedStyles } from 'gamjeong/css';

export const greaterThan = (width: number, style: SerializedStyles): SerializedStyles => css`
  @media (min-width: ${width - 1}px) {
    ${style};
  }
`;
