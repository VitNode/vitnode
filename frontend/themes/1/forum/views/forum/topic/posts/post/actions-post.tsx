"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { PermissionsPostForums } from "@/graphql/hooks";
import { DeleteCommentModal } from "./delete-comment-modal";

interface Props {
  id: number;
  permissions: PermissionsPostForums;
  state: {
    locked: boolean;
  };
}

export const ActionsPost = ({
  id,
  permissions: { can_delete, can_edit }
}: Props) => {
  const t = useTranslations("forum.topics.actions");
  const tCore = useTranslations("core");
  const editPost = async () => {}; //TODO: implementation
  const [isPending, setPending] = useState(false);

  if (!can_edit) return null;
  if (!can_delete) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("title")}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={editPost}>
            <Pencil />
            {tCore("edit")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setPending(true)}
            className="text-destructive"
          >
            <Trash2 />
            {tCore("delete")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <DeleteCommentModal open={isPending} setOpen={setPending} id={id} />
    </DropdownMenu>
  );
};
