import { DefaultParent } from './common/children';
import { AutoFormInputComponentProps } from '../type';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AutoFormTooltip } from './common/tooltip';

export const AutoFormInput = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  React.InputHTMLAttributes<HTMLInputElement>) => {
  const value = field.value || '';
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;

  return (
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem.label && (
        <AutoFormLabel
          description={fieldConfigItem.description}
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
        />
      )}
      <ParentWrapper field={field}>
        <FormControl>
          <Input
            {...props}
            {...field}
            value={props.value ?? value}
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
