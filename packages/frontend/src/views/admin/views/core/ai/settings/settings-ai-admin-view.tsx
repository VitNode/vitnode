import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Ai__Show,
  Admin__Core_Ai__ShowQuery,
  Admin__Core_Ai__ShowQueryVariables,
} from '@/graphql/queries/admin/ai/admin__core_ai__show.generated';
import { AiProvider } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { TestingActionAiAdmin } from '../actions/testing/testing';
import { ContentSettingsAiAdmin } from './content';

const getData = async () => {
  const data = await fetcher<
    Admin__Core_Ai__ShowQuery,
    Admin__Core_Ai__ShowQueryVariables
  >({
    query: Admin__Core_Ai__Show,
    cache: 'force-cache',
    next: {
      tags: ['admin__core_ai__show'],
    },
  });

  return data;
};

export const generateMetadataSettingsAiAdmin = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.core.ai.settings');

  return {
    title: t('title'),
  };
};

export const SettingsAiAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.ai.settings'),
    getData(),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.ai.settings">
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <TestingActionAiAdmin
          disabled={data.admin__core_ai__show.provider === AiProvider.none}
        />
      </HeaderContent>

      <Card className="p-6">
        <ContentSettingsAiAdmin {...data} />
      </Card>
    </TranslationsProvider>
  );
};
