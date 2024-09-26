import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { AiProvider } from '@/graphql/types';
import { getTranslations } from 'next-intl/server';

import { TestingActionAiAdmin } from './actions/testing/testing';
import { getAdminAiSettings } from './query';

export const AiAdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.ai'),
    getAdminAiSettings(),
  ]);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <TestingActionAiAdmin
          disabled={data.admin__core_ai__show.provider === AiProvider.none}
        />
      </HeaderContent>

      <Tabs className="mb-6">
        <TabsTrigger active id="provider">
          {t('tabs.provider')}
        </TabsTrigger>
      </Tabs>

      <Card className="p-6">{children}</Card>
    </>
  );
};
