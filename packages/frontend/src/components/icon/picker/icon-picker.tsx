'use client';

import { Plus, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '../../../helpers/classnames';
import { Button } from '../../ui/button';
import { Loader } from '../../ui/loader';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { IconPickerProps } from './content/content';

const IconClient = React.lazy(async () =>
  import('../icon-client').then(module => ({
    default: module.IconClient,
  })),
);

const Content = React.lazy(async () =>
  import('./content/content').then(module => ({
    default: module.ContentIconInput,
  })),
);

interface Props extends Omit<IconPickerProps, 'setOpen'> {
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const IconPicker = ({
  className,
  onChange,
  value,
  disabled,
  required,
}: Props) => {
  const t = useTranslations('core');
  const [open, setOpen] = React.useState(false);

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <div className={cn('flex flex-col gap-2', className)}>
        <div className="flex gap-2">
          <PopoverTrigger asChild>
            <Button
              className="w-full max-w-52 justify-start"
              disabled={disabled}
              variant="outline"
            >
              <Plus /> {t('icon_picker.title')}
            </Button>
          </PopoverTrigger>

          {value && !required && (
            <Button
              onClick={() => {
                onChange(undefined);
              }}
              variant="destructiveGhost"
            >
              <X /> {t('icon_picker.remove')}
            </Button>
          )}
        </div>

        <React.Suspense fallback={<Loader className="p-4" />}>
          {value && <IconClient className="size-10 text-4xl" name={value} />}
        </React.Suspense>
      </div>

      <PopoverContent align="start" className="w-72 p-0">
        <React.Suspense
          fallback={
            <Loader className="h-64 max-h-[var(--radix-popover-content-available-height)] p-4" />
          }
        >
          <Content onChange={onChange} setOpen={setOpen} value={value} />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
