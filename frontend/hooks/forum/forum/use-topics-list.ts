import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getIdFormString } from "@/functions/url";
import { APIKeys } from "@/graphql/api-keys";
import { Forum_Forums__Show_ItemQuery } from "@/graphql/hooks";
import { queryApi } from "./query-api";

interface Args {
  initData: Forum_Forums__Show_ItemQuery["forum_topics__show"];
}

const FIRST = 25;

export const useTopicsList = ({ initData }: Args) => {
  const { id } = useParams();

  const query = useInfiniteQuery({
    queryKey: [APIKeys.TOPICS_IN_FORUM, { id }],
    queryFn: async ({ pageParam }) =>
      queryApi({
        ...pageParam,
        forumId: getIdFormString(id)
      }),
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
