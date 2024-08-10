import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';

import { FormControl, FormMessage } from '../../form';
import { Switch } from '../../switch';

export const AutoFormSwitch = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Switch>, 'value'>) => {
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
      <ParentWrapper>
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={e => {
              field.onChange(e);
              props.onCheckedChange?.(e);
            }}
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
