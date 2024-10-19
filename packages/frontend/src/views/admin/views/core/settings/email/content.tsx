'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormColorPicker } from '@/components/form/fields/color-picker';
import { AutoFormFileInput } from '@/components/form/fields/file-input';
import { Admin__Core_Email_Settings__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { useTranslations } from 'next-intl';

import { useEmailSettingsFormAdmin } from './hooks/use-email-settings-form-admin';

export const ContentEmailSettingsAdmin = (
  props: Admin__Core_Email_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.email');
  const { onSubmit, formSchema } = useEmailSettingsFormAdmin(props);

  return (
    <AutoForm
      fields={[
        {
          id: 'color_primary',
          component: AutoFormColorPicker,
          label: t('color_primary'),
        },
        {
          id: 'logo',
          label: t('logo'),
          component: props => (
            <AutoFormFileInput
              {...props}
              accept="image/png, image/gif, image/jpeg"
              acceptExtensions={['png', 'jpg', 'gif']}
              maxFileSizeInMb={2}
              showInfo
            />
          ),
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};
