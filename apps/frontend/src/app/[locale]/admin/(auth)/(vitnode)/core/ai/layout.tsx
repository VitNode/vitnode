import { useTranslations } from 'next-intl';
import { Card } from 'vitnode-frontend/components/ui/card';
import { HeaderContent } from 'vitnode-frontend/components/ui/header-content';
import { Tabs, TabsTrigger } from 'vitnode-frontend/components/ui/tabs';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin.core.ai');

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')} />
      <Tabs className="mb-6">
        <TabsTrigger active id="provider">
          {t('tabs.provider')}
        </TabsTrigger>
      </Tabs>

      <Card className="p-6">{children}</Card>
    </>
  );
}
