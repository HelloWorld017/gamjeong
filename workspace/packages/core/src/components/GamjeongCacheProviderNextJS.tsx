'use client';

import { useMemo, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';

import { CacheProvider } from '@emotion/react';

import type { EmotionCache } from '@emotion/cache';
import type { ReactNode } from 'react';

type GamjeongCacheProviderNextJSProps = {
  cache: EmotionCache;
  children: ReactNode;
};

export const GamjeongCacheProviderNextJS = ({ cache, children }: GamjeongCacheProviderNextJSProps) => {
  const [flushedKeys] = useState(() => new Set());
  const clientCache = useMemo(() => ({ ...cache, compat: true as const }), [cache]);

  useServerInsertedHTML(() => {
    const cacheKeys = Object.keys(cache.inserted);
    const unflushedKeys = cacheKeys.filter(key => !flushedKeys.has(key));
    const unflushedContents = unflushedKeys.map(unflushedKey => cache.inserted[unflushedKey]);
    const output = (
      <style
        data-emotion={`${cache.key} ${unflushedKeys.join(' ')}`}
        nonce={cache.nonce}
        {...{ dangerouslySetInnerHTML: { __html: unflushedContents.join(' ') } }}
      />
    );

    unflushedKeys.forEach(unflushedKey => flushedKeys.add(unflushedKey));
    return output;
  });

  return <CacheProvider value={clientCache}>{children}</CacheProvider>;
};
