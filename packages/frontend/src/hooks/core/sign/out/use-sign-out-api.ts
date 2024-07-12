import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useSignOutApi = () => {
  const t = useTranslations('core');

  const onSubmit = async () => {
    try {
      await mutationApi();
    } catch (error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });
    }
  };

  return {
    onSubmit,
  };
};
