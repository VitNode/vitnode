import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Coordinates } from '@dnd-kit/utilities';
import React from 'react';

import { FlatTree } from '../../helpers/flatten-tree';

const getDragDepth = ({
  indentationWidth,
  offset,
}: {
  indentationWidth: number;
  offset: number;
}) => {
  return Math.round(offset / indentationWidth);
};

function getMaxDepth<T extends object>({
  previousItem,
}: {
  previousItem: FlatTree<T> | undefined;
}) {
  return previousItem ? previousItem.depth + 1 : 0;
}

function getMinDepth<T extends object>({
  nextItem,
}: {
  nextItem: FlatTree<T> | undefined;
}) {
  return nextItem ? nextItem.depth : 0;
}

export interface ProjectionReturnType {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: null | number | string;
}

export const useProjection = () => {
  const [activeId, setActiveId] = React.useState<null | UniqueIdentifier>(null);
  const [overId, setOverId] = React.useState<null | UniqueIdentifier>(null);
  const [projected, setProjected] =
    React.useState<null | ProjectionReturnType>();

  function getProjection<T extends object>({
    delta,
    flattenedItems,
    indentationWidth = 0,
    maxDepth: maxDepthProp,
  }: {
    delta: Coordinates;
    flattenedItems: FlatTree<T>[];
    indentationWidth?: number;
    maxDepth?: number;
  }): ProjectionReturnType {
    const dragOffset = delta.x;
    const overItemIndex = flattenedItems.findIndex(({ id }) => id === overId);
    const activeItemIndex = flattenedItems.findIndex(
      ({ id }) => id === activeId,
    );
    const activeItem = flattenedItems[activeItemIndex];
    const newItems = arrayMove(flattenedItems, activeItemIndex, overItemIndex);
    const previousItem = newItems.at(overItemIndex - 1);
    const nextItem = newItems.at(overItemIndex + 1);
    const dragDepth = getDragDepth({
      offset: dragOffset,
      indentationWidth,
    });
    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth =
      maxDepthProp ??
      getMaxDepth({
        previousItem,
      });
    const minDepth = getMinDepth({ nextItem });
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
      depth = maxDepth;
    } else if (projectedDepth < minDepth) {
      depth = minDepth;
    }

    const getParentId = (): null | number | string => {
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
    setProjected,
  };
};
