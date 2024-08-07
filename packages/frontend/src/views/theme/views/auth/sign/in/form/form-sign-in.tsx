'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';
import React from 'react';

import { CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useSignInView } from '@/hooks/core/sign/in/use-sign-in-view';
import { AutoForm } from '@/components/ui/auto-form';

export const FormSignIn = () => {
  const t = useTranslations('core');
  const { error, formSchema, onSubmit } = useSignInView();

  return (
    <CardContent>
      {error && (
        <div className="mb-6 space-y-4">
          {error?.extensions?.code === 'ACCESS_DENIED' && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>{t('sign_in.error.title')}</AlertTitle>
              <AlertDescription>{t('sign_in.error.desc')}</AlertDescription>
            </Alert>
          )}

          {error && error.extensions?.code !== 'ACCESS_DENIED' && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertTitle>{t('errors.title')}</AlertTitle>
              <AlertDescription>
                {t('errors.internal_server_error')}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <AutoForm
        formSchema={formSchema}
        fieldConfig={{
          email: {
            label: t('sign_in.form.email.label'),
            inputProps: {
              type: 'email',
            },
          },
          password: {
            label: t('sign_in.form.password.label'),
            inputProps: {
              type: 'password',
            },
          },
          remember: {
            label: t('sign_in.form.remember.label'),
            description: t('sign_in.form.remember.desc'),
            fieldType: 'checkbox',
          },
        }}
        onSubmit={onSubmit}
        submitButton={props => (
          <Button {...props} className="w-full">
            {t('sign_in.form.submit')}
          </Button>
        )}
      />
    </CardContent>
  );
};
