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

export const DateFormat = forwardRef<HTMLTimeElement, Props>(
  ({ className, date }, ref) => {
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
  }
);

DateFormat.displayName = "DateFormat";
