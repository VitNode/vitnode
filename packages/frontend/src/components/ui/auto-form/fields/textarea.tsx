import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { Textarea } from '../../textarea';

export const AutoFormTextArea = ({
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
          <Textarea {...fieldProps} />
        </FormControl>
        {fieldConfigItem.description && (
          <AutoFormTooltip description={fieldConfigItem.description} />
        )}
        <FormMessage />
      </FormItem>
    </div>
  );
};
