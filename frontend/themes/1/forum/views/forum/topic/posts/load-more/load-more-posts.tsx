"use client";

import { useMorePosts } from "@/hooks/forum/posts/use-more-posts";
import { ButtonLoadMorePosts } from "./button";
import { ListPosts } from "../list";
import { cn } from "@/functions/classnames";
import { ShowTopicsForums } from "@/graphql/hooks";

interface Props {
  initialCount: number;
  limit: number;
  permissions: ShowTopicsForums["permissions"];
  totalCount: number;
}

export const LoadMorePosts = ({
  initialCount,
  limit,
  permissions,
  totalCount
}: Props) => {
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
          permissions={permissions}
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
