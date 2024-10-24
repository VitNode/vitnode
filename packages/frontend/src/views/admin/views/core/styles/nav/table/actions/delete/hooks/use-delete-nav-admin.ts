import { useAlertDialog } from '@/components/ui/alert-dialog';
import { ShowCoreNav } from '@/graphql/types';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useDeleteNavAdmin = ({
  id,
  name,
}: Pick<ShowCoreNav, 'id' | 'name'>) => {
  const t = useTranslations('admin.core.styles.nav.delete');
  const tCore = useTranslations('core.global.errors');
  const { setOpen } = useAlertDialog();
  const { convertText } = useTextLang();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });
    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    toast.success(t('success'), {
      description: convertText(name),
    });

    setOpen(false);
  };

  return { onSubmit };
};
