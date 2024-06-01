import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import * as React from "react";

import { getIdFormString } from "@/functions/url";
import { Forum_Forums__Show_ItemQuery } from "@/utils/graphql/hooks";
import { queryApi } from "./query-api";
import { APIKeys } from "@/utils/graphql/api-keys";

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

  const data = React.useMemo(
    () => query.data.pages.flatMap(page => page.forum_topics__show.edges) ?? [],
    [query.data.pages]
  );

  return {
    ...query,
    data
  };
};
