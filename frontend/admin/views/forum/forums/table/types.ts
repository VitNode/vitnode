import { ShowForumForumsWithParent } from '@/graphql/hooks';

export interface Forum_Forums__Admin__ShowFlattenedItem
  extends Omit<ShowForumForumsWithParent, 'parent'> {
  depth: number;
  index: number;
  parentId: string | null;
}

export interface Forum_Forums__Admin__ShowWithProjection {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: string | null;
}
