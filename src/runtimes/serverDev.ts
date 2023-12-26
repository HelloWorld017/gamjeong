import { createGamjeongProps } from '@/utils/createGamjeongProps';
import { Gamjeong } from '@/components/Gamjeong';
import * as ReactJSXDevRuntime from 'react/jsx-dev-runtime';

export const Fragment = ReactJSXDevRuntime.Fragment;

export const jsxDEV: typeof ReactJSXDevRuntime.jsxDEV = (type, props, key, isStaticChildren, source, self) => {
  if (!Object.hasOwn(props, 'css')) {
    return ReactJSXDevRuntime.jsxDEV(
      type,
      props,
      key,
      isStaticChildren,
      source,
      self
    );
  }

  return ReactJSXDevRuntime.jsxDEV(
    Gamjeong,
    createGamjeongProps(type, props),
    key,
    isStaticChildren,
    source,
    self
  );
}
