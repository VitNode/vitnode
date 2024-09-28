'use client';

import { ColorPicker } from '@/components/ui/color-picker';
import { FormControl, FormMessage } from '@/components/ui/form';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormColorPickerProps = Omit<
  React.ComponentProps<typeof ColorPicker>,
  'onChange' | 'required' | 'value'
>;

export function AutoFormColorPicker<T extends FieldValues>({
  field,
  zodInputProps,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
  className,
  childComponent: ChildComponent,
  hideOptionalLabel,
}: {
  componentProps?: AutoFormColorPickerProps;
} & AutoFormItemProps<T>) {
  const value = field.value || '';

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
          <ColorPicker
            required={isRequired}
            {...field}
            {...zodInputProps}
            {...componentProps}
            disabled={isDisabled || componentProps?.disabled}
            onChange={field.onChange as (value: null | string) => void}
            value={value}
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
