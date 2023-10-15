import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_SessionsQuery,
  SignOut_Core_Sessions,
  SignOut_Core_SessionsMutation,
  SignOut_Core_SessionsMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export const useSignOutAPI = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  // TODO: Add notification toast when is an error

  return useMutation({
    mutationFn: async () =>
      await fetcher<SignOut_Core_SessionsMutation, SignOut_Core_SessionsMutationVariables>({
        query: SignOut_Core_Sessions
      }),
    onSuccess: () => {
      queryClient.setQueryData<Authorization_Core_SessionsQuery>([APIKeys.AUTHORIZATION], old => {
        if (!old) return old;

        return {
          ...old,
          authorization_core_sessions: {
            ...old.authorization_core_sessions,
            user: null
          }
        };
      });

      push('/');
    }
  });
};
