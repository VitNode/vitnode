import { StringLanguage } from '@/graphql/types';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '../../../helpers/classnames';
import { useTextLang } from '../../../hooks/use-text-lang';
import { GroupInputContent } from '../../utils/user/group-input/content';
import { Badge } from '../badge';
import { Button } from '../button';
import { Loader } from '../loader';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

export interface GroupInputItem {
  id: number;
  name: StringLanguage[];
}

interface Props {
  className?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange: (value?: GroupInputItem | GroupInputItem[]) => void;
}

interface MultiProps extends Props {
  className?: string;
  multiple?: true;
  value?: GroupInputItem[];
}

interface SingleProps extends Props {
  className?: string;
  multiple?: never;
  value?: GroupInputItem;
}

export const GroupInput = ({
  className,
  multiple,
  onChange,
  value: currentValue,
  ...rest
}: MultiProps | SingleProps) => {
  const t = useTranslations('core.group_input');
  const values = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
      : [];
  const [open, setOpen] = React.useState(false);
  const { convertText } = useTextLang();

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
                    {convertText(item.name)} <X />
                  </Badge>
                );
              })}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-0">
        <React.Suspense fallback={<Loader className="p-4" />}>
          <GroupInputContent
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
