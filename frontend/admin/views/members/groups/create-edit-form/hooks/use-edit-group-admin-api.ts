import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Edit,
  Core_Groups__Admin__EditMutation,
  Core_Groups__Admin__EditMutationVariables
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
    mutationFn: async (variables: Core_Groups__Admin__EditMutationVariables) =>
      await fetcher<Core_Groups__Admin__EditMutation, Core_Groups__Admin__EditMutationVariables>({
        query: Core_Groups__Admin__Edit,
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
        description: convertText(data.core_groups__admin__edit.name)
      });

      setOpen(false);
    }
  });
};
