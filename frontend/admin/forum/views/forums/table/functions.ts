import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type {
  Forum_Forums__Admin__ShowFlattenedItem,
  Forum_Forums__Admin__ShowWithProjection
} from "./types";
import type { Forum_Forums__Admin__ShowQueryItem } from "./hooks/use-forum-forums-admin-api";
import type {
  ChildrenShowForumForums,
  ShowForumForumsAdmin
} from "@/graphql/hooks";

const getDragDepth = ({
  indentationWidth,
  offset
}: {
  indentationWidth: number;
  offset: number;
}) => {
  return Math.round(offset / indentationWidth);
};

const getMaxDepth = ({
  previousItem
}: {
  previousItem: Forum_Forums__Admin__ShowFlattenedItem;
}) => {
  return previousItem ? previousItem.depth + 1 : 0;
};

const getMinDepth = ({
  nextItem
}: {
  nextItem: Forum_Forums__Admin__ShowFlattenedItem;
}) => {
  return nextItem ? nextItem.depth : 0;
};

export const removeChildrenOf = ({
  ids,
  items
}: {
  ids: UniqueIdentifier[];
  items: Forum_Forums__Admin__ShowFlattenedItem[];
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
  items: Forum_Forums__Admin__ShowFlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
): Forum_Forums__Admin__ShowWithProjection => {
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
  items: Forum_Forums__Admin__ShowQueryItem[],
  parentId: number | null = null,
  depth = 0
): Forum_Forums__Admin__ShowFlattenedItem[] => {
  return items.reduce<Forum_Forums__Admin__ShowFlattenedItem[]>(
    (acc, item, index) => {
      return [
        ...acc,
        { ...item, parentId, depth, index },
        ...flattenTree(
          (item.children ?? []) as ShowForumForumsAdmin[],
          item.id,
          depth + 1
        )
      ];
    },
    []
  );
};

export const buildTree = (
  flattenedItems: Forum_Forums__Admin__ShowFlattenedItem[]
): Forum_Forums__Admin__ShowQueryItem[] => {
  const root: { children: Forum_Forums__Admin__ShowQueryItem[]; id: string } = {
    id: "root",
    children: []
  };
  const nodes: Record<string, Forum_Forums__Admin__ShowQueryItem> = {
    [root.id]: root
  } as unknown as Record<string, Forum_Forums__Admin__ShowQueryItem>;
  const items = flattenedItems.map(item => ({ ...item, children: [] }));

  for (const item of items) {
    const { id } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? items.find(({ id }) => id === parentId);

    nodes[id] = item;

    parent.children = parent.children ?? [];
    parent.children.push(item as ChildrenShowForumForums);
  }

  return root.children as Forum_Forums__Admin__ShowQueryItem[];
};
