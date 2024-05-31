import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import * as React from "react";

import { getIdFormString } from "@/functions/url";
import { ShowPostsForumsSortingEnum } from "@/utils/graphql/hooks";
import { queryApi } from "./query-api";
import { APIKeys } from "@/utils/graphql/api-keys";

interface Props {
  initialCount: number;
  limit: number;
  totalCount: number;
}

export const useMorePosts = ({ initialCount, limit, totalCount }: Props) => {
  const [enabled, setEnabled] = React.useState(false);
  const { id } = useParams();
  const postsToLoad = totalCount - initialCount;
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const query = useInfiniteQuery({
    queryKey: [APIKeys.POSTS_MORE, { id, sort, limit, postsToLoad }],
    queryFn: async ({ pageParam }) => {
      let sortBy: ShowPostsForumsSortingEnum | undefined;
      if (sort === ShowPostsForumsSortingEnum.newest) {
        sortBy = ShowPostsForumsSortingEnum.newest;
      } else {
        sortBy = ShowPostsForumsSortingEnum.oldest;
      }

      const data = await queryApi({
        id: getIdFormString(id),
        sortBy,
        limit: limit,
        page: pageParam.page + 1
      });

      return {
        forum_posts__show: {
          edges: data.forum_posts__show.edges.splice(0, pageParam.splice),
          pageInfo: data.forum_posts__show.pageInfo
        }
      };
    },
    initialPageParam: {
      page: 1,
      splice: postsToLoad > limit ? limit : postsToLoad
    },
    getNextPageParam: ({ forum_posts__show: { pageInfo } }, allPages) => {
      const totalCount = allPages.flatMap(
        item => item.forum_posts__show.edges
      ).length;
      const splice = postsToLoad - totalCount;

      if (pageInfo.hasNextPage && splice > 0) {
        return {
          page: allPages.length + 1,
          splice
        };
      }
    },
    enabled
  });

  const data = React.useMemo(
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
