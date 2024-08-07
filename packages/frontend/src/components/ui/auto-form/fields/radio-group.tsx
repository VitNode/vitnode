import * as z from 'zod';

import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { getBaseSchema } from '../utils';

import { FormControl, FormItem, FormLabel, FormMessage } from '../../form';
import { RadioGroup, RadioGroupItem } from '../../radio-group';

export const AutoFormRadioGroup = ({
  isRequired,
  fieldConfigItem,
  zodItem,
  fieldProps,
}: AutoFormInputComponentProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map(value => [value, value]);
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {fieldConfigItem?.label && (
          <AutoFormLabel
            label={fieldConfigItem.label}
            isRequired={isRequired}
          />
        )}
        <FormControl>
          <RadioGroup
            onValueChange={fieldProps.onChange}
            defaultValue={fieldProps.value}
            {...fieldProps}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {values?.map((value: any) => (
              <FormItem
                key={value}
                className="mb-2 flex items-center gap-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={value[0]} />
                </FormControl>
                <FormLabel className="font-normal">{value[1]}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        {fieldConfigItem.description && (
          <AutoFormTooltip description={fieldConfigItem.description} />
        )}
        <FormMessage />
      </FormItem>
    </div>
  );
};
