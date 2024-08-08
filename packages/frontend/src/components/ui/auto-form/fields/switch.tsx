import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { Switch } from '../../switch';

export const AutoFormSwitch = ({
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) => {
  return (
    <FormItem>
      {fieldConfigItem?.label && (
        <AutoFormLabel label={fieldConfigItem.label} isRequired={isRequired} />
      )}
      <FormControl>
        <Switch
          checked={fieldProps.value}
          onCheckedChange={fieldProps.onChange}
          {...fieldProps}
        />
      </FormControl>
      {fieldConfigItem.description && (
        <AutoFormTooltip
          value={fieldProps.value}
          description={fieldConfigItem.description}
        />
      )}
      <FormMessage />
    </FormItem>
  );
};
