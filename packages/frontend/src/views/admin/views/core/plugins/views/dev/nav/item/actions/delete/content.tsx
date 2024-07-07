import { useTranslations } from 'next-intl';

import { SubmitDeleteActionTableNavDevPluginAdmin } from './submit';
import { useDeleteNavPluginAdmin } from './hooks/use-delete-nav-plugin-admin';

import { ShowAdminNavPluginsObj } from '@/graphql/graphql';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export interface ContentDeleteActionTableNavDevPluginAdminProps
  extends Pick<ShowAdminNavPluginsObj, 'code'> {
  parentCode?: string;
}

export const ContentDeleteActionTableNavDevPluginAdmin = ({
  code,
  parentCode,
}: ContentDeleteActionTableNavDevPluginAdminProps) => {
  const t = useTranslations('admin.core.plugins.dev.nav.delete');
  const tCore = useTranslations('core');
  const { onSubmit } = useDeleteNavPluginAdmin({ code, parentCode });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            code: () => (
              <span className="text-foreground font-bold">{code}</span>
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
        <SubmitDeleteActionTableNavDevPluginAdmin />
      </AlertDialogFooter>
    </form>
  );
};
