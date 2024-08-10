import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';

import { FormControl, FormMessage } from '../../form';
import { TagsInput } from '../../tags-input';

export const AutoFormTags = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof TagsInput>, 'onChange' | 'value'>) => {
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
      <ParentWrapper>
        <FormControl>
          <TagsInput
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
