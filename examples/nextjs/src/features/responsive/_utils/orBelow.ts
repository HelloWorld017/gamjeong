import { css } from 'gamjeong';
import type { SerializedStyles } from 'gamjeong';

export const orBelow = (width: number, style: SerializedStyles): SerializedStyles => css`
  @media (max-width: ${width - 1}px) {
    ${style};
  }
`;
