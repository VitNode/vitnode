'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

import { CreateEditNavDevPluginAdminProps } from '../../create-edit/create-edit';

const Content = React.lazy(async () =>
  import('../../create-edit/create-edit').then(module => ({
    default: module.CreateEditNavDevPluginAdmin,
  })),
);

export const CreateNavDevPluginAdmin = (
  props: CreateEditNavDevPluginAdminProps,
) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('create')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
