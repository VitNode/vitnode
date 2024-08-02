import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mutationApi } from './mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { ShowCoreLanguages } from '@/graphql/types';

export const useUpdateLangAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.langs.actions.update');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const formSchema = z.object({
    file: z.array(z.instanceof(File)),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      file: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.file.length) return;

    const formData = new FormData();
    formData.append('file', values.file[0]);
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

  return { form, onSubmit };
};
