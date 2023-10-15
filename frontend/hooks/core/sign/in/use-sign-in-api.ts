import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  SignIn_Core_Sessions,
  SignIn_Core_SessionsMutation,
  SignIn_Core_SessionsMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

import { useSession } from '../../use-session';

export const useSignInAPI = () => {
  const queryClient = useQueryClient();
  const { setEnableSessionQuery } = useSession();
  const { push } = useRouter();

  // TODO: Add notification toast when is an error
  return useMutation<SignIn_Core_SessionsMutation, string, SignIn_Core_SessionsMutationVariables>({
    mutationFn: async variables =>
      await fetcher({
        query: SignIn_Core_Sessions,
        variables
      }),
    onSuccess: (_data, variables) => {
      setEnableSessionQuery(true);
      queryClient.resetQueries({
        queryKey: [APIKeys.AUTHORIZATION]
      });
      push(variables.admin ? '/admin/core' : '/');
    }
  });
};
