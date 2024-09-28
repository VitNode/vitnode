'use client';

import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { AutoFormStringLanguageInput } from '@/components/form/fields/text-language-input';
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
          id: 'contactEmail',
          component: AutoFormInput,
          label: t('contact_email.label'),
          description: t('contact_email.desc'),
          componentProps: {
            placeholder: 'contact@your-website.com',
          } as AutoFormInputProps,
        },
        {
          id: 'description',
          component: AutoFormStringLanguageInput,
          label: t('description.label'),
        },
        {
          id: 'copyright',
          component: AutoFormStringLanguageInput,
          label: t('copyright.label'),
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};
