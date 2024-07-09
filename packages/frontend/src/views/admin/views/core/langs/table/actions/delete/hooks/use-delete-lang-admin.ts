import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

import { ShowCoreLanguages } from '@/graphql/graphql';
import { useAlertDialog } from '@/components/ui/alert-dialog';
import { usePathname, useRouter } from '@/navigation';

export const useDeleteLangAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.langs.actions.delete');
  const tCore = useTranslations('core');
  const { setOpen } = useAlertDialog();
  const pathname = usePathname();
  const { push } = useRouter();
  const formSchema = z.object({
    name: z.string().refine(value => value === name),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name !== name) return;

    try {
      await mutationApi({ code });
    } catch (error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    push(pathname);

    toast.success(t('success'), {
      description: name,
    });

    setOpen(false);
  };

  return { form, onSubmit };
};
