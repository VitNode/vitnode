import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { FlattenedItem, TreeItem } from './types';

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export function getProjection<T extends TreeItem<T>>(
  items: FlattenedItem<T>[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number,
) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem: FlattenedItem<T> | undefined =
    newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = +activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  function getParentId() {
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
  }
}

function getMaxDepth<T extends TreeItem<T>>({
  previousItem,
}: {
  previousItem: FlattenedItem<T> | undefined;
}) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}

function getMinDepth<T extends TreeItem<T>>({
  nextItem,
}: {
  nextItem: FlattenedItem<T> | undefined;
}) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

function flatten<T extends TreeItem<T>>(
  items: TreeItem<T>[],
  parentId: null | UniqueIdentifier = null,
  depth = 0,
): FlattenedItem<T>[] {
  return items.reduce<FlattenedItem<T>[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index, collapsed: item.collapsed ?? true },
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
}

export function flattenTree<T extends TreeItem<T>>(
  items: T[],
): FlattenedItem<T>[] {
  return flatten(items);
}

export function buildTree<T extends TreeItem<T>>(
  flattenedItems: FlattenedItem<T>[],
): T[] {
  const root: TreeItem<T> = { id: 'root', children: [], collapsed: true };
  const nodes: Record<string, TreeItem<T>> = { [root.id]: root };
  const items: FlattenedItem<T>[] = flattenedItems.map(item => ({
    ...item,
    children: [],
  }));

  for (const item of items) {
    const { id, children } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = { id, children };
    parent.children.push(item as unknown as T);
  }

  return root.children;
}

export function findItem<T extends TreeItem<T>>(
  items: TreeItem<T>[],
  itemId: UniqueIdentifier,
) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep<T extends TreeItem<T>>(
  items: TreeItem<T>[],
  itemId: UniqueIdentifier,
): TreeItem<T> | undefined {
  for (const item of items) {
    const { id, children } = item;

    if (id === itemId) {
      return item;
    }

    if (children.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function removeItem<T extends TreeItem<T>>(
  items: TreeItem<T>[],
  id: UniqueIdentifier,
) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.children.length) {
      item.children = removeItem(item.children, id);
    }

    newItems.push(item as never);
  }

  return newItems;
}

export function setProperty<
  T extends TreeItem<T>,
  Y extends keyof T = 'collapsed',
>(
  items: T[],
  id: UniqueIdentifier,
  property: Y,
  setter: (value: T[Y]) => T[Y],
): T[] {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.children.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }

  return [...items];
}

function countChildren<T extends TreeItem<T>>(
  items: TreeItem<T>[],
  count = 0,
): number {
  return items.reduce((acc, { children }) => {
    if (children.length) {
      return countChildren(children, acc + 1);
    }

    return acc + 1;
  }, count);
}

export function getChildCount<T extends TreeItem<T>>(
  items: TreeItem<T>[],
  id: UniqueIdentifier,
) {
  const item = findItemDeep(items, id);

  return item ? countChildren(item.children) : 0;
}

export function removeChildrenOf<T extends TreeItem<T>>(
  items: FlattenedItem<T>[],
  ids: UniqueIdentifier[],
) {
  const excludeParentIds = [...ids];

  return items.filter(item => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }

      return false;
    }

    return true;
  });
}
