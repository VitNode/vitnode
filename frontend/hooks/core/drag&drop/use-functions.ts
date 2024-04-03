import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier
} from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import { useProjection } from "./use-projection";

type WithChildren<T extends object> = Omit<T, "children" | "__typename"> & {
  children: WithChildren<T>[];
  id: number | string;
};

export type FlatTree<T extends object> = {
  depth: number;
  index: number;
  parentId: number | string | null;
} & WithChildren<T>;

export function flattenTree<T extends object>({
  depth = 0,
  parentId = null,
  tree
}: {
  tree: WithChildren<T>[];
  depth?: number;
  parentId?: number | string | null;
}): FlatTree<T>[] {
  return tree.reduce<FlatTree<T>[]>((previousValue, currentValue, index) => {
    const children = currentValue.children
      ? flattenTree({
          tree: currentValue.children,
          parentId: currentValue.id,
          depth: depth + 1
        })
      : [];

    return [
      ...previousValue,
      {
        ...currentValue,
        parentId: parentId,
        depth: depth,
        index,
        children
      },
      ...children
    ];
  }, []);
}

function removeChildrenOf<T extends object>({
  ids,
  tree
}: {
  ids: UniqueIdentifier[];
  tree: FlatTree<T>[];
}) {
  const excludeParentIds = [...ids];

  return tree.filter(item => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if ((item.children?.length ?? 0) > 0) {
        excludeParentIds.push(item.id);
      }

      return false;
    }

    return true;
  });
}

export function buildTree<T extends object>({
  flattenedTree
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
      children: []
    };
  });

  tree.forEach(item => {
    const parentIndex = tree.findIndex(({ id }) => id === item.parentId);
    if (parentIndex === -1) return;
    const parent = tree[parentIndex];

    tree[parentIndex] = {
      ...parent,
      children: [...parent.children, item]
    };
  });

  return tree.filter(item => !item.parentId);
}

export const useDragAndDrop = () => {
  const [isOpenChildren, setIsOpenChildren] = useState<UniqueIdentifier[]>([]);
  const {
    activeId,
    getProjection,
    overId,
    projected,
    setActiveId,
    setOverId,
    setProjected,
    ...rest
  } = useProjection();

  // DndKit doesn't support nested sortable, so we need to flatten the data in one array
  function flattItems<T extends WithChildren<T>>({ data }: { data: T[] }) {
    const tree = flattenTree({ tree: data });

    const collapsedItems = tree.reduce<UniqueIdentifier[]>(
      (acc, { children, id }) =>
        !isOpenChildren.includes(id) && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf({
      tree,
      ids: activeId ? [activeId, ...collapsedItems] : collapsedItems
    });
  }

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setProjected(null);
  };

  const onDragOver = ({ over }: DragOverEvent) => setOverId(over?.id ?? null);

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setOverId(active.id);
  };

  interface OnDragMoveArgs extends DragMoveEvent {
    flattenedItems: FlatTree<object>[];
    indentationWidth?: number;
    maxDepth?: number;
  }

  const onDragMove = ({
    delta,
    flattenedItems,
    indentationWidth,
    maxDepth
  }: OnDragMoveArgs) => {
    if (maxDepth === undefined && !indentationWidth) {
      throw new Error("You must provide either maxDepth abd indentationWidth");
    }

    if (!activeId || !overId) return;

    const currentProjection = getProjection({
      flattenedItems,
      delta,
      indentationWidth,
      maxDepth
    });

    if (projected?.parentId === currentProjection.parentId) {
      return;
    }

    setProjected(currentProjection);
  };

  interface DragEndArgs<T extends object> extends DragEndEvent {
    data: WithChildren<T>[];
    setData: (data: WithChildren<FlatTree<T>>[]) => void;
  }

  function onDragEnd<T extends object>({
    active,
    data,
    over,
    setData
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
      parentId
    };

    const dataAfterUpdate: FlatTree<FlatTree<T>>[] = sortedItems.map(item => ({
      ...item,
      children: []
    }));

    setData(
      buildTree({
        flattenedTree: dataAfterUpdate
      })
    );

    const parents = sortedItems.filter(i => i.parentId === parentId);
    const indexToMove = parents.findIndex(i => i.id === active.id);
    const flattenedItems = flattenTree({ tree: data });

    // -1 means that the item is the last one
    const findActive = flattenedItems.find(i => i.id === active.id);
    if (!findActive) return;

    // Do nothing if drag and drop on the same item on the same level
    if (findActive?.parentId === parentId && active.id === over.id) {
      return;
    }

    return {
      id: Number(active.id),
      parentId: Number(parentId),
      indexToMove
    };
  }

  return {
    flattItems,
    isOpenChildren,
    setIsOpenChildren,
    activeId,
    resetState,
    onDragOver,
    onDragStart,
    projected,
    onDragMove,
    onDragEnd,
    ...rest
  };
};
