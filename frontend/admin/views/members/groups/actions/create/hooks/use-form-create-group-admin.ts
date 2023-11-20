import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { zodTextInputLanguageType } from '@/components/text-input-language';
import { useCreateGroupAdminAPI } from './use-create-group-admin-api';

export const useFormCreateGroupAdmin = () => {
  const tCore = useTranslations('core');
  const { mutateAsync, ...rest } = useCreateGroupAdminAPI();

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
    await mutateAsync({
      name: values.name
    });
  };

  return { form, formSchema, onSubmit, ...rest };
};
