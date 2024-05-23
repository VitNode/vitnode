"use client";

import type { RefCallback } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import { useDateFormat } from "./hooks/use-date-format";

interface Props {
  date: Date | number;
  className?: string;
  ref?: RefCallback<HTMLTimeElement>;
}

export const DateFormat = ({ className, date, ref }: Props) => {
  const { currentTime, fullDate, getDateWithFormatDistance } = useDateFormat({
    date
  });

  if (currentTime.getFullYear() == new Date().getFullYear()) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <time
              ref={ref}
              dateTime={currentTime.toString()}
              className={className}
            >
              {getDateWithFormatDistance()}
            </time>
          </TooltipTrigger>
          <TooltipContent>
            <span>{fullDate}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <time ref={ref} dateTime={currentTime.toString()} className={className}>
      {fullDate}
    </time>
  );
};
