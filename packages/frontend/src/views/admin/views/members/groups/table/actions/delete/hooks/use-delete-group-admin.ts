import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

import { mutationApi } from './mutation-api';
import { useTextLang } from '@/hooks/use-text-lang';
import { useAlertDialog } from '@/components/ui/alert-dialog';
import { usePathname, useRouter } from '@/navigation';
import { ShowAdminGroups } from '@/graphql/types';

export const useDeleteGroupAdmin = ({
  id,
  name,
}: Pick<ShowAdminGroups, 'id' | 'name'>) => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core');
  const { convertText } = useTextLang();
  const formatName = convertText(name);
  const { setOpen } = useAlertDialog();
  const pathname = usePathname();
  const { push } = useRouter();

  const formSchema = z.object({
    name: z.string().refine(value => value === formatName),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name !== formatName) return;
    const mutation = await mutationApi({ id });

    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    push(pathname);
    toast.success(t('success'));
    setOpen(false);
  };

  return { onSubmit, formSchema };
};
