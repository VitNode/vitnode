import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { ShowAdminGroups } from '@/graphql/types';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('../../create-edit-form/create-edit-form-groups-members-admin').then(
    module => ({
      default: module.CreateEditFormGroupsMembersAdmin,
    }),
  ),
);

export const EditGroupsMembersDialogAdmin = (data: ShowAdminGroups) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ariaLabel={t('edit')} size="icon" variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <React.Suspense fallback={<Loader />}>
          <Content data={data} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
