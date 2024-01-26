import { useTranslations } from 'next-intl';

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SubmitContentDeleteThemeActionsAdmin } from './submit';
import type { ActionsItemThemesAdminProps } from '../actions';
import { useDeleteThemeAdmin } from './hooks/use-delete-theme-admin';

export const ContentDeleteThemeActionsAdmin = ({
  author,
  id,
  name
}: ActionsItemThemesAdminProps) => {
  const t = useTranslations('admin.core.styles.themes.delete');
  const tCore = useTranslations('core');
  const { onSubmit } = useDeleteThemeAdmin({ name, id });

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

        <SubmitContentDeleteThemeActionsAdmin />
      </AlertDialogFooter>
    </form>
  );
};
