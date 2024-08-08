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
    <FormItem>
      {fieldConfigItem?.label && (
        <AutoFormLabel label={fieldConfigItem.label} isRequired={isRequired} />
      )}
      <FormControl>
        <FileInput {...fieldProps} />
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
