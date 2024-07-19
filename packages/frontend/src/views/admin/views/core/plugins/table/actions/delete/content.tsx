import { useTranslations } from 'next-intl';

import { SubmitContentDeletePluginActionsAdmin } from './submit';
import { useDeletePluginAdmin } from './hooks/use-delete-plugin-admin';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ShowAdminPlugins } from '@/graphql/graphql';
import { Button } from '@/components/ui/button';

export const ContentDeletePluginActionsAdmin = ({
  author,
  code,
  name,
}: ShowAdminPlugins) => {
  const t = useTranslations('admin.core.plugins.delete');
  const tCore = useTranslations('core');
  const { onSubmit } = useDeletePluginAdmin({ code, name });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_absolutely_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            name: () => (
              <span className="text-foreground font-bold">{name}</span>
            ),
            author: () => (
              <span className="text-foreground font-bold">{author}</span>
            ),
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
