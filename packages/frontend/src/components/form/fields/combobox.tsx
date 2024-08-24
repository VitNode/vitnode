import { cn } from '@/helpers/classnames';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import * as z from 'zod';

import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { FormControl, FormMessage } from '../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { AutoFormInputComponentProps } from '../type';
import { getBaseSchema } from '../utils';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export const AutoFormCombobox = ({
  autoFormProps: {
    isRequired,
    fieldConfigItem,
    zodItem,
    field,
    theme,
    isDisabled,
  },
  labels,
  placeholderSearchInput,
  multiple,
  ...props
}: {
  labels?: Record<string, JSX.Element | string>;
  multiple?: boolean;
  placeholderSearchInput?: string;
} & AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Button>, 'role' | 'variant'>) => {
  const t = useTranslations('core');
  const [open, setOpen] = React.useState(false);
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem, true) as unknown as z.ZodEnum<any>)
    ._def.values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues as object);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  const buttonPlaceholder = () => {
    if (multiple && Array.isArray(field.value)) {
      return t('selected', { count: field.value.length });
    }

    const current = values.find(item => item[0] === field.value);
    const item = current?.[1];

    if (current) {
      return labels?.[current[0]] ?? item;
    }

    return item ?? t('select_option');
  };

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem.label && (
        <AutoFormLabel
          description={fieldConfigItem.description}
          isRequired={isRequired}
          label={fieldConfigItem.label}
          theme={theme}
        />
      )}
      <ParentWrapper field={field}>
        <Popover modal onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                ariaLabel={fieldConfigItem.label ?? ''}
                className={cn('w-full justify-start', props.className)}
                disabled={isDisabled || props.disabled}
                role="combobox"
                variant="outline"
                {...props}
              >
                {buttonPlaceholder()}
                <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput
                placeholder={
                  placeholderSearchInput
                    ? placeholderSearchInput
                    : t('search_placeholder')
                }
              />
              <CommandList>
                <CommandEmpty>{t('no_results')}</CommandEmpty>
                <CommandGroup>
                  {values.map(([value, labelFromProps]) => {
                    const label = labels?.[value] ?? labelFromProps;
                    const currentArrayValues = Array.isArray(field.value)
                      ? field.value
                      : field.value
                        ? [field.value]
                        : [];

                    return (
                      <CommandItem
                        key={value}
                        onSelect={() => {
                          if (multiple) {
                            field.onChange(
                              currentArrayValues.includes(value)
                                ? currentArrayValues.filter(el => el !== value)
                                : [...currentArrayValues, value],
                            );

                            return;
                          }

                          field.onChange(value);
                          setOpen(false);
                        }}
                        value={labelFromProps}
                      >
                        <Check
                          className={cn(
                            'mr-2 size-4',
                            (
                              multiple
                                ? currentArrayValues.includes(value)
                                : value === field.value
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
      </ParentWrapper>
      {fieldConfigItem.description && theme === 'vertical' && (
        <AutoFormTooltip description={fieldConfigItem.description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
