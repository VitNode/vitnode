import { useAlertDialog } from '@/components/ui/alert-dialog';
import { ShowCoreLanguages } from '@/graphql/types';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useDeleteLangAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.langs.actions.delete');
  const tCore = useTranslations('core.global.errors');
  const { setOpen } = useAlertDialog();
  const pathname = usePathname();
  const { push } = useRouter();
  const formSchema = z.object({
    name: z.string().refine(value => value === name),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name !== name) return;
    const mutation = await mutationApi({ code });
    if (mutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    push(pathname);

    toast.success(t('success'), {
      description: name,
    });

    setOpen(false);
  };

  return { onSubmit, formSchema };
};
