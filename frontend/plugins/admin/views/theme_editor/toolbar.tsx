import { Monitor, Moon, Smartphone, Sun, Tablet } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export enum ThemeEditorViewEnum {
  Desktop = "desktop",
  Tablet = "tablet",
  Mobile = "mobile"
}

interface Props {
  activeMode: ThemeEditorViewEnum;
  setActiveMode: (mode: ThemeEditorViewEnum) => void;
}

export const ToolbarThemeEditor = ({ activeMode, setActiveMode }: Props) => {
  const t = useTranslations("core");
  const { resolvedTheme, setTheme, theme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "light";

  const ButtonWithTooltip = ({
    active,
    ariaLabel,
    children,
    onClick
  }: {
    active: boolean;
    ariaLabel: string;
    children: React.ReactNode;
    onClick: () => void;
  }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              ariaLabel={ariaLabel}
              variant={active ? "default" : "ghost"}
              className="relative shrink-0"
              onClick={onClick}
            >
              {children}
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">{ariaLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="sticky top-0 border-r">
      <div className="flex flex-col gap-1 p-2">
        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Desktop}
          onClick={() => setActiveMode(ThemeEditorViewEnum.Desktop)}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Desktop}`)}
        >
          <Monitor />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Tablet}
          onClick={() => setActiveMode(ThemeEditorViewEnum.Tablet)}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Tablet}`)}
        >
          <Tablet />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Mobile}
          onClick={() => setActiveMode(ThemeEditorViewEnum.Mobile)}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Mobile}`)}
        >
          <Smartphone />
        </ButtonWithTooltip>
      </div>

      <div className="flex flex-col gap-1 p-2">
        <ButtonWithTooltip
          active={activeTheme === "light"}
          onClick={() => setTheme("light")}
          ariaLabel={t("user-bar.dark_light_switcher.light")}
        >
          <Sun />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeTheme === "dark"}
          onClick={() => setTheme("dark")}
          ariaLabel={t("user-bar.dark_light_switcher.dark")}
        >
          <Moon />
        </ButtonWithTooltip>
      </div>
    </div>
  );
};
