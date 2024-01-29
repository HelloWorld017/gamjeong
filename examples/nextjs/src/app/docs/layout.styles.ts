import { Theme, css } from 'gamjeong/css';

export const containerStyle = css`
  padding: 64px 0;
  display: flex;
  gap: 32px;
`;

export const contentsStyle = (theme: Theme) => css`
  ${theme.typography.body3};
  color: ${theme.colors.fillPrimary};

  h1 {
    ${theme.typography.header1};
    margin-bottom: 12px;
  }

  h2 {
    ${theme.typography.header2};
    margin-bottom: 12px;
  }

  h3 {
    ${theme.typography.header3};
    margin-bottom: 12px;
  }
`;
