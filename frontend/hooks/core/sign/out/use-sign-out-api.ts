import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next-intl/client';

import { fetcher } from '@/graphql/fetcher';
import {
  SignOut_Core_Sessions,
  SignOut_Core_SessionsMutation,
  SignOut_Core_SessionsMutationVariables
} from '@/graphql/hooks';

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
      queryClient.setQueryData(['Authorization'], () => null);

      setEnableSessionQuery(false);
      push('/');
    }
  });
};
