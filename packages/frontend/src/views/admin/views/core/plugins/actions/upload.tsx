'use client';

import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CONFIG } from '@/helpers/config-with-env';
import { Loader } from '@/components/ui/loader';

const Content = React.lazy(async () =>
  import('../upload/upload').then(module => ({
    default: module.UploadPluginAdmin,
  })),
);

export const UploadActionPluginAdmin = () => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={CONFIG.node_development ? 'ghost' : 'default'}>
          <Upload />
          {t('upload')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
