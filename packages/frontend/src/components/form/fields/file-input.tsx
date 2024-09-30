'use client';

import { FileInput } from '@/components/ui/file-input';
import { FormControl, FormMessage } from '@/components/ui/form';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormFileInputProps = Omit<
  React.ComponentProps<typeof FileInput>,
  'onChange' | 'value'
>;

export function AutoFormFileInput<T extends FieldValues>({
  field,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
  className,
  hideOptionalLabel,
  childComponent: ChildComponent,
}: {
  componentProps?: AutoFormFileInputProps;
} & AutoFormItemProps<T>) {
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
          <FileInput
            required={isRequired}
            {...field}
            {...componentProps}
            className="w-full"
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
