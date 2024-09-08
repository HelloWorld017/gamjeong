import { StyleProvider } from '@/features/theme';
import { Aside } from './_components/Aside';
import type { PropsWithChildren } from 'react';
import * as styles from './layout.styles';

export default ({ children }: PropsWithChildren) => (
  <StyleProvider>
    <div css={styles.containerStyle}>
      <Aside />
      <main css={styles.contentsStyle}>
        {children}
      </main>
    </div>
  </StyleProvider>
);
