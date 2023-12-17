import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { mutationDeleteApi } from './api/mutation-delete-api';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

interface FormType {
  file: File[];
  type: 'upload' | 'delete';
}

export const useModalChangeAvatar = () => {
  const [isPending, setPending] = useState(false);
  const t = useTranslations('core');
  const { toast } = useToast();
  const { setOpen } = useDialog();

  const form = useForm<FormType>({
    defaultValues: {
      type: 'upload',
      file: []
    },
    mode: 'onChange'
  });

  const onSubmit = async ({ type }: FormType) => {
    if (type === 'delete') {
      setPending(true);

      const mutation = await mutationDeleteApi();
      if (mutation.error) {
        toast({
          title: t('errors.title'),
          description: t('settings.change_avatar.options.delete.error'),
          variant: 'destructive'
        });
      } else {
        toast({
          title: t('settings.change_avatar.options.delete.title'),
          description: t('settings.change_avatar.options.delete.success')
        });
        setOpen(false);
      }

      setPending(false);
    }
  };

  return {
    form,
    onSubmit,
    isPending
  };
};
