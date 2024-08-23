'use client';

import * as z from 'zod';
import { useTranslations } from 'next-intl';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormSwitch } from '@/components/form/fields/switch';

export const ContentAuthorizationSettingsCoreAdmin = () => {
  const t = useTranslations('admin.core.settings.authorization');
  const formSchema = z.object({
    force_login: z.boolean().optional(),
  });

  return (
    <AutoForm
      theme="horizontal"
      formSchema={formSchema}
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
