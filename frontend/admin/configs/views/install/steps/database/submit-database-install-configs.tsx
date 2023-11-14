'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCreateDatabaseInstallConfigsAPI } from './hooks/use-create-database-install-configs-api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const SubmitDatabaseInstallConfigs = () => {
  const t = useTranslations('admin.configs.install.steps.database');
  const tCore = useTranslations('core');
  const { isError, isPending, isSuccess, mutateAsync } = useCreateDatabaseInstallConfigsAPI();

  return (
    <>
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{tCore('errors.title')}</AlertTitle>
          <AlertDescription>{tCore('errors.internal_server_error')}</AlertDescription>
        </Alert>
      )}

      <Button onClick={async () => await mutateAsync()} loading={isPending || isSuccess}>
        {t('submit')}
      </Button>
    </>
  );
};
