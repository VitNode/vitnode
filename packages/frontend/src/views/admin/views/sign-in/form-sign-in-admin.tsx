'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

import { useSignInAdminView } from '@/hooks/core/sign/in/use-sign-in-admin-view';
import { CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoForm } from '@/components/form/auto-form';

export const FormSignInAdmin = () => {
  const t = useTranslations('core');
  const { error, onSubmit, formSchema } = useSignInAdminView();

  return (
    <CardContent className="p-6">
      {error?.extensions?.code === 'ACCESS_DENIED' && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>{t('sign_in.error.title')}</AlertTitle>
          <AlertDescription>{t('sign_in.error.desc')}</AlertDescription>
        </Alert>
      )}

      <AutoForm
        formSchema={formSchema}
        fieldConfig={{
          email: {
            label: t('sign_in.form.email.label'),
            fieldType: props => <AutoFormInput type="email" {...props} />,
          },
          password: {
            label: t('sign_in.form.password.label'),
            fieldType: props => <AutoFormInput type="password" {...props} />,
          },
        }}
        onSubmit={onSubmit}
        submitButton={props => (
          <Button className="w-full" {...props}>
            {t('sign_in.form.submit')}
          </Button>
        )}
      />
    </CardContent>
  );
};
