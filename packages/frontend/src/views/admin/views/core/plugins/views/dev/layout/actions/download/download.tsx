import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  const t = useTranslations('admin.core.plugins.download');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download /> {t('title')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {props.name}
          </DialogDescription>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
