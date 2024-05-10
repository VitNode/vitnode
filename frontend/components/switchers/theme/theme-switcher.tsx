"use client";

import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONFIG } from "@vitnode/shared";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGlobals } from "@/hooks/core/use-globals";
import { mutationApi } from "./mutation-api";

export const ThemeSwitcher = () => {
  const t = useTranslations("core");
  const { config, themeId, themes } = useGlobals();

  if (
    themes.length <= 1 ||
    (config.rebuild_required.themes && !CONFIG.node_development)
  )
    return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          ariaLabel={t("user-bar.theme.change")}
        >
          <Palette />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={themeId?.toString() ?? "1"}
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
