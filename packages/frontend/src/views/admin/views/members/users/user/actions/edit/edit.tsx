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
import { UseFormReturn } from 'react-hook-form';
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
  const tSignUp = useTranslations('core.sign_up');
  const tCore = useTranslations('core.global.errors');
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: tCore('min_length', { length: 3 }),
      })
      .max(32, {
        message: tCore('max_length', { length: 32 }),
      })
      .refine(value => nameRegex.test(value), {
        message: tSignUp('name.invalid'),
      })
      .default(name),
    email: z
      .string()
      .email({
        message: tSignUp('email_invalid'),
      })
      .default(email),
    newsletter: z.boolean().default(newsletter).optional(),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const mutation = await mutationApi({
      id,
      ...values,
      newsletter: values.newsletter ?? false,
    });

    if (mutation?.error) {
      if (mutation.error === 'EMAIL_ALREADY_EXISTS') {
        form.setError('email', {
          message: tSignUp('email.already_exists'),
        });

        return;
      }

      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
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
          description: tSignUp('name.desc'),
        },
        {
          id: 'email',
          component: AutoFormInput,
          componentProps: {
            type: 'email',
          } as AutoFormInputProps,
          label: tSignUp('email.label'),
        },
        {
          id: 'newsletter',
          label: tSignUp('newsletter.label'),
          description: tSignUp('newsletter.desc'),
          component: AutoFormCheckbox,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
    />
  );
};
