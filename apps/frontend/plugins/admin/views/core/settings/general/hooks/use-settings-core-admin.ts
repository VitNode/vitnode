import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { zodInput } from 'vitnode-frontend/helpers/zod';

import { mutationApi } from './mutation-api';
import { Core_Main_Settings__ShowQuery } from '@/graphql/hooks';

export const useSettingsCoreAdmin = ({
  core_settings__show: data,
}: Core_Main_Settings__ShowQuery) => {
  const t = useTranslations('core');

  const formSchema = z.object({
    name: zodInput.string.min(1),
    short_name: zodInput.string.min(1),
    description: zodInput.languageInput.min(1),
    copyright: zodInput.languageInput.min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.site_name,
      short_name: data.site_short_name,
      description: data.site_description,
      copyright: data.site_copyright,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      siteName: values.name,
      siteShortName: values.short_name,
      siteDescription: values.description,
      siteCopyright: values.copyright,
    });

    if (mutation.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
    form.reset(values);
  };

  return {
    form,
    onSubmit,
  };
};
