'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormTextLanguageInput } from '@/components/form/fields/text-language-input';
import { Core_Main_Settings__ShowQuery } from '@/graphql/queries/admin/settings/core_main_settings__show.generated';
import { useTranslations } from 'next-intl';

import { useSettingsCoreAdmin } from './hooks/use-settings-core-admin';

export const ContentMainSettingsCoreAdmin = (
  props: Core_Main_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.main');
  const { onSubmit, formSchema } = useSettingsCoreAdmin(props);

  return (
    <AutoForm
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
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};
