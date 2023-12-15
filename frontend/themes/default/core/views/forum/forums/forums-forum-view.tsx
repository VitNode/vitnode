import { Forum_Forums__ShowQuery } from '@/graphql/hooks';
import { CategoryForum } from './list/category';

export const ForumsForumView = ({ forum_forums__show: { edges } }: Forum_Forums__ShowQuery) => {
  return (
    <div className="flex flex-col gap-4">
      {edges.map(edge => (
        <CategoryForum key={edge.id} {...edge} />
      ))}
    </div>
  );
};
