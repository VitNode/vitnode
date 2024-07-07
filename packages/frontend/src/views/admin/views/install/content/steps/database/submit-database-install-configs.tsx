import { useTranslations } from 'next-intl';
import * as React from 'react';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';
import { Button } from '@/components/ui/button';

export const SubmitDatabaseInstallConfigs = () => {
  const [isPending, setPending] = React.useState(false);
  const tCore = useTranslations('core');
  const { setCurrentStep } = useInstallVitnode();

  return (
    <Button
      onClick={async () => {
        setPending(true);

        const mutation = await mutationApi();
        if (mutation?.error) {
          toast.error(tCore('errors.title'), {
            description: tCore('errors.internal_server_error'),
          });
          setPending(false);

          return;
        }

        setPending(false);
        setCurrentStep(prev => prev + 1);
      }}
      loading={isPending}
    >
      Create Records
    </Button>
  );
};
