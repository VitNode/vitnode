import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { APIKeys } from "@/graphql/api-keys";
import { type ShowForumForumsAdmin } from "@/graphql/hooks";
import { queryApi } from "./query-api";

export interface Admin__Forum_Forums__ShowQueryItem
  extends Omit<ShowForumForumsAdmin, "parent" | "permissions"> {}

export const useForumForumsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam }) => {
      return await queryApi(pageParam);
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
