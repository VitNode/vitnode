import * as React from "react";

import {
  ShowPostsForums,
  ShowPostsForumsMetaTags,
  ShowTopicsForums
} from "@/utils/graphql/hooks";
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
        "after:bg-border relative flex flex-col gap-5 after:absolute after:left-6 after:top-0 after:-z-10 after:block after:h-full after:w-1",
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
