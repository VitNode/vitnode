import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { ShowAdminPlugins } from '@/graphql/types';
import React from 'react';

export const UploadPluginActionsAdmin = ({
  open,
  setOpen,
  ...props
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
} & Pick<ShowAdminPlugins, 'code' | 'name'>) => {
  const Content = React.lazy(async () =>
    import('../../upload/upload').then(module => ({
      default: module.UploadPluginAdmin,
    })),
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
