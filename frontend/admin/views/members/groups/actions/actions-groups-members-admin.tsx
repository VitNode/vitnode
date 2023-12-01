'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/loader/loader';

const CreateEditFormGroupsMembersAdmin = lazy(() =>
  import('../create-edit-form/create-edit-form-groups-members-admin').then(module => ({
    default: module.CreateEditFormGroupsMembersAdmin
  }))
);

export const ActionsGroupsMembersAdmin = () => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('create')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <Suspense fallback={<Loader />}>
          <CreateEditFormGroupsMembersAdmin />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
