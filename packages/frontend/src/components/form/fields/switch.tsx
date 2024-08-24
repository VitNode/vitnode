import { FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/helpers/classnames';

import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export const AutoFormSwitch = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps & React.ComponentProps<typeof Switch>) => {
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper
      className={cn({
        'flex flex-row items-center justify-between gap-4 rounded-lg border p-4':
          theme === 'vertical',
      })}
      theme={theme}
    >
      <div>
        {fieldConfigItem.label && (
          <AutoFormLabel
            description={fieldConfigItem.description}
            isRequired={isRequired}
            label={fieldConfigItem.label}
            theme={theme}
          />
        )}
        {fieldConfigItem.description && theme === 'vertical' && (
          <AutoFormTooltip description={fieldConfigItem.description} />
        )}
        <FormMessage />
      </div>
      <ParentWrapper field={field}>
        <FormControl>
          <Switch
            checked={props.value ?? field.value}
            onCheckedChange={e => {
              field.onChange(e);
              props.onCheckedChange?.(e);
            }}
            {...props}
            disabled={isDisabled || props.disabled}
          />
        </FormControl>
      </ParentWrapper>
    </AutoFormWrapper>
  );
};
