import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';

import { FormControl, FormMessage } from '../../form';
import { Textarea } from '../../textarea';

export const AutoFormTextArea = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'value'>) => {
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
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
          description={desc}
        />
      )}
      <ParentWrapper>
        <FormControl>
          <Textarea
            {...field}
            value={value}
            {...props}
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
