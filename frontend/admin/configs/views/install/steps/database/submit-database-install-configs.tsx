'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { mutationApi } from './mutation-api';
import { useToast } from '@/components/ui/use-toast';

export const SubmitDatabaseInstallConfigs = () => {
  const [isPending, setPending] = useState(false);
  const t = useTranslations('admin.configs.install.steps.database');
  const tCore = useTranslations('core');
  const { toast } = useToast();

  return (
    <Button
      onClick={async () => {
        setPending(true);

        try {
          await mutationApi();
        } catch (error) {
          toast({
            title: tCore('errors.title'),
            description: tCore('errors.internal_server_error'),
            variant: 'destructive'
          });

          setPending(false);
        }
      }}
      loading={isPending}
    >
      {t('submit')}
    </Button>
  );
};
