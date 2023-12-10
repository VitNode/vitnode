import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';
import { useToast } from '@/components/ui/use-toast';

export const useSignOutAPI = () => {
  const t = useTranslations('core');
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () =>
      await fetcher<Core_Sessions__Sign_OutMutation, Core_Sessions__Sign_OutMutationVariables>({
        query: Core_Sessions__Sign_Out
      }),
    onError: () => {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      queryClient.setQueryData<Core_Sessions__AuthorizationQuery>([APIKeys.AUTHORIZATION], old => {
        if (!old) return old;

        return {
          ...old,
          core_sessions__authorization: {
            ...old.core_sessions__authorization,
            user: null
          }
        };
      });

      push('/');
    }
  });
};
