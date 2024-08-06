import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { Switch } from '../../switch';

export const AutoFormSwitch = ({
  isRequired,
  fieldConfigItem,
  fieldProps,
}: Omit<AutoFormInputComponentProps, 'fieldProps'> & {
  fieldProps: Omit<
    React.ComponentProps<typeof Switch>,
    'checked' | 'onCheckedChange'
  >;
}) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {fieldConfigItem?.label && (
          <AutoFormLabel
            label={fieldConfigItem.label}
            isRequired={isRequired}
          />
        )}
        <FormControl>
          <Switch
            checked={!!fieldProps.value}
            onCheckedChange={
              // Override the `onCheckedChange` to accept a boolean value
              fieldProps.onChange as unknown as (check: boolean) => void
            }
            {...fieldProps}
          />
        </FormControl>
        {fieldConfigItem.description && (
          <AutoFormTooltip description={fieldConfigItem.description} />
        )}
        <FormMessage />
      </FormItem>
    </div>
  );
};
