import { Pencil } from 'lucide-react';
import * as React from 'react';
import { useTranslations } from 'next-intl';

import { ShowAdminGroups } from '@/graphql/graphql';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

const CreateEditFormGroupsMembersAdmin = React.lazy(async () =>
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
        <Button variant="ghost" size="icon" ariaLabel={t('edit')}>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <React.Suspense fallback={<Loader />}>
          <CreateEditFormGroupsMembersAdmin data={data} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
