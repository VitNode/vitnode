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

import { useInstallVitnode } from '../../hooks/use-install-vitnode';

export const AccountInstallConfigsView = () => {
  const t = useTranslations('core');
  const { onSubmit, formSchema } = useSignUpView();
  const { setCurrentStep } = useInstallVitnode();

  return (
    <AutoForm
      className="max-w-2xl p-6 pt-0"
      fieldConfig={{
        name: {
          label: t('sign_up.form.name.label'),
          fieldType: AutoFormInput,
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
