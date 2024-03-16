"use client";

import { forwardRef } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import { useDateFormat } from "./hooks/use-date-format";

interface Props {
  date: number | Date;
  className?: string;
}

export const DateFormat = forwardRef<HTMLSpanElement, Props>(
  ({ className, date }, ref) => {
    const { currentTime, fullDate, getDateWithFormatDistance } = useDateFormat({
      date
    });

    if (currentTime.getFullYear() == new Date().getFullYear()) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span ref={ref} className={className}>
                {getDateWithFormatDistance()}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <span>{fullDate}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <span ref={ref} className={className}>
        {fullDate}
      </span>
    );
  }
);

DateFormat.displayName = "DateFormat";
