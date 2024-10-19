import { AutoFormComponentProps } from '@/components/form/auto-form';
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

import { getBaseSchema } from '../utils';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormSelect({
  field,
  label,
  theme,
  description,
  isRequired,
  isDisabled,
  hideOptionalLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zodInputProps: _,
  overrideOptions,
  shape,
  wrapper,
  labels,
  placeholder,
  ...props
}: {
  labels?: Record<string, React.JSX.Element | string>;
  placeholder?: string;
} & AutoFormComponentProps &
  Omit<React.ComponentProps<typeof Select>, 'name' | 'value'>) {
  const t = useTranslations('core.global');
  const baseValues = (
    getBaseSchema(shape, true) as unknown as z.ZodEnum<[string, ...string[]]>
  )._def.values;

  let values: [string, string][] = [];
  if (overrideOptions?.length) {
    values = overrideOptions.map(value => [value, value]);
  } else if (!Array.isArray(baseValues)) {
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
      {label && (
        <AutoFormLabel
          description={description}
          hideOptionalLabel={hideOptionalLabel}
          isRequired={isRequired}
          label={label}
          theme={theme}
        />
      )}

      <AutoFormInputWrapper Wrapper={wrapper}>
        <FormControl>
          <Select
            defaultValue={field.value}
            disabled={isDisabled || props.disabled}
            onValueChange={e => {
              field.onChange(e);
              props?.onValueChange?.(e);
            }}
          >
            <SelectTrigger {...props}>
              <SelectValue
                onBlur={field.onBlur}
                placeholder={placeholder ?? buttonPlaceholder()}
              >
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
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
