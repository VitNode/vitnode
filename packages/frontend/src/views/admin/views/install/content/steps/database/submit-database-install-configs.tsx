import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';
import { mutationApi } from './mutation-api';

export const SubmitDatabaseInstallConfigs = () => {
  const [isPending, setPending] = React.useState(false);
  const tCore = useTranslations('core.global.errors');
  const { setCurrentStep } = useInstallVitnode();

  return (
    <Button
      loading={isPending}
      onClick={async () => {
        setPending(true);

        const mutation = await mutationApi();
        if (mutation?.error) {
          toast.error(tCore('title'), {
            description: tCore('internal_server_error'),
          });
          setPending(false);

          return;
        }

        setPending(false);
        setCurrentStep(prev => prev + 1);
      }}
    >
      Create Records
    </Button>
  );
};
