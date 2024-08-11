'use client';

import { useTranslations } from 'next-intl';

import { useSettingsCoreAdmin } from './hooks/use-settings-core-admin';
import { Core_Main_Settings__ShowQuery } from '@/graphql/queries/admin/settings/core_main_settings__show.generated';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormInput } from '@/components/ui/auto-form/fields/input';
import { AutoFormTextLanguageInput } from '@/components/ui/auto-form/fields/text-language-input';

export const ContentMainSettingsCoreAdmin = (
  props: Core_Main_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.main');
  const { onSubmit, formSchema } = useSettingsCoreAdmin(props);

  return (
    <AutoForm
      theme="horizontal"
      formSchema={formSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        name: {
          label: t('name.label'),
          fieldType: AutoFormInput,
        },
        short_name: {
          label: t('short_name.label'),
          fieldType: AutoFormInput,
        },
        description: {
          label: t('description.label'),
          fieldType: AutoFormTextLanguageInput,
        },
        copyright: {
          label: t('copyright.label'),
          fieldType: AutoFormTextLanguageInput,
        },
      }}
    />
  );
};
