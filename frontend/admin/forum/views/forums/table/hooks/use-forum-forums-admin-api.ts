import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { APIKeys } from "@/graphql/api-keys";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Show,
  type Admin__Forum_Forums__ShowQuery,
  type Admin__Forum_Forums__ShowQueryVariables,
  type ShowForumForumsAdmin
} from "@/graphql/hooks";

export interface Admin__Forum_Forums__ShowQueryItem
  extends Omit<ShowForumForumsAdmin, "parent" | "permissions"> {}

export const useForumForumsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await fetcher<
        Admin__Forum_Forums__ShowQuery,
        Admin__Forum_Forums__ShowQueryVariables
      >({
        query: Admin__Forum_Forums__Show,
        variables: pageParam,
        signal
      });

      return data;
    },
    initialPageParam: {
      first: 10
    },
    getNextPageParam: ({ admin__forum_forums__show: { pageInfo } }) => {
      if (pageInfo.hasNextPage) {
        return {
          first: 10,
          cursor: pageInfo.endCursor
        };
      }
    }
  });

  const data: ShowForumForumsAdmin[] = useMemo(() => {
    return (
      query.data?.pages.flatMap(
        ({ admin__forum_forums__show: { edges } }) => edges
      ) ?? []
    );
  }, [query.data]);

  return {
    ...query,
    data
  };
};
