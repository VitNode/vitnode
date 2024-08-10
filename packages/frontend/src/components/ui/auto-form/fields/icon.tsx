import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';
import { IconPicker } from '@/components/icon/picker/icon-picker';

import { FormControl, FormMessage } from '../../form';

export const AutoFormIcon = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof IconPicker>, 'onChange' | 'value'>) => {
  const value = field.value || '';
  const desc =
    typeof fieldConfigItem.description === 'function'
      ? fieldConfigItem.description(field.value)
      : fieldConfigItem.description;
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem?.label && (
        <AutoFormLabel
          description={desc}
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
        />
      )}
      <ParentWrapper>
        <FormControl>
          <IconPicker
            {...props}
            {...field}
            value={value}
            disabled={isDisabled || props.disabled}
          />
        </FormControl>
      </ParentWrapper>
      {fieldConfigItem.description && theme === 'vertical' && (
        <AutoFormTooltip description={desc} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
