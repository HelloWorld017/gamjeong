import { GamjeongThemeProvider } from './GamjeongThemeProvider';
import { GamjeongCacheProvider } from './GamjeongCacheProvider';
import type { EmotionCache, Theme } from '@emotion/react';
import type { ReactNode } from 'react';

type GamjeongClientStyleProviderProps = {
  cache?: EmotionCache;
  theme?: Theme;
  children: ReactNode;
};

export const GamjeongClientStyleProvider = ({ cache, theme, children }: GamjeongClientStyleProviderProps) => {
  let element = children;
  if (cache) {
    element = (
      <GamjeongCacheProvider cache={cache}>
        {element}
      </GamjeongCacheProvider>
    );
  }

  if (theme) {
    element = (
      <GamjeongThemeProvider theme={theme}>
        {element}
      </GamjeongThemeProvider>
    );
  }

  return <>{element}</>;
};
