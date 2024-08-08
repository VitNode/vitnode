import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

import { FormControl, FormMessage } from '../../form';
import { Input } from '../../input';

export const AutoFormInput = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>) => {
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
        <Input type={props.type} {...props} {...field} value={value} />
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
