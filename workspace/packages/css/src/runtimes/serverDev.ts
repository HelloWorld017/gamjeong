import { createGamjeongProps } from '@/utils/createGamjeongProps';
import { Gamjeong } from '@/components/Gamjeong';
import { Fragment, jsxDEV as reactJSXDev } from 'react/jsx-dev-runtime';

export { Fragment };
export const jsxDEV: typeof reactJSXDev = (type, props, key, isStaticChildren, source, self) => {
  if (!Object.hasOwn(props, 'css')) {
    return reactJSXDev(
      type,
      props,
      key,
      isStaticChildren,
      source,
      self
    );
  }

  return reactJSXDev(
    Gamjeong,
    createGamjeongProps(type, props),
    key,
    isStaticChildren,
    source,
    self
  );
}
