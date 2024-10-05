import React from 'react';
import 'vitnode-frontend/admin/css';
import { TranslationsProvider } from 'vitnode-frontend/components/translations-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TranslationsProvider namespaces={[]}>{children}</TranslationsProvider>
  );
}
