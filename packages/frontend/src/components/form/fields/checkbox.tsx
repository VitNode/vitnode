import { AutoFormComponentProps } from '@/components/form/auto-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/helpers/classnames';

import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormCheckbox({
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
  className,
  ...props
}: AutoFormComponentProps &
  Omit<React.ComponentProps<typeof Checkbox>, 'name' | 'value'>) {
  return (
    <AutoFormWrapper
      className={cn(
        'flex items-start space-x-3 space-y-0',
        {
          'rounded-md border p-4': label && description,
        },
        className,
      )}
      theme={theme}
    >
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
          <Checkbox
            checked={field.value || false}
            disabled={isDisabled || props.disabled}
            onCheckedChange={e => {
              field.onChange(e);
              props.onCheckedChange?.(e);
            }}
            {...props}
          />
        </FormControl>
      </AutoFormInputWrapper>

      {(label ?? description) && (
        <div className="space-y-1 leading-none">
          {label && (
            <AutoFormLabel
              description={description}
              hideOptionalLabel={hideOptionalLabel}
              isRequired={isRequired}
              label={label}
              theme={theme}
            />
          )}
          {description && theme === 'vertical' && (
            <AutoFormTooltip description={description} />
          )}
        </div>
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
