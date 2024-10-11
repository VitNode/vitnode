import React from 'react';
import { TranslationsProvider } from 'vitnode-frontend/components/translations-provider';

import './global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TranslationsProvider namespaces={[]}>{children}</TranslationsProvider>
  );
}
