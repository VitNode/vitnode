import { useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Coordinates } from "@dnd-kit/utilities";

import { FlatTree } from "./use-functions";

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
  parentId: number | string | null;
}

export const useProjection = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [projected, setProjected] = useState<ProjectionReturnType | null>();

  function getProjection<T extends object>({
    delta,
    flattenedItems,
    indentationWidth = 0,
    maxDepth: maxDepthProp
  }: {
    delta: Coordinates;
    flattenedItems: FlatTree<T>[];
    indentationWidth?: number;
    maxDepth?: number;
  }): ProjectionReturnType {
    const dragOffset = delta.x;
    const overItemIndex = flattenedItems.findIndex(({ id }) => id === overId);
    const activeItemIndex = flattenedItems.findIndex(
      ({ id }) => id === activeId
    );
    const activeItem = flattenedItems[activeItemIndex];
    const newItems = arrayMove(flattenedItems, activeItemIndex, overItemIndex);
    const previousItem = newItems[overItemIndex - 1];
    const nextItem = newItems[overItemIndex + 1];
    const dragDepth = getDragDepth({
      offset: dragOffset,
      indentationWidth
    });
    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth =
      maxDepthProp !== undefined
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

    const getParentId = (): number | string | null => {
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
    setActiveId,
    projected,
    setProjected
  };
};
