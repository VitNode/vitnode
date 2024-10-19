import { AutoFormComponentProps } from '@/components/form/auto-form';
import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormMessage } from '@/components/ui/form';

import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormDatePicker({
  field,
  label,
  theme,
  description,
  isRequired,
  isDisabled,
  hideOptionalLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zodInputProps: _ZodInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overrideOptions: _,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shape: _shape,
  classNameWrapper,
  wrapper,
  ...props
}: AutoFormComponentProps &
  Omit<React.ComponentProps<typeof DatePicker>, 'name' | 'value'>) {
  return (
    <AutoFormWrapper className={classNameWrapper} theme={theme}>
      {label && (
        <AutoFormLabel
          description={description}
          hideOptionalLabel={hideOptionalLabel}
          isRequired={isRequired}
          label={label}
          theme={theme}
        />
      )}

      <AutoFormInputWrapper field={field} Wrapper={wrapper}>
        <FormControl>
          <DatePicker
            {...field}
            {...props}
            className="flex"
            disabled={isDisabled || props.disabled}
            onChange={e => {
              field.onChange(e);
              props.onChange?.(e);
            }}
          />
        </FormControl>
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
