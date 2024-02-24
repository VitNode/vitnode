import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

type WithChildren<T extends object> = Omit<T, "children"> & {
  children: WithChildren<T>[];
  id: number;
};

export type FlatTree<T extends object> = {
  depth: number;
  index: number;
  parentId: number | null;
} & WithChildren<T>;

function flattenTree<T extends object>({
  depth = 0,
  parentId = null,
  tree
}: {
  tree: WithChildren<T>[];
  depth?: number;
  parentId?: number | null;
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

interface Args {
  activeId: UniqueIdentifier | null;
}

export const useDragAndDrop = ({ activeId }: Args) => {
  const [isOpenChildren, setIsOpenChildren] = useState<UniqueIdentifier[]>([]);

  // DndKit doesn't support nested sortable, so we need to flatten the data in one array
  function flattenedItems<T extends WithChildren<T>>({ data }: { data: T[] }) {
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

  function buildTree<T extends object>({
    flattenedTree
  }: {
    flattenedTree: FlatTree<T>[];
  }): WithChildren<T>[] {
    const tree: WithChildren<T>[] = [];

    // Prepare the tree with the root elements
    flattenedTree
      .filter(item => !item.parentId)
      .forEach(item => {
        tree.push({ ...item, children: [] });
      });

    flattenedTree
      .filter(item => item.parentId)
      .forEach(item => {
        const parentIndex = tree.findIndex(({ id }) => id === item.parentId);
        if (parentIndex === -1) return;
        const parent = tree[parentIndex];

        tree[parentIndex] = {
          ...parent,
          children: [...parent.children, item]
        };
      });

    return tree;
  }

  return {
    flattenTree,
    flattenedItems,
    isOpenChildren,
    setIsOpenChildren,
    buildTree
  };
};
