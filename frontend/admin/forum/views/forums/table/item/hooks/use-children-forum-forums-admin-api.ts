import {
  useQuery,
  useQueryClient,
  type InfiniteData
} from "@tanstack/react-query";

import { APIKeys } from "@/graphql/api-keys";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Show,
  type Maybe,
  type Admin__Forum_Forums__ShowQuery,
  type Admin__Forum_Forums__ShowQueryVariables,
  type ChildrenShowForumForums,
  type ShowForumForumsAdmin
} from "@/graphql/hooks";

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
  data: Admin__Forum_Forums__ShowQuery;
  edges: Omit<ShowForumForumsAdmin, "permissions">[];
  parentId: number;
}): Omit<ShowForumForumsAdmin, "permissions">[] => {
  return edges.map(edge => {
    if (edge.id === parentId) {
      return {
        ...edge,
        children: data.admin__forum_forums__show.edges as unknown as Maybe<
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
        Admin__Forum_Forums__ShowQuery,
        Admin__Forum_Forums__ShowQueryVariables
      >({
        query: Admin__Forum_Forums__Show,
        variables: {
          parentId
        }
      });

      queryClient.setQueryData<InfiniteData<Admin__Forum_Forums__ShowQuery>>(
        [APIKeys.FORUMS_ADMIN],
        old => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              admin__forum_forums__show: {
                ...page.admin__forum_forums__show,
                edges: updateState({
                  parentId,
                  edges: page.admin__forum_forums__show.edges,
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
