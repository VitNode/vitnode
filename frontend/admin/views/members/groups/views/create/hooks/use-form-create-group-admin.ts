import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useFormCreateGroupAdmin = () => {
  const tCore = useTranslations('core');

  const formSchema = z.object({
    name: z
      .string({
        required_error: tCore('forms.empty')
      })
      .min(1, {
        message: tCore('forms.empty')
      }),
    test: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      test: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return { form, formSchema, onSubmit };
};
