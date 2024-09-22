import { UniqueIdentifier } from '@dnd-kit/core';
import { MutableRefObject } from 'react';

export interface TreeItem {
  children: TreeItem[];
  collapsed?: boolean;
  id: UniqueIdentifier;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  depth: number;
  index: number;
  parentId: null | UniqueIdentifier;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
