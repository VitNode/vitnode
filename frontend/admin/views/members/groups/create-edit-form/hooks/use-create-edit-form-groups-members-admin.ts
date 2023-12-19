import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useQueryClient } from '@tanstack/react-query';

import { zodTextLanguageInputType } from '@/components/text-language-input';
import type { ShowAdminGroups } from '@/graphql/hooks';
import { mutationCreateApi } from './mutation-create-api';
import { mutationEditApi } from './mutation-edit-api';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { usePathname, useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, 'name' | 'id'>;
}

export const useCreateEditFormGroupsMembersAdmin = ({
  data
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const { toast } = useToast();
  const { setOpen } = useDialog();
  const queryClient = useQueryClient();
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const { push } = useRouter();

  const formSchema = z.object({
    name: zodTextLanguageInputType.min(1, tCore('forms.empty')),
    test: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      test: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;
    if (data) {
      const mutationEdit = await mutationEditApi({
        id: data.id,
        name: values.name
      });

      if (mutationEdit.error) {
        isError = true;
      }
    } else {
      const mutationCreate = await mutationCreateApi({
        name: values.name
      });

      if (mutationCreate.error) {
        isError = true;
      }
    }

    if (isError) {
      toast({
        title: tCore('errors.title'),
        description: tCore('errors.internal_server_error'),
        variant: 'destructive'
      });

      return;
    }

    push(pathname);

    queryClient.refetchQueries({
      queryKey: [APIKeys.GROUPS_MEMBERS_ADMIN]
    });

    toast({
      title: data ? t('edit.success') : t('create.success'),
      description: convertText(values.name)
    });

    setOpen(false);
  };

  return { form, formSchema, onSubmit };
};
