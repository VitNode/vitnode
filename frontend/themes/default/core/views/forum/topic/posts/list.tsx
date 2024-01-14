import type { ShowPostsForums, ShowPostsForumsMetaTags } from '@/graphql/hooks';
import { PostTopic } from './post/post';
import { MetaTagTopic } from './meta-tags/meta-tag';

interface Props {
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];
}

export const ListPosts = ({ edges }: Props) => {
  return (
    <div className="flex flex-col gap-5 relative after:absolute after:top-0 after:left-6 after:w-1 after:h-full after:block after:-z-10 after:bg-border">
      {edges.map(edge => {
        if (edge.__typename === 'ShowPostsForums') {
          return <PostTopic key={edge.id} {...edge} />;
        }

        if (edge.__typename === 'ShowPostsForumsMetaTags') {
          return <MetaTagTopic key={edge.id} {...edge} />;
        }

        return null;
      })}
    </div>
  );
};
