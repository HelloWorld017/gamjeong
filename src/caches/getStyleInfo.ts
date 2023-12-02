import createCache from '@emotion/cache';
import { cache } from 'react';
import type { EmotionCache, Theme } from '@emotion/react';

export type GamjeongStyleInfo = {
  emotionCache: EmotionCache;
  registeredRules: Map<string, string>;
  theme: Theme;
};

export const getStyleInfo = cache(
  (): GamjeongStyleInfo => ({
    emotionCache: createCache({ key: 'css' }),
    registeredRules: new Map(),
    theme: {},
  }),
);

