import { Virtuoso } from 'react-virtuoso';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { ItemTableForumsForumAdmin } from './item';
import { useForumForumsAdminAPI } from '../hooks/use-forum-forums-admin-api';
import { APIKeys } from '@/graphql/api-keys';
import { Show_Forum_ForumsQuery } from '@/graphql/hooks';

export const ContentTableForumsForumAdmin = () => {
  const { data } = useForumForumsAdminAPI();
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={context => {
        const findIndex = {
          active: data.findIndex(i => i.id === context.active.id),
          over: data.findIndex(i => i.id === context.over?.id)
        };
        const newEdges = arrayMove(data, findIndex.active, findIndex.over);

        queryClient.setQueryData<InfiniteData<Show_Forum_ForumsQuery>>(
          [APIKeys.FORUMS_ADMIN],
          old => {
            const currentOld = {
              pageParams: old?.pageParams.at(-1),
              page: old?.pages.at(-1)
            };

            if (!currentOld.pageParams || !currentOld.page) return old;

            return {
              pageParams: [currentOld.pageParams],
              pages: [
                {
                  ...currentOld.page,
                  show_forum_forums: {
                    ...currentOld.page.show_forum_forums,
                    edges: newEdges
                  }
                }
              ]
            };
          }
        );
      }}
    >
      <SortableContext items={data}>
        <Virtuoso
          useWindowScroll
          data={data}
          className="rounded-md border"
          components={{
            Item: ({ ...props }) => {
              return <div {...props} className="[&:not(:last-child)]:border-b relative" />;
            }
          }}
          itemContent={(index, data) => <ItemTableForumsForumAdmin key={data.id} {...data} />}
        />
      </SortableContext>
    </DndContext>
  );
};
