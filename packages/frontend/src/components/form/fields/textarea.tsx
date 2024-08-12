import { DefaultParent } from './common/children';
import { AutoFormInputComponentProps } from '../type';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { AutoFormTooltip } from './common/tooltip';

export const AutoFormTextArea = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  React.InputHTMLAttributes<HTMLTextAreaElement>) => {
  const value = field.value || '';

  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem?.label && (
        <AutoFormLabel
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
          description={fieldConfigItem.description}
        />
      )}
      <ParentWrapper field={field}>
        <FormControl>
          <Textarea
            {...field}
            value={props.value ?? value}
            {...props}
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
