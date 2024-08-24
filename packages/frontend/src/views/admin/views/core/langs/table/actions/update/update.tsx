import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { ShowCoreLanguages } from '@/graphql/types';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentUpdateActionsTableLangsCoreAdmin,
  })),
);

interface Props extends Pick<ShowCoreLanguages, 'code' | 'name'> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UpdateActionsTableLangsCoreAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
