import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Admin__Change_Position,
  Forum_Forums__Admin__Change_PositionMutation,
  Forum_Forums__Admin__Change_PositionMutationVariables
} from '@/graphql/hooks';

export const useChangePositionForumAdminAPI = () => {
  return useMutation({
    mutationFn: async (variables: Forum_Forums__Admin__Change_PositionMutationVariables) =>
      await fetcher<
        Forum_Forums__Admin__Change_PositionMutation,
        Forum_Forums__Admin__Change_PositionMutationVariables
      >({
        query: Forum_Forums__Admin__Change_Position,
        variables
      })
  });
};
