'use client';

import { IconPicker } from '@/components/icon/picker/icon-picker';
import { FormControl, FormMessage } from '@/components/ui/form';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormIconPickerProps = Omit<
  React.ComponentProps<typeof IconPicker>,
  'onChange' | 'value'
>;

export function AutoFormIconPicker<T extends FieldValues>({
  field,
  zodInputProps,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
}: {
  componentProps?: AutoFormIconPickerProps;
} & AutoFormItemProps<T>) {
  const value = field.value || '';

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

      <FormControl>
        <IconPicker
          required={isRequired}
          {...field}
          {...zodInputProps}
          {...componentProps}
          disabled={isDisabled || componentProps?.disabled}
          onChange={field.onChange as (value?: string) => void}
          value={value}
        />
      </FormControl>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
