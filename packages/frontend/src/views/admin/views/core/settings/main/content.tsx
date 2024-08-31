'use client';

import { AutoForm } from '@/components/auto-form/auto-form';
import { AutoFormInput } from '@/components/auto-form/fields/input';
import { AutoFormTextLanguageInput } from '@/components/auto-form/fields/text-language-input';
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
      fields={[
        {
          id: 'name',
          component: AutoFormInput,
          label: t('name.label'),
        },
        {
          id: 'short_name',
          component: AutoFormInput,
          label: t('short_name.label'),
        },
        {
          id: 'description',
          component: AutoFormTextLanguageInput,
          label: t('description.label'),
        },
        {
          id: 'copyright',
          component: AutoFormTextLanguageInput,
          label: t('copyright.label'),
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};
