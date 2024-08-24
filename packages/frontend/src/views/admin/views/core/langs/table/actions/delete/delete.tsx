import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Loader } from '@/components/ui/loader';
import { ShowCoreLanguages } from '@/graphql/types';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionsTableLangsCoreAdmin,
  })),
);

interface Props extends Pick<ShowCoreLanguages, 'code' | 'name'> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DeleteActionsTableLangsCoreAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
