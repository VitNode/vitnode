'use client';

import { FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormTextAreaProps = Omit<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value'
>;

export function AutoTextArea<T extends FieldValues>({
  field,
  zodInputProps,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
}: {
  componentProps?: AutoFormTextAreaProps;
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
        <Textarea
          {...field}
          value={value}
          {...componentProps}
          {...zodInputProps}
          disabled={isDisabled || componentProps?.disabled}
        />
      </FormControl>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
