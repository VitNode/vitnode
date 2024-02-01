import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type UniqueIdentifier,
  MeasuringStrategy
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ItemContentTableContentNavAdmin } from './item/item';

interface ItemNavType {
  id: number;
  name: string;
}

interface ItemsNavWithChildrenType extends ItemNavType {
  children?: ItemNavType[];
}

interface ProjectedType {
  activeId: UniqueIdentifier;
  overId: UniqueIdentifier;
  parentId: number | null;
}

interface FlattenedItemsType extends ItemsNavWithChildrenType {
  depth: boolean;
}

export const ContentTableContentNavAdmin = () => {
  const t = useTranslations('core');
  const [items, setItems] = useState<ItemsNavWithChildrenType[]>([
    {
      id: 1,
      name: 'test1',
      children: [
        {
          id: 4,
          name: 'test4'
        },
        {
          id: 5,
          name: 'test5'
        }
      ]
    },
    {
      id: 2,
      name: 'test2',
      children: []
    },
    {
      id: 3,
      name: 'test3',
      children: []
    }
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [projected, setProjected] = useState<ProjectedType | null>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const flattenedItems: FlattenedItemsType[] = useMemo(() => {
    const tree = items.reduce<FlattenedItemsType[]>((acc, item) => {
      const children = item.children?.map(child => ({
        ...child,
        depth: true
      }));

      return [...acc, { ...item, depth: false }, ...(children ?? [])];
    }, []);

    return tree;
  }, [items]);

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);

  if (items.length === 0) return <div className="text-center">{t('no_results')}</div>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragCancel={() => {
        setActiveId(null);
        setOverId(null);
        setProjected(null);
      }}
      onDragStart={({ active: { id: activeId } }) => {
        setActiveId(activeId);
        setOverId(activeId);
      }}
      onDragOver={({ over }) => setOverId(over?.id ?? null)}
      onDragMove={({ delta }) => {
        if (!activeId || !overId) return;

        const items = flattenedItems;

        const overItemIndex = items.findIndex(({ id }) => id === overId);
        const activeItemIndex = items.findIndex(({ id }) => id === activeId);
        const newItems = arrayMove(items, activeItemIndex, overItemIndex);
        const previousItem = newItems[overItemIndex - 1];
        const nextItem = newItems[overItemIndex + 1];
        const dragDepth = Math.round(delta.x / 20);
        const projectedDepth = dragDepth > 0;
        const minDepth = nextItem?.depth ?? false;
        let depth = projectedDepth;

        if (projectedDepth < minDepth) {
          depth = minDepth;
        }

        const getParentId = () => {
          if (!depth || !previousItem) {
            return null;
          }

          // if (depth === previousItem.depth) {
          //   return previousItem.parentId;
          // }

          if (depth > previousItem.depth) {
            return previousItem.id;
          }

          const newParentId = newItems
            .slice(0, overItemIndex)
            .reverse()
            .find(item => !item.depth)?.id;

          return newParentId ?? null;
        };

        setProjected({
          parentId: getParentId(),
          activeId,
          overId
        });
      }}
      onDragEnd={() => {
        if (!projected) return;

        const tree = flattenedItems;
        const activeItemIndex = tree.findIndex(({ id }) => id === projected.activeId);
        const overItemIndex = tree.findIndex(({ id }) => id === projected.overId);

        if (!activeItemIndex) return;
        const afterChangeTree = arrayMove(tree, activeItemIndex, overItemIndex);
        const afterChangeTreeActiveItemIndex = afterChangeTree.findIndex(
          ({ id }) => id === projected.activeId
        );

        // If active item moved to the children
        afterChangeTree[afterChangeTreeActiveItemIndex] = {
          ...afterChangeTree[afterChangeTreeActiveItemIndex],
          depth: !!projected.parentId,
          children: undefined
        };

        // Build new tree
        const newTree: ItemsNavWithChildrenType[] = [];

        let rootItemId: number | null = null;
        afterChangeTree.forEach(item => {
          if (!item.depth) {
            rootItemId = item.id;
          }

          if (item.depth) {
            const parent = newTree.findLast(item => item.id === rootItemId);

            if (!parent) return;

            if (!parent.children) {
              parent.children = [];
            }

            parent.children.push(item);

            return;
          }

          newTree.push({ ...item, children: [] });
        });

        setItems(newTree);
        setProjected(null);
        setActiveId(null);
        setOverId(null);
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemContentTableContentNavAdmin
            isDropHere={projected?.parentId === item.id}
            key={item.id}
            {...item}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
