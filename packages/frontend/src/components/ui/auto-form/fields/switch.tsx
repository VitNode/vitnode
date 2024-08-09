import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

import { FormControl, FormMessage } from '../../form';
import { Switch } from '../../switch';

export const AutoFormSwitch = ({
  autoFormProps: { isRequired, fieldConfigItem, field, theme, isDisabled },
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Switch>, 'value'>) => {
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
