import { MessagesSquare } from "lucide-react";

import { Link } from "@/utils/i18n/link";
import type {
  LastPostsShowForumForumsObj,
  ShowForumForumsCounts,
  TextLanguage
} from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
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
    | Omit<ItemForumProps, "description" | "_count" | "last_posts">[]
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
      className="px-6 py-4 border-t hover:bg-muted/50 flex gap-4 cursor-pointer flex-col md:flex-row select-none md:select-auto"
      href={href}
    >
      <div className="flex gap-4 flex-1">
        <div className="bg-primary/20 w-10 h-10 rounded-md flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 text-primary flex-shrink-0">
          <MessagesSquare />
        </div>

        <div className="flex flex-col justify-center">
          <Link
            href={href}
            className="text-lg font-medium text-foreground no-underline"
          >
            {convertText(name)}
          </Link>

          {description.length > 0 && (
            <ReadOnlyEditor
              className="text-muted-foreground text-sm [&_p]:m-0 pointer-events-none md:pointer-events-auto"
              value={description}
            />
          )}

          {children && children.length > 0 && (
            <div className="flex mt-2 flex-wrap">
              {children.map(child => (
                <ChildButtonItemForum key={child.id} {...child} />
              ))}
            </div>
          )}
        </div>
      </div>

      {_count.total_topics > 0 && (
        <div className="flex-shrink-0 flex md:gap-4 gap-2 md:flex-row flex-col md:items-center">
          <StatsItemForum {..._count} />
          <LastPostItemForum lastPosts={lastPosts} />
        </div>
      )}
    </WrapperItemForum>
  );
};
