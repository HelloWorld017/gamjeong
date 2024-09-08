import { typePropName } from '@/constants/propNames';
import type { ElementType } from 'react';

export const createGamjeongProps =
  <P, T extends ElementType<P>>(type: T, props: P) => ({
    ...props,
    [typePropName]: type,
  });
