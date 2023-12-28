import { css } from 'gamjeong';
import { orBelow } from '@/features/responsive';
import { BreakPoint } from '@/features/responsive';
import type { SerializedStyles } from 'gamjeong';

type FontTuple<FontSize extends number, LineHeight extends number> = [FontSize, LineHeight];
const font = <DF extends number, DL extends number, MF extends number, ML extends number, W extends number>(
  [desktopFontSize, desktopLineHeight]: FontTuple<DF, DL>,
  [mobileFontSize, mobileLineHeight]: FontTuple<MF, ML>,
  fontWeight: W,
) =>
  css`
    font-size: ${desktopFontSize}px;
    line-height: ${desktopLineHeight}px;
    font-weight: ${fontWeight};

    ${orBelow(
      BreakPoint.DesktopSmall,
      css`
        font-size: ${mobileFontSize}px;
        line-height: ${mobileLineHeight}px;
      `,
    )};
  ` as SerializedStyles & {
    _font?: {
      desktop: `${DF}/${DL}`;
      mobile: `${MF}/${ML}`;
      weight: W;
    };
  };

export type Theme = {
  colorScheme: 'light' | 'dark';
  typography: {
    font: string;
    header1: SerializedStyles;
    body1: SerializedStyles;
  },
  colors: {
    bgBase: string;
    bgLine: string;
    fillPrimary: string;
    grey600: string;
    grey550: string;
    grey500: string;
    grey400: string;
    grey300: string;
    grey200: string;
    grey100: string;
  }
};

export const lightTheme = {
  typography: {
    font: 'var(--font-geist-sans)',
    header1: font([32, 40], [18, 24], 700),
    body1: font([15, 21], [13, 17], 700),
  },
  colorScheme: 'light',
  colors: {
    bgBase: '#ffffff',
    bgLine: '#f5f5f5',
    fillPrimary: '#141414',

    grey600: '#141414',
    grey550: '#555555',
    grey500: '#a5a5a5',
    grey400: '#cccccc',
    grey300: '#e6e6e6',
    grey200: '#f0f0f0',
    grey100: '#f5f5f5',
  }
} satisfies Theme;
