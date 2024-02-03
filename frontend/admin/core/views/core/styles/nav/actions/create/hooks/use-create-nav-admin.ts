import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { useDialog } from '@/components/ui/dialog';
import { useTextLang } from '@/hooks/core/use-text-lang';

export const useCreateNavAdmin = () => {
  const t = useTranslations('admin.core.styles.nav.create');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const formSchema = z.object({
    name: z.array(
      z.object({
        language_code: z.string(),
        value: z.string().min(3).max(50)
      })
    ),
    description: z.array(
      z.object({
        language_code: z.string(),
        value: z.string().max(50)
      })
    ),
    href: z.string().min(1).max(255),
    external: z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: [],
      description: [],
      href: '',
      external: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi(values);

    if (mutation.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error')
      });

      return;
    }

    toast.success(t('success'), {
      description: convertText(values.name)
    });

    setOpen(false);
  };

  return {
    form,
    onSubmit
  };
};
