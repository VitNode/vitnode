'use client';

import React from 'react';
import { HslColor } from 'react-colorful';
import { useTranslations } from 'next-intl';
import { getHSLFromString, isColorBrightness } from 'vitnode-shared';

import { PickerColor } from './picker-color';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

import { cn } from '../../helpers/classnames';

export const ColorInput = ({
  disableRemoveColor,
  disabled,
  onChange,
  value,
  ...rest
}: {
  onChange: (value: string) => void;
  value: string;
  disableRemoveColor?: boolean;
  disabled?: boolean;
  ref?: React.RefCallback<HTMLButtonElement>;
}) => {
  const t = useTranslations('core.colors');
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState<HslColor | null>(
    getHSLFromString(value),
  );

  // Set color from value
  React.useEffect(() => {
    onChange(color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : '');
  }, [color]);

  const colorBrightness = color ? isColorBrightness(color) : false;

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <div className="flex gap-2">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('max-w-52 flex-1 justify-start', {
              'text-black': color && colorBrightness,
              'text-white': color && !colorBrightness,
            })}
            style={{
              backgroundColor: color
                ? `hsl(${color.h}, ${color.s}%, ${color.l}%)`
                : '',
            }}
            disabled={disabled}
            {...rest}
          >
            <span
              className={cn({
                'text-muted-foreground': !color,
              })}
            >
              {color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : t('none')}
            </span>
          </Button>
        </PopoverTrigger>
      </div>

      {!disabled && (
        <PopoverContent align="start" className="w-auto">
          <PickerColor
            color={color}
            setColor={setColor}
            disableRemoveColor={disableRemoveColor}
          />
        </PopoverContent>
      )}
    </Popover>
  );
};
