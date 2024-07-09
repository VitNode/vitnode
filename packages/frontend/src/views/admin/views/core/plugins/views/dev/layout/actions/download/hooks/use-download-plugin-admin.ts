import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

import { ShowAdminPlugins } from '@/graphql/graphql';
import { useDialog } from '@/components/ui/dialog';
import { increaseVersionString } from '@/helpers/increase-version-string';
import { zodInput } from '@/helpers/zod';
import { CONFIG } from '@/helpers/config-with-env';

export const useDownloadPluginAdmin = ({
  code,
  version,
  version_code,
}: Pick<ShowAdminPlugins, 'code' | 'version_code' | 'version'>) => {
  const t = useTranslations('core');
  const { setOpen } = useDialog();
  const formSchema = z.object({
    type: z.enum(['rebuild', 'new_version']),
    version: zodInput.string,
    version_code: z.coerce
      .number()
      .min(version_code ? version_code + 1 : 10000),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: version_code ? 'rebuild' : 'new_version',
      version: version ? increaseVersionString(version) : '1.0.0',
      version_code: version_code ? version_code + 1 : 10000,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { admin__core_plugins__download } = await mutationApi({
        code,
        version: values.type === 'new_version' ? values.version : null,
        versionCode: values.type === 'new_version' ? values.version_code : null,
      });

      window.open(
        `${CONFIG.backend_url}/files/${admin__core_plugins__download}`,
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

  return { form, onSubmit };
};
