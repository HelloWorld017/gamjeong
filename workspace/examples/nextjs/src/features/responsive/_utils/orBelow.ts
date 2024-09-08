import { css } from 'gamjeong/css';
import type { SerializedStyles } from 'gamjeong/css';

export const orBelow = (width: number, style: SerializedStyles): SerializedStyles => css`
  @media (max-width: ${width - 1}px) {
    ${style};
  }
`;
