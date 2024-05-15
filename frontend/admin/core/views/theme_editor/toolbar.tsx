import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

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

const ButtonView = ({
  children,
  setActiveMode,
  type
}: {
  children: ReactNode;
  setActiveMode: (mode: ThemeEditorViewEnum) => void;
  type: ThemeEditorViewEnum;
}) => {
  const t = useTranslations("core.theme_editor");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            ariaLabel={t(type)}
            variant="ghost"
            className="flex-shrink-0"
            onClick={() => setActiveMode(type)}
          >
            {children}
          </Button>
        </TooltipTrigger>

        <TooltipContent side="left">{t(type)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface Props {
  setActiveMode: (mode: ThemeEditorViewEnum) => void;
}

export const ToolbarThemeEditor = ({ setActiveMode }: Props) => {
  return (
    <div className="p-1 border-r flex flex-col gap-1">
      <ButtonView
        type={ThemeEditorViewEnum.Desktop}
        setActiveMode={setActiveMode}
      >
        <Monitor />
      </ButtonView>

      <ButtonView
        type={ThemeEditorViewEnum.Tablet}
        setActiveMode={setActiveMode}
      >
        <Tablet />
      </ButtonView>

      <ButtonView
        type={ThemeEditorViewEnum.Mobile}
        setActiveMode={setActiveMode}
      >
        <Smartphone />
      </ButtonView>
    </div>
  );
};
