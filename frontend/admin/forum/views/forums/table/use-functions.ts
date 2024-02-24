import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

type WithChildren<T extends object> = Omit<T, "children"> & {
  children: T[];
  id: number;
};

export type FlatTree<T extends object> = {
  depth: number;
  index: number;
  parentId: number;
} & WithChildren<T>;

function flattenTree<T extends WithChildren<T>>({
  depth = 0,
  parentId = 0,
  tree
}: {
  tree: T[];
  depth?: number;
  parentId?: number;
}): FlatTree<T>[] {
  return tree.reduce<FlatTree<T>[]>((acc, item, index) => {
    const children = item.children
      ? flattenTree({
          tree: item.children,
          parentId: item.id,
          depth: depth + 1
        })
      : [];

    return [
      ...acc,
      {
        ...item,
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
    const root: { children: WithChildren<T>[]; id: string } = {
      id: "root",
      children: []
    };

    const nodes: Record<string, WithChildren<T>> = {
      [root.id]: root
    } as unknown as Record<string, WithChildren<T>>;

    for (const item of flattenedTree) {
      const { id } = item;
      const parentId = item.parentId ?? root.id;
      const parent =
        nodes[parentId] ?? flattenedTree.find(({ id }) => id === parentId);

      nodes[id] = item;

      if (parent) {
        parent.children = parent.children ?? [];
        parent.children.push(item as T);
      }
    }

    return root.children;
  }

  return {
    flattenTree,
    flattenedItems,
    isOpenChildren,
    setIsOpenChildren,
    buildTree
  };
};
