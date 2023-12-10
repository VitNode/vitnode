import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Delete,
  Core_Groups__Admin__DeleteMutation,
  Core_Groups__Admin__DeleteMutationVariables
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
    mutationFn: async (variables: Core_Groups__Admin__DeleteMutationVariables) =>
      await fetcher<
        Core_Groups__Admin__DeleteMutation,
        Core_Groups__Admin__DeleteMutationVariables
      >({
        query: Core_Groups__Admin__Delete,
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
