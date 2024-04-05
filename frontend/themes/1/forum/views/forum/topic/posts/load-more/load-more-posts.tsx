"use client";

import { useMorePosts } from "@/hooks/forum/posts/use-more-posts";
import { ButtonLoadMorePosts } from "./button";
import { ListPosts } from "../list";
import { cn } from "@/functions/classnames";

interface Props {
  initialCount: number;
  limit: number;
  totalCount: number;
}

export const LoadMorePosts = ({ initialCount, limit, totalCount }: Props) => {
  const { data, fetchNextPage, isFetching } = useMorePosts({
    totalCount,
    initialCount,
    limit
  });
  const countToLoad = totalCount - data.length - limit * 2;

  return (
    <>
      {data.length > 0 && (
        <ListPosts
          id="load_more_posts"
          className={cn("py-5", {
            "pb-0": countToLoad > 0
          })}
          edges={data}
        />
      )}

      {countToLoad > 0 && (
        <ButtonLoadMorePosts
          count={countToLoad}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
        />
      )}
    </>
  );
};
