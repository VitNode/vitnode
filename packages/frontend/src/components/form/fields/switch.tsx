import { FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/helpers/classnames';

import { AutoFormComponentProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormSwitch({
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
  classNameWrapper,
  ...props
}: AutoFormComponentProps &
  Omit<React.ComponentProps<typeof Switch>, 'checked'>) {
  const value: boolean = field.value || false;

  return (
    <AutoFormWrapper
      className={cn(
        {
          'gap-4 rounded-lg border p-4': theme === 'vertical',
        },
        classNameWrapper,
      )}
      theme={theme}
    >
      <div>
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
        <FormMessage />
      </div>

      <AutoFormInputWrapper field={field} Wrapper={wrapper}>
        <FormControl>
          <Switch
            checked={value}
            onCheckedChange={e => {
              field.onChange(e);
              props?.onCheckedChange?.(e);
            }}
            {...props}
            disabled={isDisabled || props?.disabled}
          />
        </FormControl>
      </AutoFormInputWrapper>
    </AutoFormWrapper>
  );
}
