import * as z from 'zod';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/helpers/classnames';
import { getBaseSchema } from '../utils';
import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormMessage } from '../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';

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
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Button>, 'role' | 'variant'> & {
    labels?: Record<string, JSX.Element | string>;
    multiple?: boolean;
    placeholderSearchInput?: string;
  }) => {
  const t = useTranslations('core');
  const [open, setOpen] = React.useState(false);
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem, true) as unknown as z.ZodEnum<any>)
    ._def.values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
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
      return labels?.[current[0]] || item;
    }

    return item || t('select_option');
  };

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem.label && (
        <AutoFormLabel
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
          description={fieldConfigItem.description}
        />
      )}
      <ParentWrapper field={field}>
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                className={cn('w-full justify-start', props.className)}
                variant="outline"
                role="combobox"
                ariaLabel={fieldConfigItem.label ?? ''}
                disabled={isDisabled || props.disabled}
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
                        value={labelFromProps}
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
