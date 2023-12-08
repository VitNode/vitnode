import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { Show_Forum_ForumsQueryFlattenedItem, Show_Forum_ForumsQueryWithProjection } from './types';
import { Show_Forum_ForumsQueryItem } from '../hooks/use-forum-forums-admin-api';
import { ShowForumForums } from '@/graphql/hooks';

const getDragDepth = ({
  indentationWidth,
  offset
}: {
  indentationWidth: number;
  offset: number;
}) => {
  return Math.round(offset / indentationWidth);
};

const getMaxDepth = ({ previousItem }: { previousItem: Show_Forum_ForumsQueryFlattenedItem }) => {
  return previousItem ? previousItem.depth + 1 : 0;
};

const getMinDepth = ({ nextItem }: { nextItem: Show_Forum_ForumsQueryFlattenedItem }) => {
  return nextItem ? nextItem.depth : 0;
};

export const removeChildrenOf = ({
  ids,
  items
}: {
  ids: UniqueIdentifier[];
  items: Show_Forum_ForumsQueryFlattenedItem[];
}) => {
  const excludeParentIds = [...ids];

  return items.filter(item => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if ((item.children?.length ?? 0) > 0) {
        excludeParentIds.push(item.id);
      }

      return false;
    }

    return true;
  });
};

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
  const dragDepth = getDragDepth({
    offset: dragOffset,
    indentationWidth
  });
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

export const flattenTree = (
  items: Show_Forum_ForumsQueryItem[],
  parentId: string | null = null,
  depth = 0
): Show_Forum_ForumsQueryFlattenedItem[] => {
  return items.reduce<Show_Forum_ForumsQueryFlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flattenTree((item.children ?? []) as Show_Forum_ForumsQueryItem[], item.id, depth + 1)
    ];
  }, []);
};

export const buildTree = (
  flattenedItems: Show_Forum_ForumsQueryFlattenedItem[]
): Show_Forum_ForumsQueryItem[] => {
  const root: { children: Show_Forum_ForumsQueryItem[]; id: string } = { id: 'root', children: [] };
  const nodes: Record<string, Show_Forum_ForumsQueryItem> = { [root.id]: root } as Record<
    string,
    Show_Forum_ForumsQueryItem
  >;
  const items = flattenedItems.map(item => ({ ...item, children: [] }));

  for (const item of items) {
    const { id } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? items.find(({ id }) => id === parentId);

    nodes[id] = item;

    parent.children = parent.children ?? [];
    parent.children.push(item as ShowForumForums);
  }

  return root.children as Show_Forum_ForumsQueryItem[];
};
