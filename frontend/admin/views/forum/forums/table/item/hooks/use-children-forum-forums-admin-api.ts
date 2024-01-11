import type { InfiniteData } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Admin__Show,
  type Maybe,
  type Forum_Forums__Admin__ShowQuery,
  type Forum_Forums__Admin__ShowQueryVariables,
  type ChildrenShowForumForums,
  type ShowForumForumsAdmin
} from '@/graphql/hooks';

interface Args {
  parentId: number;
  enabled?: boolean;
}

// ! Be careful, this function is recursive with changed children type
const updateState = ({
  data,
  edges,
  parentId
}: {
  data: Forum_Forums__Admin__ShowQuery;
  edges: Omit<ShowForumForumsAdmin, 'permissions'>[];
  parentId: number;
}): Omit<ShowForumForumsAdmin, 'permissions'>[] => {
  return edges.map(edge => {
    if (edge.id === parentId) {
      return {
        ...edge,
        children: data.forum_forums__admin__show.edges as unknown as Maybe<
          ChildrenShowForumForums[]
        >
      };
    }

    if ((edge.children ?? []).length > 0) {
      return {
        ...edge,
        children: updateState({
          parentId,
          edges: edge.children as unknown as ShowForumForumsAdmin[],
          data
        }) as unknown as Maybe<ChildrenShowForumForums[]>
      };
    }

    return edge;
  });
};

export const useChildrenForumForumsAdminAPI = ({ enabled, parentId }: Args) => {
  const queryClient = useQueryClient();
  const { isFetching, isLoading } = useQuery({
    queryKey: [APIKeys.FORUMS_CHILDREN_ADMIN, { parentId }],
    queryFn: async () => {
      const { data } = await fetcher<
        Forum_Forums__Admin__ShowQuery,
        Forum_Forums__Admin__ShowQueryVariables
      >({
        query: Forum_Forums__Admin__Show,
        variables: {
          parentId
        }
      });

      queryClient.setQueryData<InfiniteData<Forum_Forums__Admin__ShowQuery>>(
        [APIKeys.FORUMS_ADMIN],
        old => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              forum_forums__admin__show: {
                ...page.forum_forums__admin__show,
                edges: updateState({
                  parentId,
                  edges: page.forum_forums__admin__show.edges,
                  data
                })
              }
            }))
          };
        }
      );

      return data;
    },
    enabled
  });

  return {
    isLoading: isLoading || isFetching
  };
};
