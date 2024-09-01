'use client';

import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormMessage } from '@/components/ui/form';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormDatePickerProps = Omit<
  React.ComponentProps<typeof DatePicker>,
  'onChange' | 'value'
>;

export function AutoFormDatePicker<T extends FieldValues>({
  field,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
  className,
  childComponent: ChildComponent,
}: {
  componentProps?: AutoFormDatePickerProps;
} & AutoFormItemProps<T>) {
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
          <DatePicker
            {...field}
            {...componentProps}
            className="flex"
            disabled={isDisabled || componentProps?.disabled}
          />
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
