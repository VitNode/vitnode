import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState, type Dispatch, type SetStateAction } from "react";

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
  return tree.reduce<FlatTree<T>[]>(
    (previousValue, currentValue, index): FlatTree<T>[] => {
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
    },
    []
  );
}

function removeChildrenOf<T extends object>({
  ids,
  tree
}: {
  ids: UniqueIdentifier[];
  tree: FlatTree<T>[];
}): FlatTree<T>[] {
  const excludeParentIds = [...ids];

  return tree.filter((item): boolean => {
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
  const sorted = flattenedTree.sort((a, b): number => b.depth - a.depth);
  const maxDepth = sorted[0].depth;
  let tree: FlatTree<T>[] = [];

  tree = sorted.map((item): FlatTree<T> => {
    if (item.depth === maxDepth) {
      return item;
    }

    return {
      ...item,
      children: []
    };
  });

  tree.forEach((item): void => {
    const parentIndex = tree.findIndex(
      ({ id }): boolean => id === item.parentId
    );
    if (parentIndex === -1) return;
    const parent = tree[parentIndex];

    tree[parentIndex] = {
      ...parent,
      children: [...parent.children, item]
    };
  });

  return tree.filter((item): boolean => !item.parentId);
}

interface Args {
  activeId: UniqueIdentifier | null;
}

export const useDragAndDrop = ({
  activeId
}: Args): {
  flattenedItems: <T extends WithChildren<T>>({
    data
  }: {
    data: T[];
  }) => FlatTree<T>[];
  isOpenChildren: UniqueIdentifier[];
  setIsOpenChildren: Dispatch<SetStateAction<UniqueIdentifier[]>>;
} => {
  const [isOpenChildren, setIsOpenChildren] = useState<UniqueIdentifier[]>([]);

  // DndKit doesn't support nested sortable, so we need to flatten the data in one array
  function flattenedItems<T extends WithChildren<T>>({
    data
  }: {
    data: T[];
  }): FlatTree<T>[] {
    const tree = flattenTree({ tree: data });

    const collapsedItems = tree.reduce<UniqueIdentifier[]>(
      (acc, { children, id }): UniqueIdentifier[] =>
        !isOpenChildren.includes(id) && children.length ? [...acc, id] : acc,
      []
    );

    return removeChildrenOf({
      tree,
      ids: activeId ? [activeId, ...collapsedItems] : collapsedItems
    });
  }

  return {
    flattenedItems,
    isOpenChildren,
    setIsOpenChildren
  };
};
