import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { ColorPicker } from '../../color-picker';

export const AutoFormColor = ({
  isRequired,
  fieldConfigItem,
  fieldProps,
}: Omit<AutoFormInputComponentProps, 'fieldProps'> & {
  fieldProps: Omit<
    React.ComponentProps<typeof ColorPicker>,
    'disableRemoveColor' | 'id' | 'ref'
  >;
}) => {
  return (
    <FormItem>
      {fieldConfigItem?.label && (
        <AutoFormLabel label={fieldConfigItem.label} isRequired={isRequired} />
      )}
      <FormControl>
        <ColorPicker disableRemoveColor={isRequired} {...fieldProps} />
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
