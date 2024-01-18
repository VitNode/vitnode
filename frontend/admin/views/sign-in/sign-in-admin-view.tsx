import { useTranslations } from 'next-intl';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSignInAdmin } from './form/form-sign-in-admin';
import { LogoVitNode } from '@/components/logo-vitnode';
import { PoweredByVitNode } from '@/admin/global/powered-by';

export const SignInAdminView = () => {
  const t = useTranslations('admin');

  return (
    <div className="max-w-[32rem] mx-auto my-10 py-10 flex flex-col gap-5">
      <header className="flex justify-center">
        <LogoVitNode className="h-16" />
      </header>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
        </CardHeader>
        <FormSignInAdmin />
      </Card>

      <footer className="text-center text-sm">
        <PoweredByVitNode className="text-muted-foreground no-underline" />
      </footer>
    </div>
  );
};
