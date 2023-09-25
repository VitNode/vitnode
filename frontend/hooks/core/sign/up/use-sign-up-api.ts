import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  SignUp_Core_Members,
  SignUp_Core_MembersMutation,
  SignUp_Core_MembersMutationVariables
} from '@/graphql/hooks';

export const useSignUpAPI = () => {
  return useMutation({
    mutationFn: async (variables: SignUp_Core_MembersMutationVariables) =>
      await fetcher<SignUp_Core_MembersMutation, SignUp_Core_MembersMutationVariables>({
        query: SignUp_Core_Members,
        variables
      })
  });
};
