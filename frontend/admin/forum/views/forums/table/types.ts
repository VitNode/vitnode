import type { Admin__Forum_Forums__ShowQueryItem } from "./hooks/use-forum-forums-admin-api";

export interface Admin__Forum_Forums__ShowFlattenedItem
  extends Admin__Forum_Forums__ShowQueryItem {
  depth: number;
  index: number;
  parentId: number | null;
}

export interface Admin__Forum_Forums__ShowWithProjection {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: number | null;
}
