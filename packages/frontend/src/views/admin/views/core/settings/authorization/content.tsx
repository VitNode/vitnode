'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { Admin__Core_Authorization_Settings__ShowQuery } from '@/graphql/queries/admin/settings/authorization/admin__core_authorization_settings__show.generated';
import { useTranslations } from 'next-intl';

import { useAuthorizationFormAdmin } from './hooks/use-authorization-settings-form-admin';

export const ContentAuthorizationSettingsCoreAdmin = ({
  isEmailEnabled,
  ...props
}: {
  isEmailEnabled: boolean;
} & Admin__Core_Authorization_Settings__ShowQuery) => {
  const t = useTranslations('admin.core.settings.authorization');
  const { formSchema, onSubmit } = useAuthorizationFormAdmin(props);

  return (
    <AutoForm
      fields={[
        {
          id: 'force_login',
          component: AutoFormSwitch,
          hideOptionalLabel: true,
          label: t('force_login.title'),
          description: t('force_login.desc'),
        },
        {
          id: 'lock_register',
          component: AutoFormSwitch,
          hideOptionalLabel: true,
          label: t('lock_register.title'),
          description: t('lock_register.desc'),
        },
        {
          id: 'require_confirm_email',
          component: props => (
            <AutoFormSwitch {...props} disabled={!isEmailEnabled} />
          ),
          hideOptionalLabel: true,
          label: t('require_confirm_email.title'),
          description: t('require_confirm_email.desc'),
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};
