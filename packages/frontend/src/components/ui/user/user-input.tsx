import { X } from 'lucide-react';
import React from 'react';

import { cn } from '../../../helpers/classnames';
import { Badge } from '../badge';
import { Button } from '../button';
import { Loader } from '../loader';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

const UserInputContent = React.lazy(async () =>
  import('../../utils/user/user-input/content').then(module => ({
    default: module.UserInputContent,
  })),
);

export interface UserInputItem {
  id: number;
  name: string;
}

interface Props {
  className?: string;
  onChange: (value?: UserInputItem | UserInputItem[]) => void;
}

interface MultiProps extends Props {
  className?: string;
  multiple?: true;
  value?: UserInputItem[];
}

interface SingleProps extends Props {
  className?: string;
  multiple?: never;
  value?: UserInputItem;
}

export const UserInput = ({
  className,
  multiple,
  onChange,
  value: currentValue,
  ...rest
}: MultiProps | SingleProps) => {
  const values = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
      : [];
  const [open, setOpen] = React.useState(false);

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={cn('w-full justify-start', className, {
            'text-muted-foreground': values.length === 0,
          })}
          variant="outline"
          {...rest}
        >
          {values.length === 0
            ? // TODO: Add placeholder translation
              'Select user'
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
                    tabIndex={0}
                  >
                    {item.name} <X />
                  </Badge>
                );
              })}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-0">
        <React.Suspense fallback={<Loader className="p-4" />}>
          <UserInputContent
            onSelect={item => {
              if (multiple) {
                if (values.find(value => value.id === item.id)) {
                  onChange(values.filter(value => value.id !== item.id));

                  return;
                }
                onChange([...values, item]);

                return;
              }

              onChange(item.id !== values[0]?.id ? item : undefined);
              setOpen(false);
            }}
            values={values}
          />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
