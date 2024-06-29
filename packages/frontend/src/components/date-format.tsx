'use client';

import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useDateFormat } from './date-format-hooks/use-date-format';

interface Props {
  date: Date;
  className?: string;
  ref?: React.RefCallback<HTMLTimeElement>;
  showFullDate?: boolean;
}

export const DateFormat = ({ className, date, ref, showFullDate }: Props) => {
  const { currentTime, fullDate, getDateWithFormatDistance } = useDateFormat({
    date,
  });

  if (currentTime.getFullYear() == new Date().getFullYear() && !showFullDate) {
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
