import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-intl/client';

import { fetcher } from '@/graphql/fetcher';
import {
  SignIn_Core_Sessions,
  SignIn_Core_SessionsMutation,
  SignIn_Core_SessionsMutationVariables
} from '@/graphql/hooks';

import { useSession } from '../../use-session';

export const useSignInAPI = () => {
  const { setEnableSessionQuery } = useSession();
  const { push } = useRouter();

  // TODO: Add notification toast when is an error
  return useMutation<SignIn_Core_SessionsMutation, string, SignIn_Core_SessionsMutationVariables>({
    mutationFn: async variables =>
      await fetcher({
        query: SignIn_Core_Sessions,
        variables
      }),
    onSuccess: () => {
      setEnableSessionQuery(true);
      push('/');
    }
  });
};
