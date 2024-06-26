import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'vitnode-frontend/components/ui/dialog';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Loader } from 'vitnode-frontend/components/ui/loader';

import { ShowCoreLanguages } from '@/graphql/hooks';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDownloadActionsTableLangsCoreAdmin,
  })),
);

export const DownloadActionsTableLangsCoreAdmin = (
  props: Pick<ShowCoreLanguages, 'code'>,
) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t('download')}>
          <Download />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
