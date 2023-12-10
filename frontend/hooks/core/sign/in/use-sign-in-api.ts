import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ErrorType, fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Sign_In,
  Core_Sessions__Sign_InMutation,
  Core_Sessions__Sign_InMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export const useSignInAPI = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  // TODO: Add notification toast when is an error
  return useMutation<
    Core_Sessions__Sign_InMutation,
    ErrorType,
    Core_Sessions__Sign_InMutationVariables
  >({
    mutationFn: async variables =>
      await fetcher({
        query: Core_Sessions__Sign_In,
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
