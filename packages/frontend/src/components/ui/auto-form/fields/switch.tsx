import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';
import { cn } from '@/helpers/classnames';

import { FormControl, FormMessage } from '../../form';
import { Switch } from '../../switch';

export const AutoFormSwitch = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Switch>, 'value'>) => {
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper
      className={cn({
        'flex flex-row items-center justify-between gap-2 rounded-lg border p-4':
          theme === 'vertical',
      })}
      theme={theme}
    >
      <div>
        {fieldConfigItem?.label && (
          <AutoFormLabel
            label={fieldConfigItem.label}
            isRequired={isRequired}
            theme={theme}
            description={fieldConfigItem.description}
          />
        )}
        {fieldConfigItem.description && theme === 'vertical' && (
          <AutoFormTooltip description={fieldConfigItem.description} />
        )}
        <FormMessage />
      </div>
      <ParentWrapper>
        <FormControl>
          <Switch
            checked={field.value}
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
