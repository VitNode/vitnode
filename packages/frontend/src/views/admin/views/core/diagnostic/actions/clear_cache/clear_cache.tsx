import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { EraserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentClearCacheActionDiagnostic,
  })),
);

export const ClearCacheActionDiagnostic = () => {
  const t = useTranslations('admin.core.diagnostic.clear_cache');

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <EraserIcon />
            {t('title')}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <React.Suspense fallback={<Loader />}>
            <Content />
          </React.Suspense>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
