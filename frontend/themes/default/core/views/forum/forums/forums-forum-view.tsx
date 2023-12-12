'use client';

import { Components, Virtuoso } from 'react-virtuoso';
import { forwardRef } from 'react';

import { CategoryForum } from './category';
import { useShowForumsAPI } from './hooks/use-show-forums-api';

export const ForumsForumView = () => {
  const { data } = useShowForumsAPI();

  const List: Components['List'] = forwardRef((props, ref) => {
    return <div className="flex flex-col gap-4" {...props} ref={ref} />;
  });

  List.displayName = 'List';

  return (
    <Virtuoso
      data={data}
      useWindowScroll
      components={{
        List
      }}
      itemContent={(index, data) => <CategoryForum {...data} />}
    />
  );
};
