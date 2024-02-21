"use client";

import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGlobals } from "@/hooks/core/use-globals";
import { useSession } from "@/hooks/core/use-session";
import { mutationApi } from "./mutation-api";

export const ThemeSwitcher = () => {
  const t = useTranslations("core");
  const { themes } = useGlobals();
  const { rebuild_required, theme_id } = useSession();

  if (themes.length <= 1 || rebuild_required.themes) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          tooltip={t("user-bar.theme.change")}
        >
          <Palette />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme_id?.toString() ?? "1"}
          onValueChange={async id => {
            await mutationApi({ id: parseInt(id) });
            // window.location.reload();
          }}
        >
          {themes.map(theme => (
            <DropdownMenuRadioItem key={theme.id} value={theme.id.toString()}>
              {theme.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
