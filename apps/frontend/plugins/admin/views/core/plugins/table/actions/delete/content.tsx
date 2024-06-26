import { useTranslations } from 'next-intl';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'vitnode-frontend/components/ui/alert-dialog';
import { Button } from 'vitnode-frontend/components/ui/button';

import { SubmitContentDeletePluginActionsAdmin } from './submit';
import { useDeletePluginAdmin } from './hooks/use-delete-plugin-admin';
import { ShowAdminPlugins } from '@/graphql/hooks';

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
