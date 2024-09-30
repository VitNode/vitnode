'use client';

import { AutoForm, DependencyType } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import {
  AutoFormRadioGroup,
  AutoFormRadioGroupProps,
} from '@/components/form/fields/radio-group';
import { Admin__Core_Ai__ShowQuery } from '@/graphql/queries/admin/ai/admin__core_ai__show.generated';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

import { useSettingsAiFormAdmin } from './hooks/use-settings-ai-form-admin';

export const ContentSettingsAiAdmin = ({
  admin__core_ai__show: data,
}: Admin__Core_Ai__ShowQuery) => {
  const t = useTranslations('admin.core.ai.settings');
  const { formSchema, onSubmit } = useSettingsAiFormAdmin(data);

  return (
    <>
      <AutoForm
        dependencies={[
          {
            sourceField: 'provider',
            type: DependencyType.HIDES,
            targetField: 'key',
            when: (provider: string) => provider === 'none',
          },
        ]}
        fields={[
          {
            id: 'provider',
            component: AutoFormRadioGroup,
            label: t('provider'),
            componentProps: {
              labels: {
                none: {
                  title: t('none'),
                },
                google: {
                  title: t('google.title'),
                  description: t.rich('google.desc', {
                    link: text => (
                      <Link
                        href="https://vitnode.com/docs/guides/ai/google-ai"
                        target="_blank"
                      >
                        {text}
                      </Link>
                    ),
                  }),
                },
                openai: {
                  title: t('openai.title'),
                  description: t.rich('openai.desc', {
                    link: text => (
                      <Link
                        href="https://vitnode.com/docs/guides/ai/google-ai"
                        target="_blank"
                      >
                        {text}
                      </Link>
                    ),
                  }),
                },
              },
            } as AutoFormRadioGroupProps,
          },
          {
            id: 'key',
            component: AutoFormInput,
            label: t('key'),
            componentProps: {
              placeholder: '**********',
              type: 'password',
            } as AutoFormInputProps,
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        theme="horizontal"
      />
    </>
  );
};
