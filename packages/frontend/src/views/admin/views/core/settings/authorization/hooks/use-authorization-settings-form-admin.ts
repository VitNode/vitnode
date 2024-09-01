import { Admin__Core_Authorization_Settings__ShowQuery } from '@/graphql/queries/admin/settings/authorization/admin__core_authorization_settings__show.generated';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useAuthorizationFormAdmin = ({
  admin__core_authorization_settings__show: data,
}: Admin__Core_Authorization_Settings__ShowQuery) => {
  const t = useTranslations('core');
  const formSchema = z.object({
    force_login: z.boolean().default(data.force_login).optional(),
    lock_register: z.boolean().default(data.lock_register).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      forceLogin: values.force_login ?? false,
      lockRegister: values.lock_register ?? false,
    });

    if (mutation?.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
  };

  return {
    formSchema,
    onSubmit,
  };
};
