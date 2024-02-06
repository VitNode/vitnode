import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getIdFormString } from "@/functions/url";
import { APIKeys } from "@/graphql/api-keys";
import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Show_Item_More,
  type Forum_Forums__Show_Item_MoreQuery,
  type Forum_Forums__Show_Item_MoreQueryVariables,
  type ShowTopicsForumsObj
} from "@/graphql/hooks";

interface Args {
  initData: ShowTopicsForumsObj;
}

const FIRST = 25;

export const useTopicsList = ({ initData }: Args) => {
  const { id } = useParams();

  const query = useInfiniteQuery({
    queryKey: [APIKeys.TOPICS_IN_FORUM, { id }],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await fetcher<
        Forum_Forums__Show_Item_MoreQuery,
        Forum_Forums__Show_Item_MoreQueryVariables
      >({
        query: Forum_Forums__Show_Item_More,
        variables: {
          ...pageParam,
          forumId: getIdFormString(id)
        },
        signal
      });

      return data;
    },
    initialPageParam: {
      first: FIRST
    },
    initialData: {
      pages: [{ forum_topics__show: initData }],
      pageParams: [{ first: FIRST }]
    },
    getNextPageParam: ({ forum_topics__show: { pageInfo } }) => {
      if (pageInfo.hasNextPage) {
        return {
          first: FIRST,
          cursor: pageInfo.endCursor
        };
      }
    }
  });

  const data = useMemo(
    () => query.data.pages.flatMap(page => page.forum_topics__show.edges) ?? [],
    [query.data.pages]
  );

  return {
    ...query,
    data
  };
};
