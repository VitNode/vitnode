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
import { DeleteActionPost } from "./delete/delete";

interface Props {
  id: number;
  state: {
    locked: boolean;
  };
}

export const ActionsPost = ({ id }: Props) => {
  const permissions = {
    //TODO: retrieving permissions from backend, more elastic approach
    can_edit: true,
    can_delete: true
  };

  const t = useTranslations("forum.topics.actions");
  const tCore = useTranslations("core");
  const editPost = async () => {}; //TODO: implementation
  const [isPending, setPending] = useState(false);

  if (!permissions.can_edit) return null;
  if (!permissions.can_delete) return null;

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

      <DeleteActionPost open={isPending} setOpen={setPending} id={id} />
    </DropdownMenu>
  );
};
