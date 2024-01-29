import { BreakPoint, greaterThan } from '@/features/responsive';
import { Theme, css } from 'gamjeong/css';

export const homeStyle = (theme: Theme) => css`
  background: transparent;
  color: ${theme.colors.fillBranding};
  font-family: ${theme.typography.fontHeader};
  ${theme.typography.header3};

  &:hover {
    color: ${theme.colors.fillBranding};
  }
`;

export const asideStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;

  min-width: 250px;
  flex: 0 0 auto;

  ${greaterThan(
    BreakPoint.DesktopSmall,
    css`
      border-right: 1px solid ${theme.colors.fillLine};
      padding-right: 32px;
    `
  )};
`;

export const asideItemStyle = (isActive: boolean) => (theme: Theme) => css`
  ${theme.typography.body3};
  padding: 8px 12px;
  border-radius: 8px;

  background: ${isActive ? theme.colors.bgElevated : theme.colors.bgBase};
  color: ${isActive ? theme.colors.fillPrimary : theme.colors.fillTertiary};
  transition: all .4s ease;

  &:hover {
    color: ${theme.colors.fillPrimary};
  }
`;
