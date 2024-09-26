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
import { useTranslations } from 'next-intl';

import { useProvidersAiFormAdmin } from './hooks/use-providers-ai-form-admin';

export const ContentProvidersAiAdmin = ({
  admin__core_ai__show: data,
}: Admin__Core_Ai__ShowQuery) => {
  const t = useTranslations('admin.core.ai');
  const { formSchema, onSubmit } = useProvidersAiFormAdmin(data);

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
            label: t('provider.title'),
            description: t('provider.desc'),
            componentProps: {
              labels: {
                none: {
                  title: t('provider.none'),
                },
                google: {
                  title: t('provider.google'),
                },
                openai: {
                  title: t('provider.openai'),
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
