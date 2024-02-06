import type { ShowPostsForums, ShowPostsForumsMetaTags } from "@/graphql/hooks";
import { PostTopic } from "./post/post";
import { MetaTagTopic } from "./meta-tags/meta-tag";
import { cx } from "@/functions/classnames";

interface Props {
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];
  id: string;
  className?: string;
}

export const ListPosts = ({ className, edges, id }: Props) => {
  return (
    <div
      key={`post_list_${id}`}
      className={cx(
        "flex flex-col gap-5 relative after:absolute after:top-0 after:left-6 after:w-1 after:h-full after:block after:-z-10 after:bg-border",
        className
      )}
    >
      {edges.map(edge => {
        if (edge.__typename === "ShowPostsForums") {
          return <PostTopic key={`post_list_${edge.id}`} {...edge} />;
        }

        if (edge.__typename === "ShowPostsForumsMetaTags") {
          return (
            <MetaTagTopic key={`post_meta_tag_list_${edge.id}`} {...edge} />
          );
        }

        return null;
      })}
    </div>
  );
};
