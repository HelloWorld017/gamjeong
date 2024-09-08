import { css } from 'gamjeong/css';
import { orBelow } from '@/features/responsive';
import { BreakPoint } from '@/features/responsive';
import type { SerializedStyles } from 'gamjeong/css';

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
  colors: {
    bgBase: string;
    bgElevated: string;
    fillBranding: string;
    fillPrimary: string;
    fillSecondary: string;
    fillTertiary: string;
    fillLine: string;
    fillInverted: string;
    grey600: string;
    grey550: string;
    grey500: string;
    grey400: string;
    grey300: string;
    grey200: string;
    grey100: string;
  }
} & typeof baseTheme;

const baseTheme = {
  typography: {
    fontBase: 'var(--font-geist-sans)',
    fontHeader: 'var(--font-ibm-plex-serif)',
    header1: font([32, 40], [18, 24], 600),
    header2: font([24, 32], [15, 20], 500),
    header3: font([18, 26], [14, 18], 500),
    body1: font([24, 32], [15, 20], 400),
    body2: font([18, 26], [14, 18], 400),
    body3: font([15, 21], [13, 17], 400),
    control: font([16, 24], [14, 18], 500),
  },
};

export const lightTheme = {
  ...baseTheme,
  colorScheme: 'light',
  colors: {
    bgBase: '#f8faff',
    bgElevated: '#e8eaef',
    fillBranding: '#a99d87',
    fillPrimary: '#141414',
    fillSecondary: '#555555',
    fillTertiary: '#a5a5a5',
    fillLine: '#f5f5f5',
    fillInverted: '#ffffff',

    grey600: '#141414',
    grey550: '#555555',
    grey500: '#a5a5a5',
    grey400: '#cccccc',
    grey300: '#e6e6e6',
    grey200: '#f0f0f0',
    grey100: '#f5f5f5',
  }
} satisfies Theme;

export const darkTheme = {
  ...baseTheme,
  colorScheme: 'dark',
  colors: {
    bgBase: '#1a1b1d',
    bgElevated: '#262b36',
    fillBranding: '#fff2d8',
    fillPrimary: '#ffffff',
    fillSecondary: '#becce6',
    fillTertiary: '#818895',
    fillLine: '#24282a',
    fillInverted: '#000000',

    grey600: '#ffffff',
    grey550: '#cccccc',
    grey500: '#555555',
    grey400: '#404040',
    grey300: '#3a3c3f',
    grey200: '#2b2d31',
    grey100: '#161719',
  }
} satisfies Theme;
