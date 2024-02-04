import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { ShowCoreNav } from '@/graphql/hooks';

const Content = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentDeleteActionTableNavAdmin
  }))
);

export const DeleteActionTableNavAdmin = (props: Pick<ShowCoreNav, 'id' | 'children' | 'name'>) => {
  const t = useTranslations('core');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveGhost" size="icon" tooltip={t('delete')}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
