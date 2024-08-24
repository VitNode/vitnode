'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormColor } from '@/components/form/fields/color';
import { AutoFormFile } from '@/components/form/fields/file';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import {
  AutoFormInputComponentProps,
  DependencyType,
} from '@/components/form/type';
import { Separator } from '@/components/ui/separator';
import { Admin__Core_Email_Settings__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { Link } from '@/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useEmailSettingsFormAdmin } from './hooks/use-email-settings-form-admin';

export const ContentEmailSettingsAdmin = (
  props: Admin__Core_Email_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.email');
  const { onSubmit, formSchema } = useEmailSettingsFormAdmin(props);

  return (
    <AutoForm
      dependencies={[
        {
          sourceField: 'provider',
          type: DependencyType.HIDES,
          targetField: 'smtp',
          when: (provider: string) => provider !== 'smtp',
        },
        {
          sourceField: 'provider',
          type: DependencyType.HIDES,
          targetField: 'resend_key',
          when: (provider: string) => provider !== 'resend',
        },
      ]}
      fieldConfig={{
        color_primary: {
          label: t('color_primary'),
          fieldType: AutoFormColor,
        },
        logo: {
          label: t('logo'),
          fieldType: props => (
            <AutoFormFile
              accept="image/png, image/gif, image/jpeg"
              acceptExtensions={['png', 'jpg', 'gif']}
              maxFileSizeInMb={2}
              showInfo
              {...props}
            />
          ),
        },
        provider: {
          label: t('provider.title'),
          fieldType: props => (
            <>
              <div className="w-full space-y-2">
                <Separator />
              </div>

              <AutoFormRadioGroup
                labels={{
                  none: {
                    title: t('provider.none'),
                  },
                  smtp: {
                    title: t('provider.smtp'),
                  },
                  resend: {
                    title: t('provider.resend'),
                    description: t.rich('provider.resend_desc', {
                      link: text => (
                        <Link
                          className="flex items-center gap-1"
                          href="https://resend.com/"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {text}
                          <SquareArrowOutUpRight className="size-3" />
                        </Link>
                      ),
                    }),
                  },
                }}
                {...props}
              />
            </>
          ),
        },
        smtp: {
          host: {
            label: t('smtp_host'),
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormInput placeholder="smtp.gmail.com" {...props} />
            ),
          },
          user: {
            label: t('smtp_user'),
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormInput placeholder="user" {...props} />
            ),
          },
          password: {
            label: t('smtp_password'),
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormInput
                placeholder="**********"
                type="password"
                {...props}
              />
            ),
          },
          secure: {
            label: t('smtp_secure'),
            fieldType: AutoFormSwitch,
          },
          port: {
            label: t('smtp_port'),
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormInput type="number" {...props} />
            ),
          },
        },
        resend_key: {
          label: t('resend_key'),
          fieldType: props => (
            <AutoFormInput
              placeholder="**********"
              type="password"
              {...props}
            />
          ),
        },
      }}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};
