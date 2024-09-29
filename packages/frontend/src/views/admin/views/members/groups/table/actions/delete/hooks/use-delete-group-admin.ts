import { useAlertDialog } from '@/components/ui/alert-dialog';
import { ShowAdminGroups } from '@/graphql/types';
import { useTextLang } from '@/hooks/use-text-lang';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useDeleteGroupAdmin = ({
  id,
  name,
}: Pick<ShowAdminGroups, 'id' | 'name'>) => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core.global.errors');
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
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    push(pathname);
    toast.success(t('success'));
    setOpen(false);
  };

  return { onSubmit, formSchema };
};
