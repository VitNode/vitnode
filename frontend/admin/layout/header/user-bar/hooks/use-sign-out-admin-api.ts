import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_SessionsQuery,
  Admin_Sessions__Sign_Out,
  Admin_Sessions__Sign_OutMutation,
  Admin_Sessions__Sign_OutMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';
import { useToast } from '@/components/ui/use-toast';

export const useSignOutAdminAPI = () => {
  const t = useTranslations('core');
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () =>
      await fetcher<Admin_Sessions__Sign_OutMutation, Admin_Sessions__Sign_OutMutationVariables>({
        query: Admin_Sessions__Sign_Out
      }),
    onError: () => {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      queryClient.setQueryData<Authorization_Core_SessionsQuery>(
        [APIKeys.AUTHORIZATION_ADMIN],
        old => {
          if (!old) return old;

          return {
            ...old,
            authorization_core_sessions: {
              ...old.authorization_core_sessions,
              user: null
            }
          };
        }
      );

      push('/admin');
    }
  });
};
