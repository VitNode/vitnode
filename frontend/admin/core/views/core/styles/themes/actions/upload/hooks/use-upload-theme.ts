import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  };

  return { form, onSubmit };
};
