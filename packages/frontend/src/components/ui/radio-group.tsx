'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import React from 'react';

import { cn } from '../../helpers/classnames';

const RadioGroup: React.FC<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>
> = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
};

const RadioGroupItem: React.FC<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>
> = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square h-4 w-4 flex-shrink-0 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="size-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};

export { RadioGroup, RadioGroupItem };
