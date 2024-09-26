'use client';

import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormRadioGroup,
  AutoFormRadioGroupProps,
} from '@/components/form/fields/radio-group';
import { Admin__Core_Ai__ShowQuery } from '@/graphql/queries/admin/ai/admin__core_ai__show.generated';
import { AiProvider } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

export const ContentProvidersAiAdmin = ({
  admin__core_ai__show: data,
}: Admin__Core_Ai__ShowQuery) => {
  const t = useTranslations('admin.core.ai');
  const formSchema = z.object({
    provider: z.nativeEnum(AiProvider).default(data.provider),
  });

  return (
    <>
      <AutoForm
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
        ]}
        formSchema={formSchema}
        theme="horizontal"
      />
    </>
  );
};
