'use client';

import { darkTheme } from '../../_constants/theme';
import { GamjeongClientStyleProvider } from 'gamjeong';
import type { ReactNode } from 'react';

type StyleProviderProps = {
  children: ReactNode;
};

export const ClientStyleProvider = ({ children }: StyleProviderProps) => (
  <GamjeongClientStyleProvider theme={darkTheme}>
    {children}
  </GamjeongClientStyleProvider>
);
