import { useTranslations } from 'next-intl';

import { useToast } from '@/components/ui/use-toast';
import { mutationApi } from './mutation-api';

export const useSignOutAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();

  const onSubmit = async () => {
    const mutation = await mutationApi();
    if (mutation?.error) {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });
    }
  };

  return {
    onSubmit
  };
};
