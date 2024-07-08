import { RootProvider } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import './global.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
