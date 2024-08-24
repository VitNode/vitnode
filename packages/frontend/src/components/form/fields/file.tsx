import { FileInput } from '@/components/ui/file-input';
import { FormControl, FormMessage } from '@/components/ui/form';

import { AutoFormInputComponentProps } from '../type';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export const AutoFormFile = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof FileInput>, 'onChange' | 'value'>) => {
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
          <FileInput
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
