import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { Input } from '../../input';

export const AutoFormInput = ({
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
        <Input type={fieldProps.type || 'text'} {...fieldProps} />
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
