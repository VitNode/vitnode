import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useCreatePluginAdmin = () => {
  const formSchema = z.object({
    name: z.string().min(3).max(100),
    code: z.string().min(5).max(50),
    description: z.string(),
    support_url: z.string().url().or(z.literal('')),
    author: z.string().min(3).max(100),
    author_url: z.string().url()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      support_url: '',
      author: '',
      author_url: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return {
    form,
    onSubmit
  };
};
