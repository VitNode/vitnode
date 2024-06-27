import * as React from 'react';
import { AuthLayout } from 'vitnode-frontend/views/auth-layout';
import { ThemeLayout } from 'vitnode-frontend/views/theme/layout';

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function Layout({ children }: Props) {
  return (
    <AuthLayout>
      <ThemeLayout>{children}</ThemeLayout>
    </AuthLayout>
  );
}
