import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { getIdFormString } from "@/functions/url";
import { APIKeys } from "@/graphql/api-keys";
import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Posts__Show_More,
  ShowPostsForumsSortingEnum,
  type Forum_Posts__Show_MoreQuery,
  type Forum_Posts__Show_MoreQueryVariables
} from "@/graphql/hooks";

interface Props {
  endCursor: number | null | undefined;
  initialCount: number;
  totalCount: number;
}

export const useMorePosts = ({
  endCursor,
  initialCount,
  totalCount
}: Props) => {
  const [enabled, setEnabled] = useState(false);
  const { id } = useParams();
  const postsToLoad = totalCount - initialCount;
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const query = useInfiniteQuery({
    queryKey: [APIKeys.POSTS_MORE, { id, sort }],
    queryFn: async ({ pageParam, signal }) => {
      let sortBy: ShowPostsForumsSortingEnum | undefined;
      if (sort === ShowPostsForumsSortingEnum.newest) {
        sortBy = ShowPostsForumsSortingEnum.newest;
      } else {
        sortBy = ShowPostsForumsSortingEnum.oldest;
      }

      const { data } = await fetcher<
        Forum_Posts__Show_MoreQuery,
        Forum_Posts__Show_MoreQueryVariables
      >({
        query: Forum_Posts__Show_More,
        variables: {
          ...pageParam,
          id: getIdFormString(id),
          sortBy
        },
        signal
      });

      return data;
    },
    initialPageParam: {
      first: postsToLoad > 10 ? 10 : postsToLoad,
      cursor: endCursor
    },
    getNextPageParam: ({ forum_posts__show: { pageInfo } }, allPages) => {
      const totalCount = allPages.flatMap(
        item => item.forum_posts__show.edges
      ).length;
      const first = postsToLoad - totalCount;

      if (pageInfo.hasNextPage && first > 0) {
        return {
          first: first > 10 ? 10 : first,
          cursor: pageInfo.endCursor
        };
      }
    },
    enabled
  });

  const data = useMemo(
    () => query.data?.pages.flatMap(item => item.forum_posts__show.edges) ?? [],
    [query.data]
  );

  const fetchNextPage = async () => {
    if (!enabled) {
      setEnabled(true);

      return;
    }

    if (!query.hasNextPage) return;
    await query.fetchNextPage();
  };

  return {
    ...query,
    data,
    fetchNextPage
  };
};
