import { getStyleInfo } from '@/caches/getStyleInfo';

import { GamjeongCacheProvider } from './GamjeongCacheProvider';
import { GamjeongThemeProvider } from './GamjeongThemeProvider';

import type { EmotionCache } from '@emotion/cache';
import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

type GamjeongStyleProviderProps = {
  cache?: EmotionCache;
  theme?: Theme;
  children: ReactNode;
};

export const GamjeongStyleProvider = ({ cache, theme, children }: GamjeongStyleProviderProps) => {
  const gamjeongStyleInfo = getStyleInfo();
  let element = children;
  if (cache) {
    gamjeongStyleInfo.emotionCache = cache;
    element = (
      <GamjeongCacheProvider cache={cache}>
        {element}
      </GamjeongCacheProvider>
    );
  }

  if (theme) {
    gamjeongStyleInfo.theme = theme;
    element = (
      <GamjeongThemeProvider theme={theme}>
        {element}
      </GamjeongThemeProvider>
    );
  }

  return <>{element}</>;
};
