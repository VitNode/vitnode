import { Card } from 'vitnode-frontend/components/ui/card';
import { LogoVitNode } from 'vitnode-frontend/components/logo-vitnode';
import { PoweredByVitNode } from 'vitnode-frontend/views/global';

import { FormSignInAdmin } from './form/form-sign-in-admin';

export const SignInAdminView = () => {
  return (
    <div className="mx-auto my-10 flex max-w-lg flex-col gap-10 py-10">
      <header className="flex justify-center">
        <LogoVitNode className="h-16" />
      </header>

      <Card>
        <FormSignInAdmin />
      </Card>

      <footer className="text-center text-sm">
        <PoweredByVitNode className="text-muted-foreground no-underline" />
      </footer>
    </div>
  );
};
