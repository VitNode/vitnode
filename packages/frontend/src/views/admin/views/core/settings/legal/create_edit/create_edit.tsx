import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentCreateEditLegalPage,
  })),
);

export const CreateEditLegalPage = () => {
  const t = useTranslations('admin.core.settings.legal.create_edit');

  return (
    <DialogContent className="max-w-6xl">
      <DialogHeader>
        <DialogTitle>{t('create')}</DialogTitle>
      </DialogHeader>

      <React.Suspense fallback={<Loader />}>
        <Content />
      </React.Suspense>
    </DialogContent>
  );
};
