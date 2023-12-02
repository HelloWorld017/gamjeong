'use client';

import { CacheProvider } from '@emotion/react';

import type { EmotionCache } from '@emotion/cache';
import type { ReactNode } from 'react';

type GamjeongCacheProviderVanillaProps = {
  cache: EmotionCache;
  children: ReactNode;
};

export const GamjeongCacheProviderVanilla = ({ cache, children }: GamjeongCacheProviderVanillaProps) => (
  <CacheProvider value={cache}>
    {children}
  </CacheProvider>
);
