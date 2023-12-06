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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useCallback, useMemo, useState } from 'react';

import { ItemTableForumsForumAdmin } from './item/item';
import {
  Show_Forum_ForumsQueryItem,
  useForumForumsAdminAPI
} from '../hooks/use-forum-forums-admin-api';
import { getForumProjection, removeChildrenOf } from './functions';
import { Show_Forum_ForumsQueryFlattenedItem, Show_Forum_ForumsQueryWithProjection } from './types';
import { GlobalLoader } from '@/components/loader/global/global-loader';
import { Loader } from '@/components/loader/loader';
import { ErrorAdminView } from '@/admin/global/error-admin-view';
import { useChangePositionForumAdminAPI } from '../hooks/use-change-position-forum-admin-api';

const indentationWidth = 20;

export const ContentTableForumsForumAdmin = () => {
  const { data, fetchNextPage, hasNextPage, isError, isFetching, isLoading } =
    useForumForumsAdminAPI();
  const { mutateAsync } = useChangePositionForumAdminAPI();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [projected, setProjected] = useState<Show_Forum_ForumsQueryWithProjection | null>();
  const [isOpenChildren, setIsOpenChildren] = useState<UniqueIdentifier[]>([]);

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setProjected(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const flatten = useCallback(
    (
      items: Show_Forum_ForumsQueryItem[],
      parentId: string | null = null,
      depth = 0
    ): Show_Forum_ForumsQueryFlattenedItem[] => {
      const tree = items.reduce<Show_Forum_ForumsQueryFlattenedItem[]>((acc, item, index) => {
        return [
          ...acc,
          { ...item, parentId, depth, index, isOpenChildren: isOpenChildren.includes(item.id) },
          ...flatten((item.children ?? []) as Show_Forum_ForumsQueryItem[], item.id, depth + 1)
        ];
      }, []);

      const collapsedItems = tree.reduce<UniqueIdentifier[]>(
        (acc, { children, id, isOpenChildren }) =>
          !isOpenChildren && children?.length ? [...acc, id] : acc,
        []
      );

      return removeChildrenOf(tree, activeId ? [activeId, ...collapsedItems] : collapsedItems);
    },
    [data, activeId, isOpenChildren]
  );

  // DndKit doesn't support nested sortable, so we need to flatten the data in one array
  const flattenedItems: Show_Forum_ForumsQueryFlattenedItem[] = useMemo(() => {
    return flatten(data);
  }, [data, activeId, isOpenChildren]);

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);

  const handleCollapse = (id: UniqueIdentifier) => {
    setIsOpenChildren(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }

      return [...prev, id];
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorAdminView />;

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

        const currentProjection = getForumProjection(
          flattenedItems,
          activeId,
          overId,
          delta.x,
          indentationWidth
        );

        if (projected?.parentId === currentProjection.parentId) {
          return;
        }

        // console.log(currentProjection);
        setProjected(currentProjection);
      }}
      onDragStart={({ active: { id: activeId } }) => {
        setActiveId(activeId);
        setOverId(activeId);
      }}
      onDragEnd={async ({ active, over }) => {
        resetState();

        if (!projected || !over) return;
        const { parentId } = projected;

        // -1 means that the item is the last one
        const findActive = flattenedItems.find(i => i.id === active.id);
        const indexToMove =
          active.id === over.id ? -1 : flattenedItems.find(i => i.id === over.id)?.position ?? -1;

        // Do nothing if drag and drop on the same item on the same level
        if (findActive?.parentId === parentId && active.id === over.id) {
          return;
        }

        await mutateAsync({
          id: `${active.id}`,
          parentId,
          indexToMove
        });
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {isFetching && <GlobalLoader />}
        <Virtuoso
          useWindowScroll
          data={flattenedItems}
          overscan={200}
          totalCount={flattenedItems.length}
          className="rounded-md"
          endReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          itemContent={(_index, item) => {
            return (
              <ItemTableForumsForumAdmin
                key={item.id}
                indentationWidth={indentationWidth}
                onCollapse={handleCollapse}
                isDropHere={projected?.parentId === item.id}
                {...item}
              />
            );
          }}
        />
      </SortableContext>
    </DndContext>
  );
};
