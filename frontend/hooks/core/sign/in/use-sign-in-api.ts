import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ErrorType, fetcher } from '@/graphql/fetcher';
import {
  SignIn_Core_Sessions,
  SignIn_Core_SessionsMutation,
  SignIn_Core_SessionsMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export const useSignInAPI = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  // TODO: Add notification toast when is an error
  return useMutation<
    SignIn_Core_SessionsMutation,
    ErrorType,
    SignIn_Core_SessionsMutationVariables
  >({
    mutationFn: async variables =>
      await fetcher({
        query: SignIn_Core_Sessions,
        variables
      }),
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries({
        queryKey: [variables.admin ? APIKeys.AUTHORIZATION_ADMIN : APIKeys.AUTHORIZATION]
      });
      push(variables.admin ? '/admin/core/dashboard' : '/');
    }
  });
};
