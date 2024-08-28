'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormCheckbox } from '@/components/form/fields/checkbox';
import { AutoFormInput } from '@/components/form/fields/input';
import { FieldRenderParentProps } from '@/components/form/type';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { useSignUpView } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';

import { SuccessFormSignUp } from './success';

export const FormSignUp = () => {
  const t = useTranslations('core');
  const { formSchema, onSubmit, successName } = useSignUpView();

  if (successName) {
    return <SuccessFormSignUp name={successName} />;
  }

  return (
    <AutoForm
      fieldConfig={{
        name: {
          label: t('sign_up.form.name.label'),
          fieldType: props => <AutoFormInput max={32} min={3} {...props} />,
          renderParent: ({ children, field }: FieldRenderParentProps) => {
            const value: string = field.value ?? '';

            return (
              <>
                {children}
                {value.length > 0 && (
                  <span className="text-muted-foreground mt-1 block text-sm">
                    {t.rich('sign_up.form.name.your_id', {
                      id: () => (
                        <span className="text-foreground font-medium">
                          {removeSpecialCharacters(value)}
                        </span>
                      ),
                    })}
                  </span>
                )}
              </>
            );
          },
          description: t('sign_up.form.name.desc'),
        },
        email: {
          label: t('sign_up.form.email.label'),
          fieldType: props => <AutoFormInput type="email" {...props} />,
        },
        password: {
          label: t('sign_up.form.password.label'),
          fieldType: props => <AutoFormInput type="password" {...props} />,
          description: t('sign_up.form.password.desc'),
          renderParent: ({ children, field }: FieldRenderParentProps) => {
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

            return (
              <>
                {children}
                {value.length > 0 && (
                  <div className="mt-1">
                    <div className="mb-2 flex justify-between text-xs font-semibold">
                      <span>{t('week')}</span>
                      <span>{t('strong')}</span>
                    </div>
                    <Progress
                      value={(100 / regexArray.length) * passRegexPassword}
                    />
                  </div>
                )}
              </>
            );
          },
        },
        terms: {
          label: t('sign_up.form.terms.label'),
          description: t('sign_up.form.terms.desc'),
          fieldType: AutoFormCheckbox,
        },
        newsletter: {
          label: t('sign_up.form.newsletter.label'),
          description: t('sign_up.form.newsletter.desc'),
          fieldType: AutoFormCheckbox,
        },
      }}
      formSchema={formSchema}
      onSubmit={onSubmit}
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
