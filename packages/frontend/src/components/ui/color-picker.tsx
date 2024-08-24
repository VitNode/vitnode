'use client';

import {
  convertColor,
  getHSLFromString,
  isColorBrightness,
} from '@/helpers/colors';
import { RemoveFormatting } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '../../helpers/classnames';
import { Button } from './button';
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
  id,
  ref: refFromProps,
}: {
  className?: string;
  disabled?: boolean;
  id?: string;
  onChange: (value: null | string) => void;
  ref?: React.RefCallback<HTMLButtonElement>;
  required?: boolean;
  value: null | string;
}) => {
  const t = useTranslations('core.colors');
  const ref = React.useRef<HTMLInputElement>(null);
  const value = getHSLFromString(valueProp ?? '');
  const colorBrightness = value ? isColorBrightness(value) : false;

  return (
    <div className="flex items-center gap-2">
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
        <input
          className="invisible absolute bottom-0 left-0 h-0 w-0"
          disabled={disabled}
          id={id}
          onChange={e => {
            const color = convertColor.hexToHSL(e.target.value);
            if (!color) return;

            onChange(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);
          }}
          ref={ref}
          type="color"
          value={value ? `#${convertColor.hslToHex(value)}` : '#000000'}
        />
        <span
          className={cn({
            'text-muted-foreground': !value,
          })}
        >
          {value ? `hsl(${value.h}, ${value.s}%, ${value.l}%)` : t('none')}
        </span>
      </Button>

      {!required && value && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                ariaLabel={t('remove')}
                className="shrink-0"
                onClick={() => {
                  onChange(null);
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
    </div>
  );
};
