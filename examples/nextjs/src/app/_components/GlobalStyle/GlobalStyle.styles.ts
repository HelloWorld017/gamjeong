import { Theme, css } from 'gamjeong/css';

export const layoutStyle = (theme: Theme) => css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font: inherit;
    letter-spacing: -0.01em;
  }

  html, body {
    background: ${theme.colors.bgBase};
    font-family: ${theme.typography.fontBase};
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    &:where(:link, :visited) {
      color: inherit;
    }

    text-decoration: none;
  }
`;
