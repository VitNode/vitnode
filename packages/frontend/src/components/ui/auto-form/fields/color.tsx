import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';

import { FormControl, FormItem, FormMessage } from '../../form';
import { ColorPicker } from '../../color-picker';

type ViewProps = React.ComponentProps<typeof ColorPicker> & {
  showLabel?: boolean;
};

export const AutoFormColor = ({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps & {
  fieldProps: Omit<ViewProps, 'id' | 'ref'>;
}) => {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {showLabel && (
          <AutoFormLabel
            label={fieldConfigItem?.label || label}
            isRequired={isRequired}
          />
        )}
        <FormControl>
          <ColorPicker {...fieldPropsWithoutShowLabel} />
        </FormControl>
        <AutoFormTooltip description={fieldConfigItem.description} />
        <FormMessage />
      </FormItem>
    </div>
  );
};
