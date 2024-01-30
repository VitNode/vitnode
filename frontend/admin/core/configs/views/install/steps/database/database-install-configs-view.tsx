import { useTranslations } from 'next-intl';

import { CardContent, CardFooter } from '@/components/ui/card';
import { SubmitDatabaseInstallConfigs } from './submit-database-install-configs';

export const DatabaseInstallConfigsView = () => {
  const t = useTranslations('admin.configs.install.steps.database');

  return (
    <>
      <CardContent>
        <p>{t('text')}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 items-start">
        <SubmitDatabaseInstallConfigs />
      </CardFooter>
    </>
  );
};
