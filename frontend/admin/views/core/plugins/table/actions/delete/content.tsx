import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  useAlertDialog
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SubmitContentDeletePluginActionsAdmin } from './submit';
import { mutationApi } from './mutation-api';
import type { ActionsItemPluginsAdminProps } from '../actions';

export const ContentDeletePluginActionsAdmin = ({
  author,
  code,
  name
}: ActionsItemPluginsAdminProps) => {
  const t = useTranslations('admin.core.plugins.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ code });
    if (mutation.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error')
      });

      return;
    }

    toast.success(t('success'), {
      description: name
    });

    setOpen(false);
  };

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_absolutely_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            name: () => <span className="font-bold text-foreground">{name}</span>,
            author: () => <span className="font-bold text-foreground">{author}</span>
          })}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore('cancel')}
          </Button>
        </AlertDialogCancel>

        <SubmitContentDeletePluginActionsAdmin />
      </AlertDialogFooter>
    </form>
  );
};
