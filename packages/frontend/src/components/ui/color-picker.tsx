'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { RemoveFormatting } from 'lucide-react';

import { Button } from './button';
import {
  convertColor,
  getHSLFromString,
  isColorBrightness,
} from '@/helpers/colors';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

import { cn } from '../../helpers/classnames';

export const ColorPicker = ({
  disableRemoveColor,
  disabled,
  onChange,
  value: valueProp,
  className,
  id,
  ref: refFromProps,
}: {
  onChange: (value: string | null) => void;
  value: string | null;
  className?: string;
  disableRemoveColor?: boolean;
  disabled?: boolean;
  id?: string;
  ref?: React.RefCallback<HTMLButtonElement>;
}) => {
  const t = useTranslations('core.colors');
  const ref = React.useRef<HTMLInputElement>(null);
  const value = getHSLFromString(valueProp ?? '');
  const colorBrightness = value ? isColorBrightness(value) : false;

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        className={cn(
          'relative flex min-w-40 max-w-52 justify-start',
          className,
          {
            'text-black': value && colorBrightness,
            'text-white': value && !colorBrightness,
          },
        )}
        style={{
          backgroundColor: value
            ? `hsl(${value.h}, ${value.s}%, ${value.l}%)`
            : '',
        }}
        ref={refFromProps}
        onClick={() => {
          ref.current?.click();
        }}
        disabled={disabled}
      >
        <input
          id={id}
          ref={ref}
          className="invisible absolute bottom-0 left-0 h-0 w-0"
          type="color"
          onChange={e => {
            const color = convertColor.hexToHSL(e.target.value);
            if (!color) return;

            onChange(color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : '');
          }}
          value={value ? `#${convertColor.hslToHex(value)}` : ''}
          disabled={disabled}
        />
        <span
          className={cn({
            'text-muted-foreground': !value,
          })}
        >
          {value ? `hsl(${value.h}, ${value.s}%, ${value.l}%)` : t('none')}
        </span>
      </Button>

      {!disableRemoveColor && value && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="shrink-0"
                ariaLabel={t('remove')}
                variant="ghost"
                onClick={() => {
                  onChange(null);
                }}
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
