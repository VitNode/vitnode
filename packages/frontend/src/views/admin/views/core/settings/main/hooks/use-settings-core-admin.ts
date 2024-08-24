import { Core_Main_Settings__ShowQuery } from '@/graphql/queries/admin/settings/core_main_settings__show.generated';
import { zodLanguageInput } from '@/helpers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useSettingsCoreAdmin = ({
  core_settings__show: data,
}: Core_Main_Settings__ShowQuery) => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: z.string().min(1).default(data.site_name),
    short_name: z.string().min(1).default(data.site_short_name),
    description: zodLanguageInput.default(data.site_description).optional(),
    copyright: zodLanguageInput.default(data.site_copyright).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      siteName: values.name,
      siteShortName: values.short_name,
      siteDescription: values.description ?? [],
      siteCopyright: values.copyright ?? [],
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
    onSubmit,
    formSchema,
  };
};
