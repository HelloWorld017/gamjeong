import { BreakPoint, orBelow } from '@/features/responsive';
import { css } from 'gamjeong/css';

export const containerStyle = css`
  max-width: 1300px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;

  ${orBelow(
    BreakPoint.DesktopSmall,
    css`
     padding-left: 16px;
     padding-right: 16px;
    `,
  )};
`;
