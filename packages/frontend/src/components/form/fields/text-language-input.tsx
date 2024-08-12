import { TextLanguageInput } from '@/components/ui/text-language-input';
import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { FormControl, FormMessage } from '@/components/ui/form';
import { AutoFormTooltip } from './common/tooltip';

export const AutoFormTextLanguageInput = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<
    React.ComponentProps<typeof TextLanguageInput>,
    'onChange' | 'value'
  >) => {
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
          <TextLanguageInput
            {...field}
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
