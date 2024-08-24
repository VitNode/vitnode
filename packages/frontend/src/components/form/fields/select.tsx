import { FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

import { AutoFormInputComponentProps } from '../type';
import { getBaseSchema } from '../utils';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

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
}: {
  labels?: Record<string, JSX.Element | string>;
  placeholder?: string;
} & AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof Select>, 'onValueChange'>) => {
  const t = useTranslations('core');
  const ParentWrapper = fieldConfigItem.renderParent ?? DefaultParent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues as object);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  const buttonPlaceholder = () => {
    const current = values.find(item => item[0] === field.value);
    const item = current?.[1];

    if (current) {
      return labels?.[current[0]] ?? item;
    }

    return item ?? t('select_option');
  };

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
          <Select
            defaultValue={props.value ?? field.value}
            disabled={isDisabled || props.disabled}
            onValueChange={field.onChange}
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
                  <SelectItem key={value} value={labelFromProps}>
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
