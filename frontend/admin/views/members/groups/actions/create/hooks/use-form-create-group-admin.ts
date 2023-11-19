import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { zodTextInputLanguageType } from '@/components/text-input-language';

export const useFormCreateGroupAdmin = () => {
  const tCore = useTranslations('core');

  const formSchema = z.object({
    name: zodTextInputLanguageType.min(1, tCore('forms.empty')),
    test: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: [],
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
