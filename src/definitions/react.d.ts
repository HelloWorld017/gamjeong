import type * as React from 'react';

declare module 'react/jsx-runtime' {
  export declare const Fragment: typeof React.Fragment;
  export declare const jsx:
    <P extends object, T extends ElementType<P>>(type: T, props: P, key: string) => JSX.Element;
  export declare const jsxs: typeof jsx;
}
