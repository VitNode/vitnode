import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { CONFIG } from '@/helpers/config-with-env';
import { Admin__Core_Manifest_Metadata__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_manifest_metadata__show.generated';
import { convertColor, getHSLFromString } from '@/helpers/colors';

enum DisplayManifest {
  Fullscreen = 'fullscreen',
  Standalone = 'standalone',
  MinimalUi = 'minimal-ui',
  Browser = 'browser',
}

export const useManifestCoreAdminView = ({
  admin__core_manifest_metadata__show: data,
}: Admin__Core_Manifest_Metadata__ShowQuery) => {
  const t = useTranslations('core');
  const themeColor = convertColor.hexToHSL(data.theme_color);
  const backgroundColor = convertColor.hexToHSL(data.background_color);

  const formSchema = z.object({
    display: z
      .nativeEnum(DisplayManifest)
      .default(data.display as DisplayManifest),
    start_url: z
      .string()
      .default(data.start_url.replace(`${CONFIG.frontend_url}/en`, '')),
    theme_color: z
      .string()
      .default(
        themeColor
          ? `hsl(${themeColor.h}, ${themeColor.s}%, ${themeColor.l}%)`
          : '',
      ),
    background_color: z
      .string()
      .default(
        backgroundColor
          ? `hsl(${backgroundColor.h}, ${backgroundColor.s}%, ${backgroundColor.l}%)`
          : '',
      ),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    const themeColor = getHSLFromString(values.theme_color);
    const backgroundColor = getHSLFromString(values.background_color);

    const mutation = await mutationApi({
      ...values,
      startUrl: values.start_url,
      themeColor: themeColor ? convertColor.hslToHex(themeColor) : '',
      backgroundColor: backgroundColor
        ? convertColor.hslToHex(backgroundColor)
        : '',
    });

    if (mutation?.error) {
      toast.error(t('errors.title'), {
        description: t('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('saved_success'));
    form.reset(values);
  };

  return {
    onSubmit,
    formSchema,
  };
};
