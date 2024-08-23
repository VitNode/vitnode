'use client';

import { useTranslations } from 'next-intl';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { Admin__Core_Authorization_Settings__ShowQuery } from '@/graphql/queries/admin/settings/authorization/admin__core_authorization_settings__show.generated';
import { useAuthorizationFormAdmin } from './hooks/use-authorization-settings-form-admin';

export const ContentAuthorizationSettingsCoreAdmin = (
  props: Admin__Core_Authorization_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.authorization');
  const { formSchema, onSubmit } = useAuthorizationFormAdmin(props);

  return (
    <AutoForm
      theme="horizontal"
      formSchema={formSchema}
      onSubmit={onSubmit}
      fieldConfig={{
        force_login: {
          label: t('force_login.title'),
          fieldType: AutoFormSwitch,
          description: t('force_login.desc'),
        },
      }}
    />
  );
};
