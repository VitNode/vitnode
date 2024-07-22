'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';

import { cn } from '../../helpers/classnames';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

export const classPopover = cn(
  'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 no-scrollbar z-50 max-h-[var(--radix-popover-content-available-height)] w-72 max-w-[var(--radix-popover-content-available-width)] overflow-y-auto rounded-md border p-4 shadow-md outline-none',
);

const PopoverContent = ({
  align = 'center',
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(classPopover, className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
