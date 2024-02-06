import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { APIKeys } from "@/graphql/api-keys";
import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Admin__Show,
  type Forum_Forums__Admin__ShowQuery,
  type Forum_Forums__Admin__ShowQueryVariables,
  type ShowForumForumsAdmin
} from "@/graphql/hooks";

export interface Forum_Forums__Admin__ShowQueryItem
  extends Omit<ShowForumForumsAdmin, "parent" | "permissions"> {}

export const useForumForumsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await fetcher<
        Forum_Forums__Admin__ShowQuery,
        Forum_Forums__Admin__ShowQueryVariables
      >({
        query: Forum_Forums__Admin__Show,
        variables: pageParam,
        signal
      });

      return data;
    },
    initialPageParam: {
      first: 10
    },
    getNextPageParam: ({ forum_forums__admin__show: { pageInfo } }) => {
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
        ({ forum_forums__admin__show: { edges } }) => edges
      ) ?? []
    );
  }, [query.data]);

  return {
    ...query,
    data
  };
};
