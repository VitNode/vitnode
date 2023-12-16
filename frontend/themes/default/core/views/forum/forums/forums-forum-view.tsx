import { Forum_Forums__ShowQuery } from '@/graphql/hooks';
import { CategoryForum } from './category';

interface Props {
  data: Forum_Forums__ShowQuery;
}

export const ForumsForumView = ({
  data: {
    forum_forums__show: { edges }
  }
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {edges.map(edge => (
        <CategoryForum key={edge.id} {...edge} />
      ))}
    </div>
  );
};
