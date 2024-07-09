import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { queryApi } from './query-api';
import { mutationApi } from './mutation-api';

import { ShowCoreLanguages } from '@/graphql/graphql';
import { useDialog } from '@/components/ui/dialog';
import { CONFIG } from '@/helpers/config-with-env';

export const useDownloadLangAdmin = ({
  code,
}: Pick<ShowCoreLanguages, 'code'>) => {
  const t = useTranslations('core');
  const { setOpen } = useDialog();
  const queryPlugins = useQuery({
    queryKey: ['Admin__Core_Plugins__Show__Quick'],
    queryFn: async () => queryApi({}),
  });

  const formSchema = z.object({
    all: z.boolean(),
    plugins: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      all: true,
      plugins: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const mutation = await mutationApi({
        code,
        plugins: values.all ? [] : values.plugins,
      });

      window.open(
        `${CONFIG.backend_url}/files/${mutation.admin__core_languages__download}`,
        '_blank',
      );
    } catch (error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
  };

  return { form, onSubmit, queryPlugins };
};
