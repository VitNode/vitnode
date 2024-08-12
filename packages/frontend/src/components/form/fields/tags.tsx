import { TagsInput } from '@/components/ui/tags-input';
import { AutoFormInputComponentProps } from '../type';
import { FormControl, FormMessage } from '@/components/ui/form';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';
import { AutoFormLabel } from './common/label';
import { DefaultParent } from './common/children';

export const AutoFormTags = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof TagsInput>, 'onChange'>) => {
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
      <ParentWrapper field={field}>
        <FormControl>
          <TagsInput
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
