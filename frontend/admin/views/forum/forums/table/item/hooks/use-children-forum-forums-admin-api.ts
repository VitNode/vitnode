import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Maybe,
  ShowForumForumsWithParent,
  Forum_Forums__Admin__Show,
  Forum_Forums__Admin__ShowQuery,
  Forum_Forums__Admin__ShowQueryVariables,
  ChildrenShowForumForums
} from '@/graphql/hooks';

interface Args {
  parentId: string;
  enabled?: boolean;
}

// ! Be careful, this function is recursive with changed children type
const updateState = ({
  data,
  edges,
  parentId
}: {
  data: Forum_Forums__Admin__ShowQuery;
  edges: ShowForumForumsWithParent[];
  parentId: string;
}): ShowForumForumsWithParent[] => {
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
          edges: edge.children as unknown as ShowForumForumsWithParent[],
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
      const data = await fetcher<
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
