import { useState } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { FlatTree } from "./use-functions";

const getDragDepth = ({
  indentationWidth,
  offset
}: {
  indentationWidth: number;
  offset: number;
}) => {
  return Math.round(offset / indentationWidth);
};

function getMaxDepth<T extends object>({
  previousItem
}: {
  previousItem: FlatTree<T>;
}) {
  return previousItem ? previousItem.depth + 1 : 0;
}

function getMinDepth<T extends object>({
  nextItem
}: {
  nextItem: FlatTree<T>;
}) {
  return nextItem ? nextItem.depth : 0;
}

export interface ProjectionReturnType {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: number | null;
}

export const useProjection = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);

  function getProjection<T extends object>({
    dragOffset,
    indentationWidth,
    maxDepth: maxDepthProp,
    tree
  }: {
    dragOffset: number;
    indentationWidth: number;
    tree: FlatTree<T>[];
    maxDepth?: number;
  }): ProjectionReturnType {
    const overItemIndex = tree.findIndex(({ id }) => id === overId);
    const activeItemIndex = tree.findIndex(({ id }) => id === activeId);
    const activeItem = tree[activeItemIndex];
    const newItems = arrayMove(tree, activeItemIndex, overItemIndex);
    const previousItem = newItems[overItemIndex - 1];
    const nextItem = newItems[overItemIndex + 1];
    const dragDepth = getDragDepth({
      offset: dragOffset,
      indentationWidth
    });
    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth = maxDepthProp
      ? maxDepthProp
      : getMaxDepth({
          previousItem
        });
    const minDepth = getMinDepth({ nextItem });
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
      depth = maxDepth;
    } else if (projectedDepth < minDepth) {
      depth = minDepth;
    }

    const getParentId = (): number | null => {
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
  }

  return {
    getProjection,
    activeId,
    overId,
    setOverId,
    setActiveId
  };
};
