import { createGamjeongProps } from '@/utils/createGamjeongProps';
import { Gamjeong } from '@/components/Gamjeong';
import { Fragment, jsx as reactJSX, jsxs as reactJSXs } from 'react/jsx-runtime';

export { Fragment };
export const jsx: typeof reactJSX = (type, props, key) => {
  if (!Object.hasOwn(props, 'css')) {
    return reactJSX(type, props, key)
  }

  return reactJSX(Gamjeong, createGamjeongProps(type, props), key)
}

export const jsxs: typeof reactJSXs = (type, props, key) => {
  if (!Object.hasOwn(props, 'css')) {
    return reactJSXs(type, props, key);
  }

  return reactJSXs(Gamjeong, createGamjeongProps(type, props), key);
}
