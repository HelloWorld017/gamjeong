'use client';

import { exhaustive } from '@/utils/exhaustive';

import { GamjeongCacheProviderNextJS } from './GamjeongCacheProviderNextJS';
import { GamjeongCacheProviderVanilla } from './GamjeongCacheProviderVanilla';

import type { EmotionCache } from '@emotion/cache';
import type { ReactNode } from 'react';

type GamjeongCacheProviderProps = {
  cache: EmotionCache;
  children: ReactNode;
};

export const GamjeongCacheProvider = ({ cache, children }: GamjeongCacheProviderProps) =>
  __FRAMEWORK__ === 'nextjs' ? (
    <GamjeongCacheProviderNextJS cache={cache}>
      {children}
    </GamjeongCacheProviderNextJS>
  ) :
  __FRAMEWORK__ === 'vanilla' ? (
    <GamjeongCacheProviderVanilla cache={cache}>
      {children}
    </GamjeongCacheProviderVanilla>
  ) :
  exhaustive(__FRAMEWORK__);
