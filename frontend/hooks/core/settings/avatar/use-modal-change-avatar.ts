import { useForm } from 'react-hook-form';

import { useDeleteAvatarAPI } from './api/use-delete-avatar-api';

interface FormType {
  file: File[];
  type: 'upload' | 'delete';
}

export const useModalChangeAvatar = () => {
  const { isPending, mutateAsync } = useDeleteAvatarAPI();

  const form = useForm<FormType>({
    defaultValues: {
      type: 'upload',
      file: []
    },
    mode: 'onChange'
  });

  const onSubmit = async ({ type }: FormType) => {
    if (type === 'delete') {
      await mutateAsync();
    }
  };

  return {
    form,
    onSubmit,
    isPending
  };
};
