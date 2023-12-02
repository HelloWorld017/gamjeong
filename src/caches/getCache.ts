import createCache from '@emotion/cache';

import { cache } from 'react';

import type { EmotionCache } from '@emotion/react';

export type GamjeongCache = {
  emotionCache: EmotionCache;
  registeredRules: Map<string, string>;
};

export const getCache = cache(
  (): GamjeongCache => ({
    emotionCache: createCache({ key: 'g' }),
    registeredRules: new Map(),
  })
);
