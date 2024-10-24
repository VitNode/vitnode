import { TranslationsProvider } from 'vitnode-frontend/components/translations-provider';
import { AuthLayout } from 'vitnode-frontend/views/layout/auth/auth-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TranslationsProvider namespaces={[]}>
      <AuthLayout>{children}</AuthLayout>
    </TranslationsProvider>
  );
}
