import { LogoVitNode } from '@/components/logo-vitnode';
import { TranslationsProvider } from '@/components/translations-provider';

import { FormSignInAdmin } from './form-sign-in-admin';

export const SignInAdminView = () => {
  return (
    <TranslationsProvider namespaces="core.sign_in">
      <div className="mx-auto my-10 flex max-w-md flex-col gap-10 py-10">
        <header className="flex justify-center">
          <LogoVitNode className="h-16" />
        </header>

        <FormSignInAdmin />
      </div>
    </TranslationsProvider>
  );
};
