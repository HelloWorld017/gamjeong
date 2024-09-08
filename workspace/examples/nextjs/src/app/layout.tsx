import { IBM_Plex_Serif } from 'next/font/google';
import { GlobalStyle } from './_components/GlobalStyle';
import { Footer } from './_components/Footer';
import { StyleProvider } from '@/features/theme';
import type { ReactNode } from 'react';
import * as styles from './layout.styles';

const IBMPlexSerif = IBM_Plex_Serif({ weight: '700', subsets: ['latin'], variable: '--font-ibm-plex-serif' });

export default ({ children }: { children: ReactNode }) => (
  <html lang="en" className={`${IBMPlexSerif.variable}`}>
    <head>
    </head>
    <body>
      <StyleProvider>
        <GlobalStyle />
          <div css={styles.containerStyle}>
          {children}
          </div>
        <Footer />
      </StyleProvider>
    </body>
  </html>
);
