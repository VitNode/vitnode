import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useFormCreateEditFormGroupsMembersAdmin = () => {
  const formSchema = z.object({
    type: z.enum(['group', 'user']),
    user: z
      .object({
        id: z.string(),
        name: z.string()
      })
      .optional()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'group'
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
