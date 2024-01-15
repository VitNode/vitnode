'use client';

import { useMorePosts } from '@/hooks/forums/forum/posts/use-more-posts';
import { ButtonLoadMorePosts } from './button';
import { ListPosts } from '../list';
import { cx } from '@/functions/classnames';

interface Props {
  endCursor: number;
  initialCount: number;
  totalCount: number;
}

export const LoadMorePosts = ({ endCursor, initialCount, totalCount }: Props) => {
  const { data, fetchNextPage, isFetching } = useMorePosts({
    totalCount,
    initialCount,
    endCursor
  });
  const countToLoad = totalCount - data.length - 20;

  return (
    <>
      {data.length > 0 && (
        <ListPosts
          id="load_more_posts"
          className={cx('py-5', {
            'pb-0': countToLoad > 0
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
