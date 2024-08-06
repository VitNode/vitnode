import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { cn } from '@/helpers/classnames';

import { FormControl, FormItem, FormMessage } from '../../form';
import { Checkbox } from '../../checkbox';

export const AutoFormCheckbox = ({
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) => {
  return (
    <FormItem
      className={cn('flex flex-row items-start space-x-3 space-y-0', {
        'rounded-md border p-4':
          fieldConfigItem?.label || fieldConfigItem.description,
      })}
    >
      <FormControl>
        <Checkbox
          checked={fieldProps.value}
          onCheckedChange={fieldProps.onChange}
          {...fieldProps}
        />
      </FormControl>

      {(fieldConfigItem?.label || fieldConfigItem.description) && (
        <div className="space-y-1 leading-none">
          {fieldConfigItem?.label && (
            <AutoFormLabel
              label={fieldConfigItem.label}
              isRequired={isRequired}
            />
          )}
          {fieldConfigItem.description && (
            <AutoFormTooltip description={fieldConfigItem.description} />
          )}
        </div>
      )}
      <FormMessage />
    </FormItem>
  );
};
