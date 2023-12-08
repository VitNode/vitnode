import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Delete_Admin_Groups,
  Delete_Admin_GroupsMutation,
  Delete_Admin_GroupsMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';
import { APIKeys } from '@/graphql/api-keys';
import { usePathname, useRouter } from '@/i18n';
import { useAlertDialog } from '@/components/ui/alert-dialog';

export const useDeleteGroupAdminAPI = () => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core.errors');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setOpen } = useAlertDialog();
  const pathname = usePathname();
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (variables: Delete_Admin_GroupsMutationVariables) =>
      await fetcher<Delete_Admin_GroupsMutation, Delete_Admin_GroupsMutationVariables>({
        query: Delete_Admin_Groups,
        variables
      }),
    onError: () => {
      toast({
        title: tCore('title'),
        description: tCore('internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      push(pathname);

      queryClient.refetchQueries({
        queryKey: [APIKeys.GROUPS_MEMBERS_ADMIN]
      });

      toast({
        title: t('success')
      });

      setOpen(false);
    }
  });
};
