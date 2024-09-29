import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

export const ContentDeleteActionUserMembersAdmin = ({
  name,
}: Pick<
  Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
  'name'
>) => {
  const t = useTranslations('admin.members.users.item.delete');
  const tCore = useTranslations('core.global');
  const { pending } = useFormStatus();

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_absolutely_sure')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich('desc', {
            name: () => (
              <span className="text-foreground font-semibold">{name}</span>
            ),
          })}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="ghost">{tCore('cancel')}</Button>
        </AlertDialogCancel>
        <Button loading={pending} type="submit" variant="destructive">
          {t('submit')}
        </Button>
      </AlertDialogFooter>
    </>
  );
};
