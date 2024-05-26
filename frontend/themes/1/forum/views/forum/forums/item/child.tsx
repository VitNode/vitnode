"use client";

import { Folder } from "lucide-react";

import { Link } from "@/utils/i18n";
import { ItemForumProps } from "./item";
import { buttonVariants } from "@/components/ui/button";
import { useTextLang } from "@/hooks/core/use-text-lang";

export const ChildButtonItemForum = ({
  id,
  name
}: Pick<ItemForumProps, "id" | "name">) => {
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <Link
      href={`/forum/${convertNameToLink({ id, name })}`}
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
        className: "h-auto min-h-[2.25rem] font-normal"
      })}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Folder />
      <span>{convertText(name)}</span>
    </Link>
  );
};
