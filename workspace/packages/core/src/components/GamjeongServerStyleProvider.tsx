import { getStyleInfo } from '@/caches/getStyleInfo';

import type { EmotionCache } from '@emotion/cache';
import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

type GamjeongServerStyleProviderProps = {
  cache?: EmotionCache;
  theme?: Theme;
  children: ReactNode;
};

export const GamjeongServerStyleProvider = ({ cache, theme, children }: GamjeongServerStyleProviderProps) => {
  const gamjeongStyleInfo = getStyleInfo();
  let element = children;
  if (cache) {
    gamjeongStyleInfo.emotionCache = cache;
  }

  if (theme) {
    gamjeongStyleInfo.theme = theme;
  }

  return <>{element}</>;
};
