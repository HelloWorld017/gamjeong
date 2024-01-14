import { lightTheme } from '../../_constants/theme';
import { ClientStyleProvider } from './ClientStyleProvider';
import { GamjeongServerStyleProvider } from 'gamjeong';
import type { ReactNode } from 'react';

type StyleProviderProps = {
  children: ReactNode;
};

export const StyleProvider = ({ children }: StyleProviderProps) => (
  <GamjeongServerStyleProvider theme={lightTheme}>
    <ClientStyleProvider>
      {children}
    </ClientStyleProvider>
  </GamjeongServerStyleProvider>
);
