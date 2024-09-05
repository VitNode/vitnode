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
import { ShowCoreLanguages } from '@/graphql/types';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDownloadActionsTableLangsCoreAdmin,
  })),
);

export const DownloadActionsTableLangsCoreAdmin = (
  props: Pick<ShowCoreLanguages, 'code'>,
) => {
  const t = useTranslations('admin.core.langs.actions.download');
  const title = t('title', { code: props.code });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ariaLabel={title} size="icon" variant="ghost">
          <Download />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{t('desc')}</DialogDescription>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
