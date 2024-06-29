import * as React from 'react';

import { ShowAdminPlugins } from '../../../../../../../../graphql/graphql';
import {
  AlertDialog,
  AlertDialogContent,
} from '../../../../../../../../components/ui/alert-dialog';
import { Loader } from '../../../../../../../../components/ui/loader';

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
