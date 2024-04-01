"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const DarkLightModeSwitcher = (): JSX.Element => {
  const t = useTranslations("core");
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          ariaLabel={t("user-bar.dark_light_switcher.toggle")}
        >
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(id): void => setTheme(id)}
        >
          <DropdownMenuRadioItem
            value="light"
            onClick={(): void => setTheme("light")}
          >
            <span>{t("user-bar.dark_light_switcher.light")}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="dark"
            onClick={(): void => setTheme("dark")}
          >
            <span>{t("user-bar.dark_light_switcher.dark")}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="system"
            onClick={(): void => setTheme("system")}
          >
            <span>{t("user-bar.dark_light_switcher.system")}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
