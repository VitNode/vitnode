import { MessagesSquare } from "lucide-react";

import { Link } from "@/i18n";
import type { TextLanguage } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ReadOnlyEditor } from "@/components/editor/read-only/read-only-editor";
import { WrapperItemForum } from "./wrapper-item-forum";
import { ChildButtonItemForum } from "./child";

export interface ItemForumProps {
  description: TextLanguage[];
  id: number;
  name: TextLanguage[];
  children?: Omit<ItemForumProps, "description">[] | null;
}

export const ItemForum = ({
  children,
  description,
  id,
  name
}: ItemForumProps) => {
  const { convertNameToLink, convertText } = useTextLang();
  const href = `/forum/${convertNameToLink({ id, name })}`;

  return (
    <WrapperItemForum href={href}>
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
              id={`${id}_description`}
              className="text-muted-foreground text-sm [&_p]:m-0"
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
    </WrapperItemForum>
  );
};
