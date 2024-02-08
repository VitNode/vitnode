import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type {
  Admin__Forum_Forums__ShowFlattenedItem,
  Admin__Forum_Forums__ShowWithProjection
} from "./types";
import type { Admin__Forum_Forums__ShowQueryItem } from "./hooks/use-forum-forums-admin-api";
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
  previousItem: Admin__Forum_Forums__ShowFlattenedItem;
}) => {
  return previousItem ? previousItem.depth + 1 : 0;
};

const getMinDepth = ({
  nextItem
}: {
  nextItem: Admin__Forum_Forums__ShowFlattenedItem;
}) => {
  return nextItem ? nextItem.depth : 0;
};

export const removeChildrenOf = ({
  ids,
  items
}: {
  ids: UniqueIdentifier[];
  items: Admin__Forum_Forums__ShowFlattenedItem[];
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
  items: Admin__Forum_Forums__ShowFlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
): Admin__Forum_Forums__ShowWithProjection => {
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
  items: Admin__Forum_Forums__ShowQueryItem[],
  parentId: number | null = null,
  depth = 0
): Admin__Forum_Forums__ShowFlattenedItem[] => {
  return items.reduce<Admin__Forum_Forums__ShowFlattenedItem[]>(
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
  flattenedItems: Admin__Forum_Forums__ShowFlattenedItem[]
): Admin__Forum_Forums__ShowQueryItem[] => {
  const root: { children: Admin__Forum_Forums__ShowQueryItem[]; id: string } = {
    id: "root",
    children: []
  };
  const nodes: Record<string, Admin__Forum_Forums__ShowQueryItem> = {
    [root.id]: root
  } as unknown as Record<string, Admin__Forum_Forums__ShowQueryItem>;
  const items = flattenedItems.map(item => ({ ...item, children: [] }));

  for (const item of items) {
    const { id } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? items.find(({ id }) => id === parentId);

    nodes[id] = item;

    parent.children = parent.children ?? [];
    parent.children.push(item as ChildrenShowForumForums);
  }

  return root.children as Admin__Forum_Forums__ShowQueryItem[];
};
