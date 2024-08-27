import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ShowAdminPlugins } from '@/graphql/types';
import { InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useDeletePluginAdmin } from './hooks/use-delete-plugin-admin';
import { SubmitContentDeletePluginActionsAdmin } from './submit';

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

      <Alert className="mt-4" variant="primary">
        <InfoIcon className="size-4" />
        <AlertTitle>{t('alert.title')}</AlertTitle>
        <AlertDescription>{t('alert.desc')}</AlertDescription>
      </Alert>

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
