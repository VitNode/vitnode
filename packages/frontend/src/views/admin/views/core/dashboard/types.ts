import { UniqueIdentifier } from '@dnd-kit/core';

export interface TreeItem<T extends TreeItem<T>> {
  children: T[];
  collapsed?: boolean;
  id: UniqueIdentifier;
}

export interface FlattenedItem<T extends TreeItem<T>> extends TreeItem<T> {
  depth: number;
  index: number;
  parentId: null | UniqueIdentifier;
}
