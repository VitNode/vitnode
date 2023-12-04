import { Virtuoso } from 'react-virtuoso';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  UniqueIdentifier
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { ItemTableForumsForumAdmin } from './item';
import {
  Show_Forum_ForumsQueryItem,
  useForumForumsAdminAPI
} from '../hooks/use-forum-forums-admin-api';
import { ShowForumForumsWithParent } from '@/graphql/hooks';

export interface Show_Forum_ForumsQueryFlattenedItem
  extends Omit<ShowForumForumsWithParent, 'parent' | 'children'> {
  depth: number;
  index: number;
  parentId: string | null;
}

const flatten = (
  items: Show_Forum_ForumsQueryItem[],
  parentId: string | null = null,
  depth = 0
): Show_Forum_ForumsQueryFlattenedItem[] => {
  return items.reduce<Show_Forum_ForumsQueryFlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten((item.children ?? []) as Show_Forum_ForumsQueryItem[], item.id, depth + 1)
    ];
  }, []);
};

const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth);
};

const getMaxDepth = ({ previousItem }: { previousItem: Show_Forum_ForumsQueryFlattenedItem }) => {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
};

const getMinDepth = ({ nextItem }: { nextItem: Show_Forum_ForumsQueryFlattenedItem }) => {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
};

interface Projection {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: string | null;
}

const getProjection = (
  items: Show_Forum_ForumsQueryFlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
): Projection => {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  const getParentId = () => {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find(item => item.depth === depth)?.parentId;

    return newParent ?? null;
  };

  return { depth, maxDepth, minDepth, parentId: getParentId() };
};

const indentationWidth = 20;

export const ContentTableForumsForumAdmin = () => {
  const { data } = useForumForumsAdminAPI();
  const queryClient = useQueryClient();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [projected, setProjected] = useState<Projection | null>();

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // DndKit doesn't support nested sortable, so we need to flatten the data in one array
  const flattenedItems: Show_Forum_ForumsQueryFlattenedItem[] = useMemo(() => {
    return flatten(data);
  }, [data]);

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragCancel={resetState}
      onDragOver={({ over }) => setOverId(over?.id ?? null)}
      onDragMove={({ delta }) => {
        if (!activeId || !overId) return;

        const currentProjection = getProjection(
          flattenedItems,
          activeId,
          overId,
          delta.x,
          indentationWidth
        );

        if (projected?.parentId === currentProjection.parentId) {
          return;
        }

        setProjected(currentProjection);
      }}
      onDragStart={({ active: { id: activeId } }) => {
        setActiveId(activeId);
        setOverId(activeId);
      }}
      onDragEnd={({ active, over }) => {
        resetState();

        if (!projected || !over) return;
        const { depth, parentId } = projected;

        // TODO: Remove this
        // eslint-disable-next-line no-console
        console.log({ depth, parentId });

        // const findIndex = {
        //   active: data.findIndex(i => i.id === active.id),
        //   over: data.findIndex(i => i.id === over?.id)
        // };
        // const newEdges = arrayMove(data, findIndex.active, findIndex.over);

        // queryClient.setQueryData<InfiniteData<Show_Forum_ForumsQuery>>(
        //   [APIKeys.FORUMS_ADMIN],
        //   old => {
        //     const currentOld = {
        //       pageParams: old?.pageParams.at(-1),
        //       page: old?.pages.at(-1)
        //     };

        //     if (!currentOld.pageParams || !currentOld.page) return old;

        //     return {
        //       pageParams: [currentOld.pageParams],
        //       pages: [
        //         {
        //           ...currentOld.page,
        //           show_forum_forums: {
        //             ...currentOld.page.show_forum_forums,
        //             edges: newEdges
        //           }
        //         }
        //       ]
        //     };
        //   }
        // );
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        <Virtuoso
          useWindowScroll
          totalCount={flattenedItems.length}
          className="rounded-md border overflow-hidden"
          components={{
            Item: ({ ...props }) => {
              return <div {...props} className="[&:not(:last-child)]:border-b relative" />;
            }
          }}
          itemContent={index => {
            const item = flattenedItems[index];

            return (
              <ItemTableForumsForumAdmin
                key={item.id}
                indentationWidth={indentationWidth}
                {...item}
              />
            );
          }}
        />
      </SortableContext>
    </DndContext>
  );
};
