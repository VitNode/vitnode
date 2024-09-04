import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { ShowAdminPlugins } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('../../upload/upload').then(module => ({
    default: module.UploadPluginAdmin,
  })),
);

export const UploadPluginActionsAdmin = ({
  open,
  setOpen,
  ...props
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
} & Pick<ShowAdminPlugins, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.plugins.upload');

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('title_new_version')}</DialogTitle>
          <DialogDescription>{props.name}</DialogDescription>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
