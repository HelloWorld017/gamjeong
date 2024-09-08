import {BreakPoint, orBelow} from '@/features/responsive';
import { Theme, css } from 'gamjeong/css';

export const lineBreakOnMobileSmallStyle = css`
  display: block;

  ${orBelow(
    BreakPoint.MobileDefault,
    css`
      display: inline;
      &::after {
        content: ' ';
      }
    `
  )};
`;

export const featureItemStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 24px;

  flex: 1 1 0;
  min-width: 0;

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
      gap: 12px;
    `
  )};
`;

export const featureItemIconStyle = (theme: Theme) => css`
  display: inline-flex;
  padding: 16px;
  font-size: 36px;
  color: ${theme.colors.fillPrimary};
  background: ${theme.colors.bgElevated};
  border-radius: 16px;
  flex: 0 0 auto;

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
      font-size: 20px;
      padding: 14px;
    `
  )};
`;

export const featureItemContentsWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const featureItemHeadingStyle = (theme: Theme) => css`
  ${theme.typography.header3};
  color: ${theme.colors.fillPrimary};
`;

export const featureItemContentsStyle = (theme: Theme) => css`
  ${theme.typography.body3};
  color: ${theme.colors.fillTertiary};
`;

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20vh 0 10vh;

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
      padding: 15vh 0 8vh;
    `,
  )};
`;

export const imageStyle = (theme: Theme) => css`
  color: ${theme.colors.fillBranding};
`;

export const headingStyle = (theme: Theme) => css`
  margin-top: 60px;
  font-size: 48px;
  font-size: 5vmin;
  font-family: ${theme.typography.fontHeader};
  color: ${theme.colors.fillBranding};

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
      font-size: 36px;
    `,
  )};
`;

export const sectionStyle = (theme: Theme) => css`
  margin-top: 28px;
  margin-bottom: 48px;

  ${theme.typography.header1};
  color: ${theme.colors.fillTertiary};
  white-space: pre-wrap;
`;

export const featuresStyle = css`
  display: flex;
  gap: 40px;

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
      flex-direction: column;
    `
  )};
`;

export const highlightStyle = (theme: Theme) => css`
  color: ${theme.colors.fillPrimary};
`;

export const buttonsStyle = css`
  display: flex;
  gap: 16px;
  margin-top: 96px;

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
      margin-top: 64px;
    `,
  )};
`;

export const buttonStyle = (isPrimary: boolean) => (theme: Theme) => css`
  padding: 12px 20px;
  border-radius: 16px;
  background: ${isPrimary ? theme.colors.fillBranding: theme.colors.bgElevated};
  color: ${isPrimary ? theme.colors.fillInverted : theme.colors.fillPrimary};

  display: inline-flex;
  align-items: center;
  text-align: center;

  ${theme.typography.control};
`;
