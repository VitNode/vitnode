import { Virtuoso } from 'react-virtuoso';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { ItemTableForumsForumAdmin } from './item';
import { useForumForumsAdminAPI } from '../hooks/use-forum-forums-admin-api';

export const ContentTableForumsForumAdmin = () => {
  const { data } = useForumForumsAdminAPI();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners}>
      <SortableContext items={data}>
        <Virtuoso
          useWindowScroll
          data={data}
          className="rounded-md border overflow-x-auto overflow-y-hidden"
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
