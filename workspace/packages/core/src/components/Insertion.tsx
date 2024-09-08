import { getStyleInfo } from '@/caches/getStyleInfo';
import type { SerializedStyles } from '@emotion/react';

type InsertionProps = {
  serialized: SerializedStyles;
};

export const Insertion = ({ serialized }: InsertionProps) => {
  const { emotionCache } = getStyleInfo();
  const className = `${emotionCache.key}-${serialized.name}`;

  let current: SerializedStyles | undefined = serialized;
  let styles = '';
  while (current !== undefined) {
    const maybeStyles = emotionCache.insert(
      serialized === current ? `.${className}` : '',
      current,
      emotionCache.sheet,
      true,
    );

    if (maybeStyles !== undefined) {
      styles += maybeStyles;
    }

    current = current.next;
  }

  if (!styles) {
    return null;
  }

  return (
    <style
      nonce={emotionCache.nonce}
      {...{ dangerouslySetInnerHTML: { __html: styles } }}
    />
  );
};

