'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormCheckbox } from '@/components/form/fields/checkbox';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useSignInView } from '@/hooks/core/sign/in/use-sign-in-view';
import { AlertCircle, LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export const FormSignIn = () => {
  const t = useTranslations('core');
  const { error, formSchema, onSubmit } = useSignInView();

  return (
    <>
      {error && (
        <div className="mb-6 space-y-4">
          {error === 'ACCESS_DENIED' && (
            <Alert variant="error">
              <AlertCircle className="size-4" />
              <AlertTitle>{t('sign_in.error.title')}</AlertTitle>
              <AlertDescription>{t('sign_in.error.desc')}</AlertDescription>
            </Alert>
          )}

          {error !== 'ACCESS_DENIED' && (
            <Alert variant="error">
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
        fields={[
          {
            id: 'email',
            label: t('sign_in.form.email.label'),
            component: AutoFormInput,
            componentProps: {
              type: 'email',
              className: 'bg-card shadow-sm',
            } as AutoFormInputProps,
          },
          {
            id: 'password',
            label: t('sign_in.form.password.label'),
            component: AutoFormInput,
            componentProps: {
              type: 'password',
              className: 'bg-card shadow-sm',
            } as AutoFormInputProps,
          },
          {
            id: 'remember',
            label: t('sign_in.form.remember.label'),
            description: t('sign_in.form.remember.desc'),
            component: AutoFormCheckbox,
            className: 'bg-card',
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <Button {...props} className="w-full">
            <LogIn /> {t('sign_in.form.submit')}
          </Button>
        )}
      />
    </>
  );
};
