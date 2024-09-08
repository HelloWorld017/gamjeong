declare module '*.react.svg' {
  import { FunctionComponent } from 'react';

  declare const ReactComponent: FunctionComponent<JSX.IntrinsicElements['svg']>;
  export default ReactComponent;
}

declare module '*svg' {
  import { StaticImageData } from 'next/image';

  declare const content: StaticImageData;
  export default content;
}
