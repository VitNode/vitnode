'use client';

import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { useFormatter, useTranslations } from 'next-intl';

import { cn } from '@/helpers/classnames';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';

export const DatePicker = ({
  value,
  onChange,
  className,
  disabled,
  controlledMouthAndYear,
}: {
  onChange: (value: Date | undefined) => void;
  value: Date | undefined;
  className?: string;
  controlledMouthAndYear?: {
    fromYear: number;
    toYear: number;
  };
  disabled?: boolean;
}) => {
  const format = useFormatter();
  const t = useTranslations('core');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] pl-3 text-left font-normal',
            className,
            !value && 'text-muted-foreground',
          )}
          disabled={disabled}
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
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout={
            controlledMouthAndYear ? 'dropdown-buttons' : 'buttons'
          }
          fromYear={controlledMouthAndYear?.fromYear}
          toYear={controlledMouthAndYear?.toYear}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
