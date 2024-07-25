import { useTranslations } from 'next-intl';
import React from 'react';
import { Check } from 'lucide-react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { locales } from './locales';

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/classnames';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface Props<T extends FieldValues, TName extends Path<T>> {
  field: ControllerRenderProps<T, TName>;
}

export function LocaleFieldCreateEditLangAdmin<
  T extends FieldValues,
  TName extends Path<T>,
>({ field }: Props<T, TName>) {
  const t = useTranslations('admin.core.langs.actions');
  const tCore = useTranslations('core');
  const [open, setOpen] = React.useState(false);

  return (
    <FormItem>
      <FormLabel>{t('create.locale.label')}</FormLabel>

      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-full justify-between',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={tCore('search')} />

            <CommandList>
              <CommandEmpty>{tCore('no_results')}</CommandEmpty>
              <CommandGroup>
                {locales.map(item => (
                  <CommandItem
                    value={item.locale}
                    key={item.locale}
                    className="flex gap-2"
                    onSelect={value => {
                      field.onChange(value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'size-4',
                        field.value === item.locale
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    <span>
                      {item.name} - {item.locale}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <FormMessage />
    </FormItem>
  );
}
