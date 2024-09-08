import { AutoForm } from '@/components/form/auto-form';
import { AutoFormCheckbox } from '@/components/form/fields/checkbox';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { useDialog } from '@/components/ui/dialog';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { nameRegex } from '@/hooks/core/sign/up/use-sign-up-view';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const EditActionUserMembersAdmin = ({
  name,
  email,
  newsletter,
  id,
}: Pick<
  Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
  'email' | 'id' | 'name' | 'newsletter'
>) => {
  const t = useTranslations('admin.members.users.item.edit');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: tCore('forms.min_length', { length: 3 }),
      })
      .max(32, {
        message: tCore('forms.max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: tCore('sign_up.form.name.invalid'),
      })
      .default(name),
    email: z
      .string()
      .email({
        message: tCore('forms.email_invalid'),
      })
      .default(email),
    newsletter: z.boolean().default(newsletter).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      id,
      ...values,
      newsletter: values.newsletter ?? false,
    });

    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t('success'), {
      description: values.name,
    });
  };

  return (
    <AutoForm
      fields={[
        {
          id: 'name',
          component: AutoFormInput,
          description: tCore('sign_up.form.name.desc'),
        },
        {
          id: 'email',
          component: AutoFormInput,
          componentProps: {
            type: 'email',
          } as AutoFormInputProps,
          label: tCore('sign_up.form.email.label'),
        },
        {
          id: 'newsletter',
          label: tCore('sign_up.form.newsletter.label'),
          description: tCore('sign_up.form.newsletter.desc'),
          component: AutoFormCheckbox,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
    />
  );
};
