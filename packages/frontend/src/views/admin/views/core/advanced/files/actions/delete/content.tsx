import { useTranslations } from 'next-intl';

import { SubmitDeleteActionFilesAdvancedCoreAdmin } from './submit';
import { useDeleteFileAdvancedAdmin } from './hooks/use-delete-file-advanced-admin';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Admin__Core_Files__ShowQuery } from '@/graphql/queries/admin/advanced/files/admin__core_files__show.generated';

export type ContentDeleteActionFilesAdvancedCoreAdminProps = Pick<
  Admin__Core_Files__ShowQuery['admin__core_files__show']['edges'][0],
  'count_uses' | 'file_name_original' | 'id'
>;

export const ContentDeleteActionFilesAdvancedCoreAdmin = ({
  count_uses,
  file_name_original,
  id,
}: ContentDeleteActionFilesAdvancedCoreAdminProps) => {
  const t = useTranslations('admin.core.advanced.files.delete');
  const tCore = useTranslations('core');
  const { onSubmit } = useDeleteFileAdvancedAdmin({
    file_name_original,
    id,
  });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {tCore(count_uses > 0 ? 'are_you_absolutely_sure' : 'are_you_sure')}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            name: () => (
              <span className="text-foreground font-bold">
                {file_name_original}
              </span>
            ),
          })}
        </AlertDialogDescription>
        {count_uses > 0 && (
          <AlertDialogDescription className="text-destructive">
            {t('uses_warning')}
          </AlertDialogDescription>
        )}
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore('cancel')}
          </Button>
        </AlertDialogCancel>

        <SubmitDeleteActionFilesAdvancedCoreAdmin />
      </AlertDialogFooter>
    </form>
  );
};
