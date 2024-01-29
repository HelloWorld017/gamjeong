import { containerStyle } from '../../layout.styles';
import { css } from 'gamjeong/css';
import type { Theme } from 'gamjeong/css';

export const footerStyle = (theme: Theme) =>  css`
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: 1px solid ${theme.colors.fillLine};
`;

export const footerContentStyle = css`
  display: flex;
  ${containerStyle};
`;

export const brandingStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${theme.typography.header2};
  font-family: ${theme.typography.fontHeader};
  color: ${theme.colors.fillPrimary};
`;

export const brandingIconStyle = css`
  width: 1em;
  height: 1em;
  margin-right: 10px;
`;

export const sectionStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const sectionHeaderStyle = (theme: Theme) => css`
  ${theme.typography.header3};
  color: ${theme.colors.fillPrimary};
  padding-bottom: 8px;
`;

export const sectionItemStyle = (theme: Theme) => css`
  ${theme.typography.body3};

  color: ${theme.colors.fillTertiary};
`;
