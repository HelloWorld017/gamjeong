import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';

export const footerStyle = (theme: Theme) =>  css`
  border-top: 1px solid ${theme.colors.bgLine};
`;
