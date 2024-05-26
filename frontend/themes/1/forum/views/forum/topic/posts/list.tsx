import * as React from "react";

import {
  ShowPostsForums,
  ShowPostsForumsMetaTags,
  ShowTopicsForums
} from "@/graphql/hooks";
import { PostTopic } from "./post/post";
import { MetaTagTopic } from "./meta-tags/meta-tag";
import { cn } from "@/functions/classnames";
import { ActionsPost } from "./post/actions/actions";

interface Props {
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];
  id: string;
  permissions: ShowTopicsForums["permissions"];
  className?: string;
  customMoreMenu?: React.ReactNode;
}

export const ListPosts = ({ className, edges, id, permissions }: Props) => {
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
              permissions={permissions}
              customMoreMenu={
                <>
                  <ActionsPost id={edge.post_id} state={{ locked: false }} />
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
