import { MessagesSquare } from "lucide-react";

import { Link } from "@/utils/i18n";
import {
  LastPostsShowForumForumsObj,
  ShowForumForumsCounts,
  TextLanguage
} from "@/utils/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { WrapperItemForum } from "./wrapper-item-forum";
import { ChildButtonItemForum } from "./child";
import { StatsItemForum } from "./stats";
import { LastPostItemForum } from "./last-post/last-post";
import { ReadOnlyEditor } from "@/components/editor/read-only/read-only";

export interface ItemForumProps {
  _count: Pick<ShowForumForumsCounts, "total_posts" | "total_topics">;
  description: TextLanguage[];
  id: number;
  last_posts: Pick<LastPostsShowForumForumsObj, "edges">;
  name: TextLanguage[];
  children?:
    | Omit<ItemForumProps, "_count" | "description" | "last_posts">[]
    | null;
}

export const ItemForum = ({
  _count,
  children,
  description,
  id,
  last_posts: { edges: lastPosts },
  name
}: ItemForumProps) => {
  const { convertNameToLink, convertText } = useTextLang();
  const href = `/forum/${convertNameToLink({ id, name })}`;

  return (
    <WrapperItemForum
      className="hover:bg-muted/50 flex cursor-pointer select-none flex-col gap-4 border-t px-6 py-4 md:select-auto md:flex-row"
      href={href}
    >
      <div className="flex flex-1 gap-4">
        <div className="bg-primary/20 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md [&>svg]:h-5 [&>svg]:w-5">
          <MessagesSquare />
        </div>

        <div className="flex flex-col justify-center">
          <Link
            href={href}
            className="text-foreground text-lg font-medium no-underline"
          >
            {convertText(name)}
          </Link>

          {description.length > 0 && (
            <ReadOnlyEditor
              className="text-muted-foreground pointer-events-none text-sm md:pointer-events-auto [&_p]:m-0"
              value={description}
            />
          )}

          {children && children.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {children.map(child => (
                <ChildButtonItemForum key={child.id} {...child} />
              ))}
            </div>
          )}
        </div>
      </div>

      {_count.total_topics > 0 && (
        <div className="flex shrink-0 flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <StatsItemForum {..._count} />
          <LastPostItemForum lastPosts={lastPosts} />
        </div>
      )}
    </WrapperItemForum>
  );
};
