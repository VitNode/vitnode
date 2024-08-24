import { useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { queryApi } from './query-api';
import { mutationApi } from './mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { CONFIG } from '@/helpers/config-with-env';
import { ShowCoreLanguages } from '@/graphql/types';
import { useSessionAdmin } from '@/hooks/use-session-admin';

export const useDownloadLangAdmin = ({
  code,
}: Pick<ShowCoreLanguages, 'code'>) => {
  const t = useTranslations('core');
  const { setOpen } = useDialog();
  const { version } = useSessionAdmin();
  const queryPlugins = useQuery({
    queryKey: ['Admin__Core_Plugins__Show__Quick'],
    queryFn: async () => {
      const query = await queryApi({});

      return query.data;
    },
  });

  // TODO: Add plugins from the backend
  const plugins = [
    { id: 'core', name: 'Core', version, code: 'core' },
    {
      id: 'admin',
      name: 'Admin',
      version,
      code: 'admin',
    },
    // ...edges,
  ];

  const formSchema = z
    .object({
      all: z.boolean().default(true),
      plugins: z
        .array(
          z.enum(plugins.map(plugin => plugin.code) as [string, ...string[]]),
        )
        .default([]),
    })
    .refine(data => {
      if (data.all) {
        return true;
      }

      return data.plugins.length > 0;
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      code,
      plugins: values.all ? [] : values.plugins,
    });

    if (mutation.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    window.open(
      `${CONFIG.backend_url}/files/${mutation.data.admin__core_languages__download}`,
      '_blank',
    );

    setOpen?.(false);
  };

  return { onSubmit, queryPlugins, formSchema, plugins };
};
