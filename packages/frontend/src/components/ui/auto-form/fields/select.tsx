import * as z from 'zod';
import { useTranslations } from 'next-intl';

import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { getBaseSchema } from '../utils';
import { AutoFormWrapper } from './common/wrapper';
import { DefaultParent } from './common/children';

import { FormControl, FormMessage } from '../../form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select';

export const AutoFormSelect = ({
  autoFormProps: {
    isRequired,
    fieldConfigItem,
    zodItem,
    field,
    theme,
    isDisabled,
  },
  labels,
  placeholder,
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Select>, 'onValueChange'> & {
    labels?: Record<string, JSX.Element | string>;
    placeholder?: string;
  }) => {
  const t = useTranslations('core');
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  const buttonPlaceholder = () => {
    const current = values.find(item => item[0] === field.value);
    const item = current?.[1];

    if (current) {
      return labels?.[current[0]] || item;
    }

    return item || t('select_option');
  };

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
          <Select
            onValueChange={field.onChange}
            defaultValue={props.value ?? field.value}
            disabled={isDisabled || props.disabled}
            {...props}
          >
            <SelectTrigger {...props}>
              <SelectValue placeholder={placeholder}>
                {buttonPlaceholder()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {values.map(([value, labelFromProps]) => {
                const label = labels?.[value] ?? labelFromProps;

                return (
                  <SelectItem value={labelFromProps} key={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormControl>
      </ParentWrapper>
      {fieldConfigItem.description && theme === 'vertical' && (
        <AutoFormTooltip description={fieldConfigItem.description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
