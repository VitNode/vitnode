import { DatePicker } from '@/components/ui/date-picker';
import { FormControl, FormMessage } from '@/components/ui/form';

import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export const AutoFormDate = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof DatePicker>, 'onChange' | 'value'>) => {
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
          <DatePicker
            {...props}
            {...field}
            className="flex"
            disabled={isDisabled || props.disabled}
            value={field.value}
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
