import { useTranslations } from 'next-intl';

import type { ShowCoreNav } from '@/graphql/hooks';
import { useDeleteNavAdmin } from './hooks/use-delete-nav-admin';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SubmitDeleteActionTableNavAdmin } from './submit';
import { useTextLang } from '@/hooks/core/use-text-lang';

export const ContentDeleteActionTableNavAdmin = ({
  children,
  id,
  name
}: Pick<ShowCoreNav, 'id' | 'children' | 'name'>) => {
  const t = useTranslations('admin.core.styles.nav.delete');
  const tCore = useTranslations('core');
  const { onSubmit } = useDeleteNavAdmin({ id, name });
  const { convertText } = useTextLang();

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_your_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            name: () => <span className="font-bold text-foreground">{convertText(name)}</span>
          })}
        </AlertDialogDescription>
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
