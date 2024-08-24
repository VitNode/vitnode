import { useDialog } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

interface FormType {
  file: File | null;
  type: 'delete' | 'upload';
}

export const useModalChangeAvatar = () => {
  const [isPending, setPending] = React.useState(false);
  const t = useTranslations('core');
  const { setOpen } = useDialog();

  const form = useForm<FormType>({
    defaultValues: {
      type: 'upload',
      file: null,
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
