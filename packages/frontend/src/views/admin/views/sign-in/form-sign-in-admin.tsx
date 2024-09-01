'use client';

import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { useSignInAdminView } from '@/hooks/core/sign/in/use-sign-in-admin-view';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const FormSignInAdmin = () => {
  const t = useTranslations('core');
  const { error, onSubmit, formSchema } = useSignInAdminView();

  return (
    <CardContent className="p-6">
      {error === 'ACCESS_DENIED' && (
        <Alert className="mb-6" variant="error">
          <AlertCircle className="size-4" />
          <AlertTitle>{t('sign_in.error.title')}</AlertTitle>
          <AlertDescription>{t('sign_in.error.desc')}</AlertDescription>
        </Alert>
      )}

      <AutoForm
        fields={[
          {
            id: 'email',
            component: AutoFormInput,
            componentProps: {
              type: 'email',
            } as AutoFormInputProps,
            label: t('sign_in.form.email.label'),
          },
          {
            id: 'password',
            component: AutoFormInput,
            componentProps: {
              type: 'password',
            } as AutoFormInputProps,
            label: t('sign_in.form.password.label'),
          },
        ]}
        formSchema={formSchema}
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
