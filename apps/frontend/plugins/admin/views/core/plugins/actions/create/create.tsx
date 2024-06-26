'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'vitnode-frontend/components/ui/dialog';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Loader } from 'vitnode-frontend/components/ui/loader';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.CreatePluginAdmin,
  })),
);

export const CreateActionPluginAdmin = () => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('create')}
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
