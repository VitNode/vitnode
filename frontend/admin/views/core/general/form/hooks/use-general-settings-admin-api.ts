import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Settings__General__Edit,
  Admin_Settings__General__EditMutation,
  Admin_Settings__General__EditMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';

export const useGeneralSettingsAdminAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Admin_Settings__General__EditMutationVariables) =>
      await fetcher<
        Admin_Settings__General__EditMutation,
        Admin_Settings__General__EditMutationVariables
      >({
        query: Admin_Settings__General__Edit,
        variables
      }),
    onError: () => {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: t('saved_success')
      });

      // TODO: Update cache
    }
  });
};
