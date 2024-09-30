import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionsTableLangsCoreAdmin,
  })),
);

export const DeleteActionsTableLangsCoreAdmin = (
  props: React.ComponentProps<typeof Content>,
) => {
  const t = useTranslations('core.global');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ariaLabel={t('delete')} size="icon" variant="destructiveGhost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
