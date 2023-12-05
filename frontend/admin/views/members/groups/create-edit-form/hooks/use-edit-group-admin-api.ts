import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Edit_Admin_Groups,
  Edit_Admin_GroupsMutation,
  Edit_Admin_GroupsMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';
import { APIKeys } from '@/graphql/api-keys';
import { useDialog } from '@/components/ui/dialog';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { usePathname, useRouter } from '@/i18n';

export const useEditGroupAdminAPI = () => {
  const t = useTranslations('admin.members.groups.edit');
  const tCore = useTranslations('core.errors');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (variables: Edit_Admin_GroupsMutationVariables) =>
      await fetcher<Edit_Admin_GroupsMutation, Edit_Admin_GroupsMutationVariables>({
        query: Edit_Admin_Groups,
        variables
      }),
    onError: () => {
      toast({
        title: tCore('title'),
        description: tCore('internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: data => {
      push(pathname);

      queryClient.refetchQueries({
        queryKey: [APIKeys.GROUPS_MEMBERS_ADMIN]
      });

      toast({
        title: t('success'),
        description: convertText(data.edit_admin_groups.name)
      });

      setOpen(false);
    }
  });
};
