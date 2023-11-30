import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateGroupAdminAPI } from './use-create-group-admin-api';
import { zodTextLanguageInputType } from '@/components/text-language-input';
import { ShowAdminGroups } from '@/graphql/hooks';
import { useEditGroupAdminAPI } from './use-edit-group-admin-api';

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, 'name' | 'id'>;
}

export const useCreateEditFormGroupsMembersAdmin = ({
  data
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations('core');
  const { isPending, mutateAsync } = useCreateGroupAdminAPI();
  const { isPending: editIsPending, mutateAsync: editMutateAsync } = useEditGroupAdminAPI();

  const formSchema = z.object({
    name: zodTextLanguageInputType.min(1, t('forms.empty')),
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
    if (data) {
      await editMutateAsync({
        id: data.id,
        name: values.name
      });

      return;
    }

    await mutateAsync({
      name: values.name
    });
  };

  return { form, formSchema, onSubmit, isPending: isPending || editIsPending };
};
