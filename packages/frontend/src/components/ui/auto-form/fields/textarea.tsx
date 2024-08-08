import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

import { FormControl, FormMessage } from '../../form';
import { Textarea } from '../../textarea';

export const AutoFormTextArea = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'value'>) => {
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
        <Textarea {...field} value={value} {...props} />
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
