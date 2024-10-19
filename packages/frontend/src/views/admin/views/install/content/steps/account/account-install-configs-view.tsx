'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { useSignUpView } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';

export const AccountInstallConfigsView = () => {
  const t = useTranslations('core.sign_up');
  const { onSubmit, formSchema } = useSignUpView({ installPage: true });
  const { setCurrentStep } = useInstallVitnode();

  return (
    <AutoForm
      className="max-w-2xl p-6 pt-0"
      fields={[
        {
          id: 'name',
          label: t('name.label'),
          description: t('name.desc'),
          component: AutoFormInput,
          wrapper: ({ field, children }) => {
            const value: string = field.value ?? '';

            return (
              <>
                {children}
                {value.length > 0 && (
                  <span className="text-muted-foreground mt-2 block max-w-md truncate text-sm">
                    {t.rich('name.your_id', {
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
        },
        {
          id: 'email',
          component: props => <AutoFormInput {...props} type="email" />,
          label: t('email.label'),
        },
        {
          id: 'password',
          label: t('password.label'),
          description: t('password.desc'),
          component: props => <AutoFormInput {...props} type="password" />,
          wrapper: ({ field, children }) => {
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
                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{t('week_password')}</span>
                    <span>{t('strong_password')}</span>
                  </div>
                  <Progress
                    value={(100 / regexArray.length) * passRegexPassword}
                  />
                </div>
              </>
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
          {t('submit')}
        </Button>
      )}
    >
      <div id="vitnode_captcha" />
    </AutoForm>
  );
};
