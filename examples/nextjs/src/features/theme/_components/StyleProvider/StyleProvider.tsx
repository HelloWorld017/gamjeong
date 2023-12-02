import { lightTheme } from '../../_constants/theme';
import { GamjeongStyleProvider } from 'gamjeong';
import type { ReactNode } from 'react';

type StyleProviderProps = {
  children: ReactNode;
};

export const StyleProvider = ({ children }: StyleProviderProps) => (
  <GamjeongStyleProvider theme={lightTheme}>
    {children}
  </GamjeongStyleProvider>
);
