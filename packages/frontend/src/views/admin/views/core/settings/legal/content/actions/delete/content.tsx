import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  useAlertDialog,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Admin_Core_Terms__ShowQuery } from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { SubmitDeleteContentLegalSettingsAdmin } from './submit';

export const ContentDeleteContentLegalSettingsAdmin = ({
  id,
  title,
}: Pick<
  Admin_Core_Terms__ShowQuery['core_terms__show']['edges'][0],
  'id' | 'title'
>) => {
  const t = useTranslations('admin.core.settings.legal.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();
  const { convertText } = useTextLang();
  const convertedTitle = convertText(title);

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });

    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen(false);
    toast.success(t('success'), {
      description: convertedTitle,
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>{tCore('are_you_sure')}</AlertDialogTitle>
      <AlertDialogDescription>
        {t.rich('desc', {
          name: () => (
            <span className="text-foreground font-semibold">
              {convertedTitle}
            </span>
          ),
        })}
      </AlertDialogDescription>

      <form action={onSubmit}>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">{tCore('cancel')}</Button>
          </AlertDialogCancel>

          <SubmitDeleteContentLegalSettingsAdmin />
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
};
