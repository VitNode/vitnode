import type { Forum_Forums__Admin__ShowQueryItem } from './hooks/use-forum-forums-admin-api';

export interface Forum_Forums__Admin__ShowFlattenedItem extends Forum_Forums__Admin__ShowQueryItem {
  depth: number;
  index: number;
  parentId: number | null;
}

export interface Forum_Forums__Admin__ShowWithProjection {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: number | null;
}
