import { DefaultParent } from './common/children';
import { AutoFormInputComponentProps } from '../type';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { FormControl, FormMessage } from '@/components/ui/form';
import { AutoFormTooltip } from './common/tooltip';
import { DatePicker } from '@/components/ui/date-picker';

export const AutoFormDate = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof DatePicker>, 'onChange' | 'value'>) => {
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
          <DatePicker
            {...props}
            {...field}
            className="flex"
            value={field.value}
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
