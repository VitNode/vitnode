import { ShowForumForumsWithParent } from '@/graphql/hooks';

export interface Show_Forum_ForumsQueryFlattenedItem
  extends Omit<ShowForumForumsWithParent, 'parent'> {
  depth: number;
  index: number;
  parentId: string | null;
}

export interface Show_Forum_ForumsQueryWithProjection {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: string | null;
}
