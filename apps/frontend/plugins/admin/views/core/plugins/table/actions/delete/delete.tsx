import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
} from 'vitnode-frontend/components/ui/alert-dialog';
import { Loader } from 'vitnode-frontend/components/ui/loader';

import { ShowAdminPlugins } from '@/graphql/hooks';

const ContentDeletePluginActionsAdmin = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeletePluginActionsAdmin,
  })),
);

interface Props extends ShowAdminPlugins {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DeletePluginActionsAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <ContentDeletePluginActionsAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
