'use client';

import { ThemeProvider } from '@emotion/react';

import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

export type GamjeongThemeProviderProps = {
  theme: Theme;
  children: ReactNode;
};

export const GamjeongThemeProvider = ({ theme, children }: GamjeongThemeProviderProps) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);
