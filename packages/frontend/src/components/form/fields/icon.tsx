import { IconPicker } from '@/components/icon/picker/icon-picker';
import { FormControl, FormMessage } from '@/components/ui/form';

import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export const AutoFormIcon = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof IconPicker>, 'onChange' | 'value'>) => {
  const value = field.value || '';
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem.label && (
        <AutoFormLabel
          description={fieldConfigItem.description}
          isRequired={isRequired}
          label={fieldConfigItem.label}
          theme={theme}
        />
      )}
      <ParentWrapper field={field}>
        <FormControl>
          <IconPicker
            {...props}
            {...field}
            disabled={isDisabled || props.disabled}
            value={value}
          />
        </FormControl>
      </ParentWrapper>
      {fieldConfigItem.description && theme === 'vertical' && (
        <AutoFormTooltip description={fieldConfigItem.description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
