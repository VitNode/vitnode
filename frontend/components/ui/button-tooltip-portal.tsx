"use client";

import { TooltipPortal } from "@radix-ui/react-tooltip";

import { TooltipContent } from "./tooltip";

export interface Props {
  tooltip: string;
}

export const TooltipPortalButton = ({ tooltip }: Props) => {
  return (
    <TooltipPortal>
      <TooltipContent>{tooltip}</TooltipContent>
    </TooltipPortal>
  );
};
