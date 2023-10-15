import { useForm } from 'react-hook-form';

interface FormType {
  file: File[];
  type: 'upload' | 'compact';
}

export const useModalChangeAvatar = () => {
  const form = useForm<FormType>({
    defaultValues: {
      type: 'upload',
      file: []
    },
    mode: 'onChange'
  });

  const onSubmit = (data: FormType) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return {
    form,
    onSubmit
  };
};
