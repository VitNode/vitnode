import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

import { FormControl, FormMessage } from '../../form';
import { TextLanguageInput } from '../../text-language-input';

export const AutoFormTextLanguageInput = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<
    React.ComponentProps<typeof TextLanguageInput>,
    'onChange' | 'value'
  >) => {
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
        <TextLanguageInput
          {...field}
          {...props}
          disabled={isDisabled || props.disabled}
        />
      </FormControl>
      {fieldConfigItem.description && (
        <AutoFormTooltip
          value={field.value}
          description={fieldConfigItem.description}
        />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
