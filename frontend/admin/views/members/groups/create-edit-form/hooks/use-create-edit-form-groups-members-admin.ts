import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateGroupAdminAPI } from './use-create-group-admin-api';

import { zodTextInputLanguageType } from '../../../../../../components/text-input-language';
import { ShowAdminGroups } from '../../../../../../graphql/hooks';

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, 'name'>;
}

export const useCreateEditFormGroupsMembersAdmin = ({
  data
}: CreateEditFormGroupsMembersAdminArgs) => {
  const tCore = useTranslations('core');
  const { isPending, mutateAsync } = useCreateGroupAdminAPI();

  const formSchema = z.object({
    name: zodTextInputLanguageType.min(1, tCore('forms.empty')),
    test: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      test: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutateAsync({
      name: values.name
    });
  };

  return { form, formSchema, onSubmit, isPending };
};
