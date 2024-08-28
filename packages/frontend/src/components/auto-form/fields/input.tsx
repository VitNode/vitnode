import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

export type AutoFormInputComponentProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
>;

export function AutoFormInput<T extends FieldValues>({
  field,
  zodInputProps,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  overrideOptions,
  ...props
}: AutoFormInputComponentProps & AutoFormItemProps<T>) {
  return (
    <>
      {label && (
        <AutoFormLabel
          description={description}
          isRequired={isRequired}
          label={label}
          theme={theme}
        />
      )}

      <FormControl>
        <Input {...field} {...zodInputProps} {...props} disabled={isDisabled} />
      </FormControl>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
    </>
  );
}
