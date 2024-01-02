'use client';

import './code-block-element.css';

import { cn, withRef } from '@udecode/cn';
import { useCodeBlockElementState } from '@udecode/plate-code-block';
import { PlateElement } from '@udecode/plate-common';

import { ComboboxCodeBlockElement } from './combobox';

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    return (
      <PlateElement
        ref={ref}
        className={cn('relative py-1', state.className, className)}
        {...props}
      >
        <pre className="font-mono bg-muted rounded-md p-5 overflow-x-auto">
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div className="absolute right-4 top-4 z-10 select-none" contentEditable={false}>
            <ComboboxCodeBlockElement />
          </div>
        )}
      </PlateElement>
    );
  }
);
