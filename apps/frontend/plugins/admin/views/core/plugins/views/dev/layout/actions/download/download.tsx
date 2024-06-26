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

import { ShowAdminPlugins } from '@/graphql/hooks';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDownloadActionDevPluginAdmin,
  })),
);

export const DownloadActionDevPluginAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download /> {t('download')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
