import { css } from 'gamjeong/css';
import type { Theme } from 'gamjeong/css';

export const footerStyle = (theme: Theme) =>  css`
  border-top: 1px solid ${theme.colors.bgLine};
  padding: 30px 100px;
`;
