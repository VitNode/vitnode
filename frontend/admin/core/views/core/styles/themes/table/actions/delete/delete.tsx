import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { ActionsItemThemesAdminProps } from '../actions';

const ContentDeleteThemeActionsAdmin = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentDeleteThemeActionsAdmin
  }))
);

export const DeleteThemeActionsAdmin = ({
  default: isDefault,
  protected: isProtected,
  ...props
}: ActionsItemThemesAdminProps) => {
  const t = useTranslations('core');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructiveGhost"
          size="icon"
          tooltip={t('delete')}
          disabled={isDefault || isProtected}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <ContentDeleteThemeActionsAdmin default={isDefault} protected={isProtected} {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
