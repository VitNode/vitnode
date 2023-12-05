import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { Show_Forum_ForumsQueryFlattenedItem, Show_Forum_ForumsQueryWithProjection } from './types';

const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth);
};

const getMaxDepth = ({ previousItem }: { previousItem: Show_Forum_ForumsQueryFlattenedItem }) => {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
};

const getMinDepth = ({ nextItem }: { nextItem: Show_Forum_ForumsQueryFlattenedItem }) => {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
};

export function removeChildrenOf(
  items: Show_Forum_ForumsQueryFlattenedItem[],
  ids: UniqueIdentifier[]
) {
  const excludeParentIds = [...ids];

  return items.filter(item => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if ((item.children?.length ?? 0) > 0 && item._count.children > 0) {
        excludeParentIds.push(item.id);
      }

      return false;
    }

    return true;
  });
}

export const getForumProjection = (
  items: Show_Forum_ForumsQueryFlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
): Show_Forum_ForumsQueryWithProjection => {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  const getParentId = () => {
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
};
