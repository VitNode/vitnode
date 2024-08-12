import { IconPicker } from '@/components/icon/picker/icon-picker';
import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { FormControl, FormMessage } from '@/components/ui/form';
import { AutoFormTooltip } from './common/tooltip';

export const AutoFormIcon = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof IconPicker>, 'onChange' | 'value'>) => {
  const value = field.value || '';
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem?.label && (
        <AutoFormLabel
          description={fieldConfigItem.description}
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
        />
      )}
      <ParentWrapper field={field}>
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
        <AutoFormTooltip description={fieldConfigItem.description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
