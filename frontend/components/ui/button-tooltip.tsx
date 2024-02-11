"use client";

import { TooltipPortal } from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip";

interface Props {
  content: () => JSX.Element;
  tooltip: string;
}

export const TooltipButton = ({ content, tooltip }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content()}</TooltipTrigger>

        <TooltipPortal>
          <TooltipContent>{tooltip}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};
