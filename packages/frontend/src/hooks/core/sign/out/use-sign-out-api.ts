import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useSignOutApi = () => {
  const t = useTranslations('core.global.errors');

  const onSubmit = async () => {
    const mutation = await mutationApi();

    if (mutation?.error) {
      toast.error(t('title'), {
        description: t('internal_server_error'),
      });
    }
  };

  return {
    onSubmit,
  };
};
