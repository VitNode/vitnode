import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { cn } from '@/helpers/classnames';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';

import { FormControl, FormMessage } from '../../form';
import { Checkbox } from '../../checkbox';

export const AutoFormCheckbox = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Checkbox>, 'onChange' | 'value'>) => {
  const value: boolean = field.value || false;
  const desc =
    typeof fieldConfigItem.description === 'function'
      ? fieldConfigItem.description(field.value)
      : fieldConfigItem.description;
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper
      className={cn('flex items-start space-x-3 space-y-0', {
        'rounded-md border p-4':
          fieldConfigItem?.label && fieldConfigItem.description,
      })}
      theme={theme}
    >
      <ParentWrapper>
        <FormControl>
          <Checkbox
            checked={value}
            onCheckedChange={field.onChange}
            disabled={isDisabled || props.disabled}
            {...props}
          />
        </FormControl>
      </ParentWrapper>

      {(fieldConfigItem?.label || fieldConfigItem.description) && (
        <div className="space-y-1 leading-none">
          {fieldConfigItem?.label && (
            <AutoFormLabel
              description={desc}
              label={fieldConfigItem.label}
              isRequired={isRequired}
              theme={theme}
            />
          )}
          {fieldConfigItem.description && theme === 'vertical' && (
            <AutoFormTooltip description={desc} />
          )}
        </div>
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
