import {
  AlertDialogContent,
  useAlertDialog,
} from '@/components/ui/alert-dialog';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { ContentDeleteActionUserMembersAdmin } from './content';
import { mutationApi } from './mutation-api';

export const DeleteActionUserMembersAdmin = ({
  name,
  id,
}: Pick<
  Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
  'id' | 'name'
>) => {
  const t = useTranslations('admin.members.users.item.delete');
  const tError = useTranslations('core.global.errors');
  const { setOpen } = useAlertDialog();
  const { push } = useRouter();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });

    if (mutation?.error) {
      if (mutation.error === 'DELETE_ADMIN') {
        toast.error(t('delete_admin.title'), {
          description: t('delete_admin.desc'),
        });

        return;
      }

      toast.error(tError('title'), {
        description: tError('internal_server_error'),
      });

      return;
    }

    setOpen(false);
    push('/admin/members/users');
    toast.success(t('success'), {
      description: name,
    });
  };

  return (
    <AlertDialogContent>
      <form action={onSubmit}>
        <ContentDeleteActionUserMembersAdmin name={name} />
      </form>
    </AlertDialogContent>
  );
};
