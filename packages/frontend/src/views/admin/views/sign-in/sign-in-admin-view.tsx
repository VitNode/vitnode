import { LogoVitNode } from '@/components/logo-vitnode';
import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';

import { FormSignInAdmin } from './form-sign-in-admin';

export const SignInAdminView = () => {
  return (
    <TranslationsProvider namespaces={['core.sign_in']}>
      <div className="mx-auto my-10 flex max-w-lg flex-col gap-10 py-10">
        <header className="flex justify-center">
          <LogoVitNode className="h-16" />
        </header>

        <Card>
          <FormSignInAdmin />
        </Card>
      </div>
    </TranslationsProvider>
  );
};
