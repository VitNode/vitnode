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
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {fieldConfigItem?.label && (
          <AutoFormLabel
            label={fieldConfigItem.label}
            isRequired={isRequired}
          />
        )}
        <FormControl>
          <Input type={fieldProps.type || 'text'} {...fieldProps} />
        </FormControl>
        <AutoFormTooltip description={fieldConfigItem.description} />
        <FormMessage />
      </FormItem>
    </div>
  );
};
