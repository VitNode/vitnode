'use client';

import { getHSLFromString, isColorBrightness } from '@/helpers/colors';
import { RemoveFormatting } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '../../helpers/classnames';
import { ContentColor } from '../utils/color/content-color';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export const ColorPicker = ({
  required,
  disabled,
  onChange,
  value: valueProp,
  className,
  ref: refFromProps,
  clearOnClick,
}: {
  className?: string;
  clearOnClick?: () => void;
  disabled?: boolean;
  onChange: (value: string) => void;
  ref?: React.RefCallback<HTMLButtonElement>;
  required?: boolean;
  value: null | string;
}) => {
  const t = useTranslations('core.global');
  const ref = React.useRef<HTMLInputElement>(null);
  const value = getHSLFromString(valueProp ?? '');
  const colorBrightness = value ? isColorBrightness(value) : false;

  return (
    <Popover>
      <div className="flex items-center gap-2">
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'relative flex min-w-40 max-w-52 justify-start',
              className,
              {
                'text-black': value && colorBrightness,
                'text-white': value && !colorBrightness,
              },
            )}
            disabled={disabled}
            onClick={() => {
              ref.current?.click();
            }}
            ref={refFromProps}
            style={{
              backgroundColor: value
                ? `hsl(${value.h}, ${value.s}%, ${value.l}%)`
                : '',
            }}
            type="button"
            variant="outline"
          >
            {value ? `hsl(${value.h}, ${value.s}%, ${value.l}%)` : t('none')}
          </Button>
        </PopoverTrigger>

        {!required && value && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  ariaLabel={t('remove')}
                  className="shrink-0"
                  onClick={() => {
                    onChange('');
                    clearOnClick?.();
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <RemoveFormatting />
                </Button>
              </TooltipTrigger>

              <TooltipContent>{t('remove')}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {!disabled && (
          <PopoverContent align="start" className="w-auto">
            <ContentColor color={value} setColor={onChange} />
          </PopoverContent>
        )}
      </div>
    </Popover>
  );
};
