import { createGamjeongProps } from '@/utils/createGamjeongProps';
import { Gamjeong } from '@/components/Gamjeong';
import * as ReactJSXRuntime from 'react/jsx-runtime';

export const Fragment = ReactJSXRuntime.Fragment;

export const jsx: typeof ReactJSXRuntime.jsx = (type, props, key) => {
  if (!Object.hasOwn(props, 'css')) {
    return ReactJSXRuntime.jsx(type, props, key)
  }

  return ReactJSXRuntime.jsx(Gamjeong, createGamjeongProps(type, props), key)
}

export const jsxs: typeof ReactJSXRuntime.jsxs = (type, props, key) => {
  if (!Object.hasOwn(props, 'css')) {
    return ReactJSXRuntime.jsxs(type, props, key);
  }

  return ReactJSXRuntime.jsxs(Gamjeong, createGamjeongProps(type, props), key);
}
