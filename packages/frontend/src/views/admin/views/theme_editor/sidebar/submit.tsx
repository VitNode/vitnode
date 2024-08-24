import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CONFIG } from '@/helpers/config-with-env';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const SubmitSidebarThemeEditor = ({
  isPending,
  onClick,
  openSubmitDialog,
  setOpenSubmitDialog,
}: {
  isPending: boolean;
  onClick: () => void;
  openSubmitDialog: boolean;
  setOpenSubmitDialog: (open: boolean) => void;
}) => {
  const t = useTranslations('admin.theme_editor.submit');
  const tCore = useTranslations('core');

  return (
    <AlertDialog onOpenChange={setOpenSubmitDialog} open={openSubmitDialog}>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size="sm">
          {tCore('save')}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tCore('are_you_sure')}</AlertDialogTitle>
          <AlertDialogDescription>{t('desc')}</AlertDialogDescription>

          {CONFIG.node_development && (
            <Alert>
              <Check />
              <AlertTitle>{t('dev.title')}</AlertTitle>
              <AlertDescription>{t('dev.desc')}</AlertDescription>
            </Alert>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline">
              {tCore('cancel')}
            </Button>
          </AlertDialogCancel>

          <Button loading={isPending} onClick={onClick} variant="destructive">
            {t('submit')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
