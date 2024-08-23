import {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import React from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import { useProjection } from './use-projection';

import {
  FlatTree,
  WithChildren,
  flattenTree,
} from '../../helpers/flatten-tree';

function removeChildrenOf<T extends object>({
  ids,
  tree,
}: {
  ids: UniqueIdentifier[];
  tree: FlatTree<T>[];
}) {
  const excludeParentIds = [...ids];

  return tree.filter(item => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if ((item.children.length ?? 0) > 0) {
        excludeParentIds.push(item.id);
      }

      return false;
    }

    return true;
  });
}

export function buildTree<T extends object>({
  flattenedTree,
}: {
  flattenedTree: FlatTree<T>[];
}): WithChildren<T>[] {
  const sorted = flattenedTree.sort((a, b) => b.depth - a.depth);
  const maxDepth = sorted[0].depth;
  let tree: FlatTree<T>[] = [];

  tree = sorted.map(item => {
    if (item.depth === maxDepth) {
      return item;
    }

    return {
      ...item,
      children: [],
    };
  });

  tree.forEach(item => {
    const parentIndex = tree.findIndex(({ id }) => id === item.parentId);
    if (parentIndex === -1) return;
    const parent = tree[parentIndex];

    tree[parentIndex] = {
      ...parent,
      children: [...parent.children, item],
    };
  });

  return tree.filter(item => !item.parentId);
}

interface OnDragMoveArgs extends DragMoveEvent {
  flattenedItems: FlatTree<object>[];
  indentationWidth?: number;
  maxDepth?: number;
}

interface DragEndArgs<T extends object> extends DragEndEvent {
  data: WithChildren<T>[];
  setData: (data: WithChildren<FlatTree<T>>[]) => void;
}

interface Args<T extends object> {
  data: WithChildren<T>[];
}

export function useDragAndDrop<T extends object>({ data }: Args<T>) {
  const [isOpenChildren, setIsOpenChildren] = React.useState<
    UniqueIdentifier[]
  >([]);
  const {
    activeId,
    getProjection,
    overId,
    projected,
    setActiveId,
    setOverId,
    setProjected,
  } = useProjection();
  const flattenedItems = flattItems({ data });
  const activeItem = flattenedItems.find(i => i.id === activeId);
  const sortedIds = React.useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems],
  );

  // DndKit doesn't support nested sortable, so we need to flatten the data in one array
  function flattItems<T extends WithChildren<T>>({ data }: { data: T[] }) {
    const tree = flattenTree({ tree: data });

    const collapsedItems = tree.reduce<UniqueIdentifier[]>(
      (acc, { children, id }) =>
        !isOpenChildren.includes(id) && children.length ? [...acc, id] : acc,
      [],
    );

    return removeChildrenOf({
      tree,
      ids: activeId ? [activeId, ...collapsedItems] : collapsedItems,
    });
  }

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setProjected(null);
  };

  const onDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id ?? null);
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setOverId(active.id);
  };

  const onDragMove = ({
    delta,
    flattenedItems,
    indentationWidth,
    maxDepth,
  }: OnDragMoveArgs) => {
    if (maxDepth === undefined && !indentationWidth) {
      throw new Error('You must provide either maxDepth abd indentationWidth');
    }

    if (!activeId || !overId) return;

    const currentProjection = getProjection({
      flattenedItems,
      delta,
      indentationWidth,
      maxDepth,
    });

    if (projected?.parentId === currentProjection.parentId) {
      return;
    }

    setProjected(currentProjection);
  };

  function onDragEnd<T extends object>({
    active,
    data,
    over,
    setData,
  }: DragEndArgs<T>) {
    resetState();

    if (!projected || !over) return;
    const { depth, parentId } = projected;

    const clonedItems: FlatTree<T>[] = flattenTree({ tree: data });
    const toIndex = clonedItems.findIndex(({ id }) => id === over.id);
    const fromIndex = clonedItems.findIndex(({ id }) => id === active.id);
    const sortedItems = arrayMove(clonedItems, fromIndex, toIndex);
    const activeIndex = sortedItems.findIndex(i => i.id === active.id);
    sortedItems[activeIndex] = {
      ...sortedItems[activeIndex],
      depth,
      parentId,
    };

    const dataAfterUpdate: FlatTree<FlatTree<T>>[] = sortedItems.map(item => ({
      ...item,
      children: [],
    }));

    setData(
      buildTree({
        flattenedTree: dataAfterUpdate,
      }),
    );

    const parents = sortedItems.filter(i => i.parentId === parentId);
    const indexToMove = parents.findIndex(i => i.id === active.id);
    const flattenedItems = flattenTree({ tree: data });

    // -1 means that the item is the last one
    const findActive = flattenedItems.find(i => i.id === active.id);
    if (!findActive) return;

    // Do nothing if drag and drop on the same item on the same level
    if (findActive.parentId === parentId && active.id === over.id) {
      return;
    }

    return {
      id: active.id,
      parentId: parentId,
      indexToMove,
    };
  }

  const actionsItem = ({
    data,
    indentationWidth,
    onCollapse,
  }: {
    data: {
      id: number | string;
      children?: unknown[];
      depth?: number;
    };
    indentationWidth?: number;
    onCollapse?: ({ isOpen }: { isOpen: boolean }) => void;
  }) => {
    const onCollapseInternal = () => {
      const isOpen = isOpenChildren.includes(data.id);

      onCollapse?.({ isOpen });

      setIsOpenChildren(prev => {
        if (isOpen) {
          return prev.filter(i => i !== data.id);
        }

        return [...prev, data.id];
      });
    };

    return {
      onCollapse: onCollapseInternal,
      isOpenChildren: isOpenChildren.includes(data.id),
      isDropHere: projected?.parentId === data.id,
      active: activeId === data.id,
      depth:
        (activeId === data.id && projected ? projected.depth : data.depth) ?? 0,
      indentationWidth,
      id: data.id,
      childrenLength: data.children ? data.children.length : 0,
    };
  };

  return {
    resetState,
    onDragOver,
    onDragStart,
    onDragMove,
    onDragEnd,
    actionsItem,
    flattenedItems,
    activeItemOverlay: activeId !== null && activeItem,
    sortedIds,
  };
}
