import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

interface Props {
  children: ReactNode;
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
