import { cn } from '@/helpers/classnames';

import { Checkbox } from '../../ui/checkbox';
import { FormControl, FormMessage } from '../../ui/form';
import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export const AutoFormCheckbox = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Checkbox>, 'onChange' | 'value'>) => {
  const value: boolean = field.value || false;
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper
      className={cn('flex items-start space-x-3 space-y-0', {
        'rounded-md border p-4':
          fieldConfigItem.label && fieldConfigItem.description,
      })}
      theme={theme}
    >
      <ParentWrapper field={field}>
        <FormControl>
          <Checkbox
            checked={value}
            disabled={isDisabled || props.disabled}
            onCheckedChange={field.onChange}
            {...props}
          />
        </FormControl>
      </ParentWrapper>

      {(fieldConfigItem.label ?? fieldConfigItem.description) && (
        <div className="space-y-1 leading-none">
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
        </div>
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
