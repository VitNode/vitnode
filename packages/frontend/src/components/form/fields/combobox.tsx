'use client';

import { getBaseSchema } from '@/components/form/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormMessage } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/helpers/classnames';
import { Check, ChevronsUpDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import * as z from 'zod';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormComboboxProps = {
  labels?: Record<string, React.JSX.Element | string>;
  multiple?: boolean;
  placeholderSearchInput?: string;
} & Omit<React.ComponentProps<typeof Button>, 'role' | 'variant'>;

export function AutoFormCombobox<T extends FieldValues>({
  field,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  shape,
  componentProps,
  className,
  childComponent: ChildComponent,
  hideOptionalLabel,
}: {
  componentProps?: AutoFormComboboxProps;
} & AutoFormItemProps<T>) {
  const t = useTranslations('core');
  const [open, setOpen] = React.useState(false);
  const value: string | string[] | undefined = field.value;
  const baseValues = (
    getBaseSchema(shape, true) as unknown as z.ZodEnum<[string, ...string[]]>
  )._def.values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues as object);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  const buttonPlaceholder = () => {
    if (componentProps?.multiple && Array.isArray(value)) {
      return t('selected', { count: value.length });
    }

    const current = values.find(item => item[0] === value);
    const item = current?.[1];

    if (current) {
      return componentProps?.labels?.[current[0]] ?? item;
    }

    return item ?? t('select_option');
  };

  return (
    <AutoFormWrapper theme={theme}>
      {label && (
        <AutoFormLabel
          description={description}
          hideOptionalLabel={hideOptionalLabel}
          isRequired={isRequired}
          label={label}
          theme={theme}
        />
      )}

      <Popover modal onOpenChange={setOpen} open={open}>
        <AutoFormInputWrapper
          className={className}
          withChildren={!!ChildComponent}
        >
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                ariaLabel={label ?? ''}
                className={cn(
                  'w-full justify-start',
                  componentProps?.className,
                )}
                disabled={isDisabled || componentProps?.disabled}
                role="combobox"
                variant="outline"
                {...componentProps}
              >
                {buttonPlaceholder()}
                <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          {ChildComponent && <ChildComponent field={field} />}
        </AutoFormInputWrapper>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput
              placeholder={
                componentProps?.placeholderSearchInput
                  ? componentProps.placeholderSearchInput
                  : t('search_placeholder')
              }
            />
            <CommandList>
              <CommandEmpty>{t('no_results')}</CommandEmpty>
              <CommandGroup>
                {values.map(([valueItem, labelFromProps]) => {
                  const label =
                    componentProps?.labels?.[valueItem] ?? labelFromProps;
                  const currentArrayValues = Array.isArray(value)
                    ? value
                    : value
                      ? [value]
                      : [];

                  return (
                    <CommandItem
                      key={valueItem}
                      onSelect={() => {
                        if (componentProps?.multiple) {
                          field.onChange(
                            currentArrayValues.includes(valueItem)
                              ? currentArrayValues.filter(
                                  el => el !== valueItem,
                                )
                              : [...currentArrayValues, valueItem],
                          );

                          return;
                        }

                        field.onChange(valueItem);
                        setOpen(false);
                      }}
                      value={labelFromProps}
                    >
                      <Check
                        className={cn(
                          'mr-2 size-4',
                          (
                            componentProps?.multiple
                              ? currentArrayValues.includes(valueItem)
                              : value === valueItem
                          )
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
