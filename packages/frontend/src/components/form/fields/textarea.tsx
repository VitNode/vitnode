import { AutoFormComponentProps } from '@/components/form/auto-form';
import { FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoTextArea({
  field,
  label,
  theme,
  description,
  isRequired,
  isDisabled,
  hideOptionalLabel,
  zodInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overrideOptions: _,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shape: _shape,
  wrapper,
  classNameWrapper,
  ...props
}: AutoFormComponentProps &
  Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value'>) {
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
          <Textarea
            value={field.value ?? ''}
            {...props}
            {...zodInputProps}
            disabled={isDisabled || props.disabled}
            onBlur={field.onBlur || props.onBlur}
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
