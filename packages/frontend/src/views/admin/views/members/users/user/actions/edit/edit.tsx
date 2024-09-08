import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { nameRegex } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

export const EditActionUserMembersAdmin = ({
  name,
  email,
}: Pick<
  Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
  'email' | 'name'
>) => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: t('forms.min_length', { length: 3 }),
      })
      .max(32, {
        message: t('forms.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: t('sign_up.form.name.invalid'),
      })
      .default(name),
    email: z
      .string()
      .email({
        message: t('forms.email_invalid'),
      })
      .default(email),
  });

  return (
    <AutoForm
      fields={[
        {
          id: 'name',
          component: AutoFormInput,
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
        },
        {
          id: 'email',
          component: AutoFormInput,
          componentProps: {
            type: 'email',
          } as AutoFormInputProps,
          label: t('sign_up.form.email.label'),
        },
      ]}
      formSchema={formSchema}
    />
  );
};
