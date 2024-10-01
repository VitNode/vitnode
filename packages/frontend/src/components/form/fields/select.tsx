'use client';

import { getBaseSchema } from '@/components/form/utils';
import { FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import * as z from 'zod';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormSelectProps = {
  labels?: Record<string, React.JSX.Element | string>;
  placeholder?: string;
} & Omit<React.ComponentProps<typeof Select>, 'onValueChange' | 'value'>;

export function AutoFormSelect<T extends FieldValues>({
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
  overrideOptions,
}: {
  componentProps?: AutoFormSelectProps;
} & AutoFormItemProps<T>) {
  const t = useTranslations('core.global');
  const baseValues = (
    getBaseSchema(shape, true) as unknown as z.ZodEnum<[string, ...string[]]>
  )._def.values;

  let values: [string, string][] = [];
  if (overrideOptions?.length) {
    values = overrideOptions.map(value => [value, value]);
  } else if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues as object);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  const buttonPlaceholder = () => {
    const current = values.find(item => item[0] === field.value);
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

      <AutoFormInputWrapper
        className={className}
        withChildren={!!ChildComponent}
      >
        <FormControl>
          <Select
            defaultValue={field.value}
            disabled={isDisabled || componentProps?.disabled}
            onValueChange={field.onChange}
          >
            <SelectTrigger {...componentProps}>
              <SelectValue
                placeholder={componentProps?.placeholder ?? buttonPlaceholder()}
              >
                {buttonPlaceholder()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {values.map(([value, labelFromProps]) => {
                const label = componentProps?.labels?.[value] ?? labelFromProps;

                return (
                  <SelectItem key={value} value={labelFromProps}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormControl>
        {ChildComponent && <ChildComponent field={field} />}
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
