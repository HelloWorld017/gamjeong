import { getStyleInfo } from '@/caches/getStyleInfo';

import { serializeStyles } from '@emotion/serialize';
import { typePropName } from '@/constants/propNames';

import { Insertion } from './Insertion';

import type { Interpolation, Theme } from '@emotion/react';
import type { ElementType, FunctionComponent } from 'react';

type GamjeongProps<P, T extends ElementType<P>> = Omit<P, 'css'> & {
  css: Interpolation<Theme>;
  [typePropName]: T;
};

export const Gamjeong = <P extends { css: never; className?: string }, T extends ElementType<P>>({
  css,
  [typePropName]: type,
  ...props
}: GamjeongProps<P, T>) => {
  const { emotionCache, theme } = getStyleInfo();
  const cssRules = [css];
  let classNames = '';

  if (typeof props.className === 'string') {
    props.className.split(' ').forEach(serializedName => {
      if (Object.hasOwn(emotionCache.registered, serializedName)) {
        cssRules.push(emotionCache.registered[serializedName]);
        return;
      }

      classNames += `${serializedName} `;
    });
  } else if (props.className != null) {
    classNames = `${props.className} `;
  }

  const serialized = serializeStyles(cssRules, emotionCache.registered, theme);
  classNames += `${emotionCache.key}-${serialized.name}`;

  const WrappedComponent = type as FunctionComponent<Record<string, unknown>>;
  return (
    <>
      <Insertion serialized={serialized} />
      <WrappedComponent className={classNames} {...props} />
    </>
  );
};
