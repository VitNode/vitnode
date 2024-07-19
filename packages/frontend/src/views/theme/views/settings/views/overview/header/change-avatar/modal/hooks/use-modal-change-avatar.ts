import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { useDialog } from '@/components/ui/dialog';

interface FormType {
  file: File[];
  type: 'delete' | 'upload';
}

export const useModalChangeAvatar = () => {
  const [isPending, setPending] = React.useState(false);
  const t = useTranslations('core');
  const { setOpen } = useDialog();

  const form = useForm<FormType>({
    defaultValues: {
      type: 'upload',
      file: [],
    },
    mode: 'onChange',
  });

  const onSubmit = async ({ type }: FormType) => {
    if (type === 'delete') {
      setPending(true);
      const mutation = await mutationApi();
      if (mutation?.error) {
        toast.error(t('errors.title'), {
          description: t('settings.change_avatar.options.delete.error'),
        });
        setPending(false);

        return;
      }

      setPending(false);
      setOpen?.(false);
      toast.success(t('settings.change_avatar.options.delete.title'), {
        description: t('settings.change_avatar.options.delete.success'),
      });
    }
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
