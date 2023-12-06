import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  ChangePosition_Forum_Forums,
  ChangePosition_Forum_ForumsMutation,
  ChangePosition_Forum_ForumsMutationVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

export const useChangePositionForumAdminAPI = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: ChangePosition_Forum_ForumsMutationVariables) =>
      await fetcher<
        ChangePosition_Forum_ForumsMutation,
        ChangePosition_Forum_ForumsMutationVariables
      >({
        query: ChangePosition_Forum_Forums,
        variables
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APIKeys.FORUMS_ADMIN]
      });
    }
  });
};
