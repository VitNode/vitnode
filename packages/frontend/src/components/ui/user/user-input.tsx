import * as React from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { Loader } from '../loader';
import { Badge } from '../badge';

import { cn } from '../../../helpers/classnames';

const UserInputContent = React.lazy(async () =>
  import('../../../utils/components/user/user-input/content').then(module => ({
    default: module.UserInputContent,
  })),
);

export interface UserInputItem {
  id: number;
  name: string;
}

interface Props {
  onChange: (value?: UserInputItem | UserInputItem[]) => void;
  className?: string;
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
  const t = useTranslations('core.user_input');
  const values = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
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
          {...rest}
        >
          {values.length === 0
            ? t('placeholder')
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
                    {item.name} <X />
                  </Badge>
                );
              })}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0" align="start">
        <React.Suspense fallback={<Loader className="p-4" />}>
          <UserInputContent
            values={values}
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
          />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
