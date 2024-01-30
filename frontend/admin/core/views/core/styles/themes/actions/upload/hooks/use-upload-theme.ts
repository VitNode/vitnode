import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { mutationApi } from './mutation-api';

export const useThemeUpload = () => {
  const formSchema = z.object({
    file: z.array(z.instanceof(File))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      file: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.file.length) return;

    const formData = new FormData();
    formData.append('file', values.file[0]);
    const mutation = await mutationApi(formData);
  };

  return { form, onSubmit };
};
