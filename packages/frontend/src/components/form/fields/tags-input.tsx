import { AutoFormComponentProps } from '@/components/form/auto-form';
import { FormControl, FormMessage } from '@/components/ui/form';
import { TagInput } from '@/components/ui/tag-input';

import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormTagInput({
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
  wrapper,
  ...props
}: AutoFormComponentProps &
  Omit<React.ComponentProps<typeof TagInput>, 'name' | 'onChange' | 'value'>) {
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

      <AutoFormInputWrapper Wrapper={wrapper}>
        <FormControl>
          <TagInput
            {...props}
            disabled={isDisabled || props.disabled}
            onBlur={field.onBlur || props.onBlur}
            onChange={e => {
              field.onChange(e);
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
