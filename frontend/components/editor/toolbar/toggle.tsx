import { useTranslations } from "next-intl";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

interface Props {
  children: React.ReactNode;
  name: string;
  onPressedChange: () => void;
  pressed: boolean;
  disabled?: boolean;
}

export const ToggleToolbarEditor = ({
  children,
  disabled,
  name,
  onPressedChange,
  pressed
}: Props) => {
  const t = useTranslations("core.editor");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              pressed={pressed}
              onPressedChange={onPressedChange}
              disabled={disabled}
              size="sm"
            >
              {children}
            </Toggle>
          </div>
        </TooltipTrigger>

        {/* eslint-disable-next-line react/jsx-no-comment-textnodes, @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <TooltipContent>{t(name)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
