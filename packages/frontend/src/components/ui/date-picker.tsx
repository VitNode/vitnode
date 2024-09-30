'use client';

import { cn } from '@/helpers/classnames';
import { CalendarIcon } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import React from 'react';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const DatePicker = ({
  value,
  onChange,
  className,
  disabled,
  controlledMouthAndYear,
}: {
  className?: string;
  controlledMouthAndYear?: {
    fromYear: number;
    toYear: number;
  };
  disabled?: boolean;
  onChange: (value: Date | undefined) => void;
  value: Date | undefined;
}) => {
  const format = useFormatter();
  const t = useTranslations('core.global');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-[240px] pl-3 text-left font-normal',
            className,
            !value && 'text-muted-foreground',
          )}
          disabled={disabled}
          variant={'outline'}
        >
          {value ? (
            format.dateTime(value, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          ) : (
            <span>{t('pick_date')}</span>
          )}
          <CalendarIcon className="ml-auto size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          captionLayout={
            controlledMouthAndYear ? 'dropdown-buttons' : 'buttons'
          }
          fromYear={controlledMouthAndYear?.fromYear}
          initialFocus
          mode="single"
          onSelect={onChange}
          selected={value}
          toYear={controlledMouthAndYear?.toYear}
        />
      </PopoverContent>
    </Popover>
  );
};
