import {Theme, css} from "@emotion/react";

const blockquoteStyle = (theme: Theme) => css`
  position: relative;
  padding: 0.75rem 1.75rem;
  margin-left: 0;
  color: ${theme.colors.fillPrimary};
  font-size: 1.15rem;
  line-height: 1.8rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.23rem;
    border-radius: 0.5rem;
    background: ${theme.colors.fillLine};
  }

  & > p:first-of-type {
    margin-top: 0;
  }

  & > p:last-of-type {
    margin-bottom: 0;
  }
`;

const dividerStyle = (theme: Theme) => css`
  margin: 1rem 0;
  border: none;
  border-bottom: 3px solid var(${theme.colors.fillLine});
`;

const listItemStyle = css`
  padding: 0.25rem 0;
`;

const orderedListStyle = css`
  padding-top: 0.25rem;
  padding-left: 1rem;
`;

const unorderedListStyle = css`
  padding-top: 0.25rem;
  padding-left: 1rem;
`;

const paragraphStyle = css`
  margin: 1rem 0;
  line-height: 1.5rem;
  letter-spacing: -0.02em;
`;

const strongStyle = css`
  font-weight: 600;
`;

export const documentStyle = (theme: Theme) => css`
  b, strong { ${strongStyle} };
  blockquote { ${blockquoteStyle(theme)} };
  hr { ${dividerStyle(theme)} };
  li { ${listItemStyle } };
  ol { ${orderedListStyle} };
  ul { ${unorderedListStyle} };
  p { ${paragraphStyle} };
`;
