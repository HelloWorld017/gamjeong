'use client';

import {
  CacheProvider as ECacheProvider,
  ClassNames as EClassNames,
  Global as EGlobal,
  ThemeProvider as EThemeProvider,
} from '@emotion/react';

/*
 * rollup hoists these dependencies to the entry module
 * use bogus function to prevent rollup analyzing the re-export
 */
const doNothing = <T,>(value: T) => value;
export const CacheProvider = /* #__PURE__ */doNothing(ECacheProvider);
export const ClassNames = /* #__PURE__ */doNothing(EClassNames);
export const Global = /* #__PURE__ */doNothing(EGlobal);
export const ThemeProvider = /* #__PURE__ */doNothing(EThemeProvider);
