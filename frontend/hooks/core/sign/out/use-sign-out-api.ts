import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  SignOut_Core_Sessions,
  SignOut_Core_SessionsMutation,
  SignOut_Core_SessionsMutationVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

import { useSession } from '../../use-session';

export const useSignOutAPI = () => {
  const queryClient = useQueryClient();
  const { setEnableSessionQuery } = useSession();
  const { push } = useRouter();
  // TODO: Add notification toast when is an error

  return useMutation({
    mutationFn: async () =>
      await fetcher<SignOut_Core_SessionsMutation, SignOut_Core_SessionsMutationVariables>({
        query: SignOut_Core_Sessions
      }),
    onSuccess: () => {
      queryClient.setQueryData([APIKeys.AUTHORIZATION], () => null);

      setEnableSessionQuery(false);
      push('/');
    }
  });
};
