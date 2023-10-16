import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { Button } from '@/components/ui/button';

export const GeneralCoreAdminView = () => {
  const t = useTranslations('admin');

  return (
    <>
      <HeaderContent h1={t('nav.core.general')} desc="123 desc">
        <Button>{t('nav.core.general')}</Button>
        <Button>Tes 123t</Button>
      </HeaderContent>

      <div>Test</div>
    </>
  );
};
