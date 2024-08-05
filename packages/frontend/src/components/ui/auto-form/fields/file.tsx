import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { FileInput } from '../../file-input';

export const AutoFormFile = ({
  isRequired,
  fieldConfigItem,
  fieldProps,
}: Omit<AutoFormInputComponentProps, 'fieldProps'> & {
  fieldProps: React.ComponentProps<typeof FileInput>;
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
          <FileInput {...fieldProps} />
        </FormControl>
        <AutoFormTooltip description={fieldConfigItem.description} />
        <FormMessage />
      </FormItem>
    </div>
  );
};
