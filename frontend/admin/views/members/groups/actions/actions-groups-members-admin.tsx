'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/loader/loader';

const CreateActionsGroupsMembersDialogAdmin = lazy(() =>
  import('./create/create-actions-groups-members-dialog-admin').then(module => ({
    default: module.CreateActionsGroupsMembersDialogAdmin
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

      <DialogContent onPointerDownOutside={e => e.preventDefault()} className="max-w-3xl">
        <Suspense fallback={<Loader />}>
          <CreateActionsGroupsMembersDialogAdmin />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
