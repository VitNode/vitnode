import * as z from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { mutationApi } from './mutation-api';
import { Admin__Core_Authorization_Settings__ShowQuery } from '@/graphql/queries/admin/settings/authorization/admin__core_authorization_settings__show.generated';

export const useAuthorizationFormAdmin = ({
  admin__core_authorization_settings__show: data,
}: Admin__Core_Authorization_Settings__ShowQuery) => {
  const t = useTranslations('core');
  const formSchema = z.object({
    force_login: z.boolean().default(data.force_login).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      forceLogin: values.force_login ?? false,
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
