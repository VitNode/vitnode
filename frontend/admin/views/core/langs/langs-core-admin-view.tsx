import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { Card, CardContent } from '@/components/ui/card';
import { TableLangsCoreAdmin } from './table/table-langs-core-admin';

export const LangsCoreAdminView = () => {
  const t = useTranslations('admin');

  return (
    <>
      <HeaderContent h1={t('core.langs.title')} />

      <Card>
        <CardContent className="p-6">
          <TableLangsCoreAdmin />
        </CardContent>
      </Card>
    </>
  );
};
