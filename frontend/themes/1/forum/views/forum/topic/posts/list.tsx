import type { ReactNode } from "react";

import type { ShowPostsForums, ShowPostsForumsMetaTags } from "@/graphql/hooks";
import { PostTopic } from "./post/post";
import { MetaTagTopic } from "./meta-tags/meta-tag";
import { cn } from "@/functions/classnames";
import { ActionsPost } from "./post/actions/actions";

interface Props {
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];
  id: string;
  className?: string;
  customMoreMenu?: ReactNode;
}

export const ListPosts = ({ className, edges, id }: Props) => {
  const permissions = {
    //TODO: retrieving permissions from backend, more elastic approach
    can_edit: true,
    can_delete: true
  };

  return (
    <div
      key={`post_list_${id}`}
      className={cn(
        "flex flex-col gap-5 relative after:absolute after:top-0 after:left-6 after:w-1 after:h-full after:block after:-z-10 after:bg-border",
        className
      )}
    >
      {edges.map(edge => {
        if (edge.__typename === "ShowPostsForums") {
          return (
            <PostTopic
              key={`post_list_${edge.post_id}`}
              {...edge}
              customMoreMenu={
                <>
                  <ActionsPost
                    id={edge.post_id}
                    state={{ locked: false }}
                    permissions={permissions}
                  />
                </>
              }
            />
          );
        }

        if (edge.__typename === "ShowPostsForumsMetaTags") {
          return (
            <MetaTagTopic
              key={`post_meta_tag_list_${edge.action_id}`}
              {...edge}
            />
          );
        }

        return null;
      })}
    </div>
  );
};
