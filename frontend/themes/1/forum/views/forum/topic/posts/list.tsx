import type { ReactNode } from "react";

import type {
  PermissionsPostForums,
  ShowPostsForums,
  ShowPostsForumsMetaTags
} from "@/graphql/hooks";
import { PostTopic } from "./post/post";
import { MetaTagTopic } from "./meta-tags/meta-tag";
import { cn } from "@/functions/classnames";
import { WrapperPosts } from "./wrapper/wrapper";
import { ActionsPost } from "./post/actions-post";

interface Props {
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];
  id: string;
  className?: string;
  customMoreMenu?: ReactNode;
}

export const ListPosts = ({ className, edges, id }: Props) => {
  const permissions: PermissionsPostForums = {
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
            <>
              <WrapperPosts>
                <PostTopic
                  key={`post_list_${edge.id}`}
                  {...edge}
                  customMoreMenu={
                    <>
                      <ActionsPost
                        id={edge.id}
                        state={{ locked: false }}
                        permissions={permissions}
                      />
                    </>
                  }
                />
              </WrapperPosts>
            </>
          );
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
