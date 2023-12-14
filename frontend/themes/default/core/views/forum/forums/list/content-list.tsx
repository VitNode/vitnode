import { forwardRef } from 'react';
import { Components, Virtuoso } from 'react-virtuoso';

import { useShowForumsAPI } from '@/hooks/forums/forum/use-show-forums-api';
import { CategoryForum } from './category';
import { Loader } from '@/components/loader/loader';

const List: Components['List'] = forwardRef((props, ref) => {
  return <div className="flex flex-col gap-4" {...props} ref={ref} />;
});
List.displayName = 'List';

export const ContentListForumsForum = () => {
  const { data, fetchNextPage, hasNextPage, isError, isLoading } = useShowForumsAPI();

  if (isLoading) return <Loader />;
  // TODO: Error handling
  if (isError) return <div>Error</div>;

  return (
    <Virtuoso
      data={data}
      useWindowScroll
      components={{
        List
      }}
      endReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      itemContent={(index, data) => <CategoryForum {...data} />}
    />
  );
};
