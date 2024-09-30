import { ShowAdminPlugins } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationEditApi } from '../../../../actions/create/hooks/mutation-edit-api';

export const useSetDefaultPluginAdmin = (data: ShowAdminPlugins) => {
  const tCore = useTranslations('core.global.errors');

  const onSubmit = async () => {
    try {
      await mutationEditApi({
        author: data.author,
        code: data.code,
        name: data.name,
        authorUrl: data.author_url,
        description: data.description,
        enabled: data.enabled,
        default: true,
        supportUrl: data.support_url,
      });
    } catch (_) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }
  };

  return {
    onSubmit,
  };
};
