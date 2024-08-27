import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Loader } from '@/components/ui/loader';
import { ShowAdminPlugins } from '@/graphql/types';
import React from 'react';

const ContentDeletePluginActionsAdmin = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeletePluginActionsAdmin,
  })),
);

export const DeletePluginActionsAdmin = ({
  open,
  setOpen,
  ...props
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
} & ShowAdminPlugins) => {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <ContentDeletePluginActionsAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
