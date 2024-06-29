import { useTranslations } from 'next-intl';
import { Trash } from 'lucide-react';

import { useDeleteNavAdmin } from './hooks/use-delete-nav-admin';
import { SubmitDeleteActionTableNavAdmin } from './submit';

import { ShowCoreNav } from '../../../../../../../../../graphql/graphql';
import { useTextLang } from '../../../../../../../../../hooks/use-text-lang';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../../../../../../components/ui/alert-dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../../../../../../../components/ui/alert';
import { Button } from '../../../../../../../../../components/ui/button';

export const ContentDeleteActionTableNavAdmin = ({
  children,
  id,
  name,
}: Pick<ShowCoreNav, 'children' | 'id' | 'name'>) => {
  const t = useTranslations('admin.core.styles.nav.delete');
  const tCore = useTranslations('core');
  const { onSubmit } = useDeleteNavAdmin({ id, name });
  const { convertText } = useTextLang();

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            name: () => (
              <span className="text-foreground font-bold">
                {convertText(name)}
              </span>
            ),
          })}
        </AlertDialogDescription>

        {children.length > 0 && (
          <Alert variant="destructive">
            <Trash className="size-4" />
            <AlertTitle>{tCore('hands_up')}</AlertTitle>
            <AlertDescription>{t('desc_with_children')}</AlertDescription>
          </Alert>
        )}
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore('cancel')}
          </Button>
        </AlertDialogCancel>
        <SubmitDeleteActionTableNavAdmin />
      </AlertDialogFooter>
    </form>
  );
};
