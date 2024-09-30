import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { ContentConfirmEmailActionUserMembersAdmin } from './content';
import { mutationApi } from './mutation-api';

export const ConfirmEmailActionUserMembersAdmin = ({ id }: { id: number }) => {
  const t = useTranslations('admin.members.users.item.confirm_email');
  const tError = useTranslations('core.global.errors');

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });

    if (mutation?.error) {
      toast.error(tError('title'), {
        description: tError('internal_server_error'),
      });

      return;
    }

    toast.success(t('success'));
  };

  return (
    <form action={onSubmit}>
      <ContentConfirmEmailActionUserMembersAdmin />
    </form>
  );
};
