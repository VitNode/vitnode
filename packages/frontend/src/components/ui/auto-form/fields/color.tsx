import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { ColorPicker } from '../../color-picker';

export const AutoFormColor = ({
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps & {
  fieldProps: Omit<
    React.ComponentProps<typeof ColorPicker>,
    'id' | 'ref' | 'disableRemoveColor'
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
          <ColorPicker disableRemoveColor={isRequired} {...fieldProps} />
        </FormControl>
        <AutoFormTooltip description={fieldConfigItem.description} />
        <FormMessage />
      </FormItem>
    </div>
  );
};
