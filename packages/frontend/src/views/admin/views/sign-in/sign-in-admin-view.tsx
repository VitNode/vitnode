import { LogoVitNode } from '@/components/logo-vitnode';
import { Card } from '@/components/ui/card';

import { FormSignInAdmin } from './form-sign-in-admin';

export const SignInAdminView = () => {
  return (
    <div className="mx-auto my-10 flex max-w-lg flex-col gap-10 py-10">
      <header className="flex justify-center">
        <LogoVitNode className="h-16" />
      </header>

      <Card>
        <FormSignInAdmin />
      </Card>
    </div>
  );
};
