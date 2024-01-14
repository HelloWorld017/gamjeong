import { StyleProvider } from '@/features/theme';
import { Footer } from './_components/Footer';
import type { ReactNode } from 'react';

export default ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
    </head>
    <body>
      <StyleProvider>
        {children}
        <Footer />
      </StyleProvider>
    </body>
  </html>
);
