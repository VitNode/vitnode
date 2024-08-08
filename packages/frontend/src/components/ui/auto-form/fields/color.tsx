import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

import { FormControl, FormMessage } from '../../form';
import { ColorPicker } from '../../color-picker';

export const AutoFormColor = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof ColorPicker>, 'onChange' | 'value'>) => {
  const value = field.value || '';

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem?.label && (
        <AutoFormLabel
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
        />
      )}
      <FormControl>
        <ColorPicker
          disableRemoveColor={isRequired}
          {...field}
          {...props}
          value={value}
        />
      </FormControl>
      {fieldConfigItem.description && (
        <AutoFormTooltip
          value={value}
          description={fieldConfigItem.description}
        />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
