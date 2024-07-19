'use client';

import React from 'react';
import { X } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from '@/helpers/classnames';
import { Badge } from './badge';

interface TagInputItemProps {
  id: number;
  value: string;
}

interface Props {
  onChange: (value?: TagInputItemProps | TagInputItemProps[]) => void;
  className?: string;
  placeholder?: string;
}

interface MultiProps extends Props {
  className?: string;
  multiple?: true;
  value?: TagInputItemProps[];
}

interface SingleProps extends Props {
  className?: string;
  multiple?: never;
  value?: TagInputItemProps;
}

export const TagInput = ({
  className,
  placeholder,
  multiple,
  onChange,
  value: valueFromProps,
}: MultiProps | SingleProps) => {
  const values: TagInputItemProps[] = Array.isArray(valueFromProps)
    ? valueFromProps
    : valueFromProps
      ? [valueFromProps]
      : [];
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full justify-start', className, {
            'text-muted-foreground': values.length === 0,
          })}
        >
          {values.length === 0
            ? placeholder
            : values.map(item => {
                const onRemove = () => {
                  if (multiple) {
                    onChange(values.filter(value => value.id !== item.id));

                    return;
                  }

                  onChange();
                };

                return (
                  <Badge
                    className="shrink-0 [&>svg]:size-4"
                    key={item.id}
                    tabIndex={0}
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemove();
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                        e.preventDefault();
                        onRemove();
                      }
                    }}
                  >
                    {item.value} <X />
                  </Badge>
                );
              })}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0" align="start">
        content
      </PopoverContent>
    </Popover>
  );
};
