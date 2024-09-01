'use client';

import { getBaseSchema } from '@/components/form/utils';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import * as z from 'zod';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormRadioGroupProps = {
  labels?: Record<
    string,
    {
      description?: React.ReactNode;
      title: string;
    }
  >;
} & Omit<React.ComponentProps<typeof RadioGroup>, 'role' | 'variant'>;

export function AutoFormRadioGroup<T extends FieldValues>({
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
}: {
  componentProps?: AutoFormRadioGroupProps;
} & AutoFormItemProps<T>) {
  const baseValues = (
    getBaseSchema(shape, true) as unknown as z.ZodEnum<[string, ...string[]]>
  )._def.values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues as object);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  return (
    <AutoFormWrapper theme={theme}>
      {label && (
        <AutoFormLabel
          description={description}
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
          <RadioGroup
            defaultValue={field.value}
            disabled={isDisabled || componentProps?.disabled}
            onValueChange={field.onChange}
            {...componentProps}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {values.map((value: any) => {
              const label =
                componentProps?.labels?.[value[0]]?.title ?? value[1];
              const description =
                componentProps?.labels?.[value[0]]?.description;

              return (
                <FormItem
                  className="flex items-center gap-3 space-y-0"
                  key={value}
                >
                  <FormControl>
                    <RadioGroupItem value={value[0]} />
                  </FormControl>
                  <FormLabel className="flex items-center space-y-0 font-normal">
                    <span>{label}</span>

                    {description && (
                      <span className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1 text-sm font-normal">
                        {description}
                      </span>
                    )}
                  </FormLabel>
                </FormItem>
              );
            })}
          </RadioGroup>
        </FormControl>
        <ChildComponent field={field} />
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
