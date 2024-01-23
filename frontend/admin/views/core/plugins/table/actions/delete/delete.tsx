import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { ActionsItemPluginsAdminProps } from '../actions';

const ContentDeletePluginActionsAdmin = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentDeletePluginActionsAdmin
  }))
);

export const DeletePluginActionsAdmin = ({
  default: isDefault,
  protected: isProtected,
  ...props
}: ActionsItemPluginsAdminProps) => {
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
          <ContentDeletePluginActionsAdmin default={isDefault} protected={isProtected} {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
