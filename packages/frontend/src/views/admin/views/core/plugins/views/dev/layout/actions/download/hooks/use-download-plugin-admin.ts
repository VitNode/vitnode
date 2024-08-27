import { useDialog } from '@/components/ui/dialog';
import { ShowAdminPlugins } from '@/graphql/types';
import { CONFIG } from '@/helpers/config-with-env';
import { increaseVersionString } from '@/helpers/increase-version-string';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useDownloadPluginAdmin = ({
  code,
  version,
  version_code,
}: Pick<ShowAdminPlugins, 'code' | 'version' | 'version_code'>) => {
  const t = useTranslations('core');
  const { setOpen } = useDialog();
  const formSchema = z.object({
    type: z
      .enum(['rebuild', 'new_version'])
      .default(version_code ? 'rebuild' : 'new_version'),
    version: z
      .string()
      .default(version ? increaseVersionString(version) : '1.0.0'),
    version_code: z.coerce
      .number()
      .min(version_code ? version_code + 1 : 10000)
      .default(version_code ? version_code + 1 : 10000),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      code,
      version: values.type === 'new_version' ? values.version : undefined,
      versionCode:
        values.type === 'new_version' ? values.version_code : undefined,
    });

    if (!mutation.data) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    window.open(
      `${CONFIG.backend_url}/files/${mutation.data.admin__core_plugins__download}`,
      '_blank',
    );

    setOpen?.(false);
  };

  return { onSubmit, formSchema };
};
