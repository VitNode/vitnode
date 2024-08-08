import * as z from 'zod';
import { useTranslations } from 'next-intl';

import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { getBaseSchema } from '../utils';

import { FormControl, FormItem, FormMessage } from '../../form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select';

type FieldPropsRoot = AutoFormInputComponentProps['fieldProps'];

export interface FieldPropsAutoFormEnum extends FieldPropsRoot {
  labels?: Record<string, string>;
}

export const AutoFormEnum = ({
  isRequired,
  fieldConfigItem,
  zodItem,
  fieldProps,
  field,
}: Omit<AutoFormInputComponentProps, 'fieldProps'> & {
  fieldProps: FieldPropsAutoFormEnum;
}) => {
  const t = useTranslations('core');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  const findItem = (value: unknown) => {
    return values.find(item => item[0] === value);
  };

  return (
    <FormItem>
      {fieldConfigItem?.label && (
        <AutoFormLabel label={fieldConfigItem.label} isRequired={isRequired} />
      )}
      <FormControl>
        <Select
          onValueChange={fieldProps.onChange}
          defaultValue={fieldProps.value}
          {...fieldProps}
        >
          <SelectTrigger className={fieldProps.className}>
            <SelectValue
              placeholder={
                (
                  fieldConfigItem.inputProps as {
                    placeholder?: string;
                  }
                )?.placeholder ?? t('select_option')
              }
            >
              {field.value ? findItem(field.value)?.[1] : t('select_option')}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {values.map(([value, labelFromProps]) => {
              const label = fieldProps.labels?.[value] ?? labelFromProps;

              return (
                <SelectItem value={labelFromProps} key={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </FormControl>
      {fieldConfigItem.description && (
        <AutoFormTooltip
          value={fieldProps.value}
          description={fieldConfigItem.description}
        />
      )}
      <FormMessage />
    </FormItem>
  );
};
