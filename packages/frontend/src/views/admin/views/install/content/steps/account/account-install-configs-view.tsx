'use client';

import { AutoForm } from '@/components/auto-form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/auto-form/fields/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { useSignUpView } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';

export const AccountInstallConfigsView = () => {
  const t = useTranslations('core');
  const { onSubmit, formSchema } = useSignUpView();
  const { setCurrentStep } = useInstallVitnode();

  return (
    <AutoForm
      className="max-w-2xl p-6 pt-0"
      fields={[
        {
          id: 'name',
          label: t('sign_up.form.name.label'),
          description: t('sign_up.form.name.desc'),
          component: AutoFormInput,
          childComponent: ({ field }) => {
            const value: string = field.value ?? '';
            if (!value.length) return null;

            return (
              <span className="text-muted-foreground mt-1 block max-w-md truncate text-sm">
                {t.rich('sign_up.form.name.your_id', {
                  id: () => (
                    <span className="text-foreground font-medium">
                      {removeSpecialCharacters(value)}
                    </span>
                  ),
                })}
              </span>
            );
          },
        },
        {
          id: 'email',
          component: AutoFormInput,
          componentProps: {
            type: 'email',
          } as AutoFormInputProps,
          label: t('sign_up.form.email.label'),
        },
        {
          id: 'password',
          label: t('sign_up.form.password.label'),
          description: t('sign_up.form.password.desc'),
          component: AutoFormInput,
          componentProps: {
            type: 'password',
          } as AutoFormInputProps,
          childComponent: ({ field }) => {
            const value: string = field.value ?? '';
            const regexArray = [
              /^.{8,}$/, // Min 8 characters
              /[a-z]/, // Min 1 lowercase
              /[A-Z]/, // Min 1 uppercase
              /\d/, // Min 1 digit
              /\W|_/, // Min 1 special character
            ];

            const passRegexPassword = regexArray.reduce((acc, regex) => {
              return acc + Number(regex.test(value));
            }, 0);

            if (!value.length) return null;

            return (
              <div className="mt-1">
                <div className="mb-2 flex justify-between text-xs font-semibold">
                  <span>{t('week')}</span>
                  <span>{t('strong')}</span>
                </div>
                <Progress
                  value={(100 / regexArray.length) * passRegexPassword}
                />
              </div>
            );
          },
        },
      ]}
      formSchema={formSchema}
      onSubmit={async (val, form) => {
        await onSubmit(val, form);
        setCurrentStep(prev => prev + 1);
      }}
      submitButton={props => (
        <Button {...props} className="w-full">
          {t('sign_up.form.submit')}
        </Button>
      )}
    >
      <div id="vitnode_captcha" />
    </AutoForm>
  );
};
