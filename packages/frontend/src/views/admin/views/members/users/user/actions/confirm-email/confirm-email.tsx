import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { ContentConfirmEmailActionUserMembersAdmin } from './content';
import { mutationApi } from './mutation-api';

export const ConfirmEmailActionUserMembersAdmin = ({ id }: { id: number }) => {
  const t = useTranslations('admin.members.users.item.confirm_email');
  const tCore = useTranslations('core.errors');

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });

    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
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
