import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { ShowAdminPlugins } from '@/graphql/types';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

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
