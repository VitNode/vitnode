import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { useTranslations } from 'next-intl';

import { useCreateUserAdmin } from './hooks/use-create-user-admin';

export const ContentCreateUserUsersMembersAdmin = () => {
  const { formSchema, onSubmit } = useCreateUserAdmin();
  const t = useTranslations('core.sign_up');

  return (
    <AutoForm
      fields={[
        {
          id: 'name',
          label: t('name.label'),
          description: t('name.desc'),
          component: AutoFormInput,
          childComponent: ({ field }) => {
            const value: string = field.value ?? '';
            if (!value.length) return null;

            return (
              <span className="text-muted-foreground mt-2 block max-w-md truncate text-sm">
                {t.rich('name.your_id', {
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
          label: t('email.label'),
        },
        {
          id: 'password',
          label: t('password.label'),
          description: t('password.desc'),
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
              <div className="mt-2">
                <div className="mb-2 flex justify-between text-xs font-semibold">
                  <span>{t('week_password')}</span>
                  <span>{t('strong_password')}</span>
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
      onSubmit={onSubmit}
      submitButton={props => (
        <DialogFooter>
          <Button {...props}>{t('submit')}</Button>
        </DialogFooter>
      )}
    />
  );
};
