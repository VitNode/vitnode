'use client';

import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useDateFormat } from './date-format-hooks/use-date-format';

export const DateFormat = ({
  className,
  date,
  ref,
  showFullDate,
}: {
  date: Date;
  className?: string;
  ref?: React.RefCallback<HTMLTimeElement>;
  showFullDate?: boolean;
}) => {
  const { now, fullDate, getDate } = useDateFormat({
    date,
  });

  if (now.getFullYear() == new Date().getFullYear() && !showFullDate) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <time
              ref={ref}
              dateTime={fullDate.toString()}
              className={className}
            >
              {getDate()}
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
    <time ref={ref} dateTime={fullDate.toString()} className={className}>
      {fullDate}
    </time>
  );
};
