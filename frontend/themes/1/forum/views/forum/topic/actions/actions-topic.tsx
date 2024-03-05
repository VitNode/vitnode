"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LockToggleActionsTopic } from "./lock-toggle/lock-toggle";
import { usePathname, useRouter } from "@/i18n";

interface Props {
  id: number;
  state: {
    locked: boolean;
  };
}

export const ActionsTopic = ({ id, state }: Props) => {
  const t = useTranslations("forum.topics.actions");
  const tCore = useTranslations("core");
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("title")}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <LockToggleActionsTopic id={id} locked={state.locked} />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => push(`${pathname}/edit`)}>
            <Pencil />
            {tCore("edit")}
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">
            <Trash2 />
            {tCore("delete")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
