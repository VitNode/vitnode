'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormCheckbox } from '@/components/form/fields/checkbox';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { useSignUpView } from '@/hooks/core/sign/up/use-sign-up-view';
import { Link } from '@/navigation';
import { LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const FormSignUp = () => {
  const t = useTranslations('core');
  const { formSchema, onSubmit } = useSignUpView();

  return (
    <AutoForm
      fields={[
        {
          id: 'name',
          component: AutoFormInput,
          label: t('sign_up.form.name.label'),
          description: t('sign_up.form.name.desc'),
          childComponent: ({ field }) => {
            const value: string = field.value ?? '';
            if (!value.length) return null;

            return (
              <span className="text-muted-foreground mt-2 block max-w-md truncate text-sm">
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
          componentProps: {
            className: 'bg-card shadow-sm',
          } as AutoFormInputProps,
        },
        {
          id: 'email',
          component: AutoFormInput,
          componentProps: {
            type: 'email',
            className: 'bg-card shadow-sm',
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
            className: 'bg-card shadow-sm',
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
              <div className="mt-2">
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
        {
          id: 'terms',
          label: t('sign_up.form.terms.label'),
          className: 'bg-card',
          description: t.rich('sign_up.form.terms.desc', {
            link: text => (
              <Link href="/legal" target="_blank">
                {text}
              </Link>
            ),
          }),
          component: AutoFormCheckbox,
        },
        {
          id: 'newsletter',
          className: 'bg-card',
          label: t('sign_up.form.newsletter.label'),
          description: t('sign_up.form.newsletter.desc'),
          component: AutoFormCheckbox,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={props => (
        <Button {...props} className="w-full">
          <LogIn />
          {t('sign_up.form.submit')}
        </Button>
      )}
    >
      <div id="vitnode_captcha" />
    </AutoForm>
  );
};
