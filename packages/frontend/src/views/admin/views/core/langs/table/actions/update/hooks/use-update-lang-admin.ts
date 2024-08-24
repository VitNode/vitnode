import { useDialog } from '@/components/ui/dialog';
import { ShowCoreLanguages } from '@/graphql/types';
import { zodFile } from '@/helpers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useUpdateLangAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.langs.actions.update');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const formSchema = z.object({
    lang_file: zodFile,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!(values.lang_file instanceof File)) return;

    const formData = new FormData();
    formData.append('file', values.lang_file);
    formData.append('code', code);
    const mutation = await mutationApi(formData);
    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t('success'), {
      description: name,
    });
  };

  return { onSubmit, formSchema };
};
