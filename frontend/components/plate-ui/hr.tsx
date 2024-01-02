import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';

export const HrElement = withRef<typeof PlateElement>(({ className, nodeProps, ...props }, ref) => {
  const { children } = props;

  return (
    <PlateElement ref={ref} {...props}>
      <div className="py-6" contentEditable={false}>
        <hr
          {...nodeProps}
          className={cn(
            'h-0.5 cursor-pointer rounded-sm border-none bg-muted bg-clip-content',

            className
          )}
        />
      </div>
      {children}
    </PlateElement>
  );
});
