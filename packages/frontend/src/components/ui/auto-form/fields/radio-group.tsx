import * as z from 'zod';

import { AutoFormInputComponentProps } from '../type';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { getBaseSchema } from '../utils';
import { AutoFormWrapper } from './common/wrapper';

import { FormControl, FormItem, FormLabel, FormMessage } from '../../form';
import { RadioGroup, RadioGroupItem } from '../../radio-group';

export const AutoFormRadioGroup = ({
  autoFormProps: {
    isRequired,
    fieldConfigItem,
    zodItem,
    field,
    theme,
    isDisabled,
  },
  labels,
  ...props
}: AutoFormInputComponentProps &
  Omit<React.ComponentProps<typeof RadioGroup>, 'value'> & {
    labels?: Record<
      string,
      {
        title: string;
        description?: React.ReactNode;
      }
    >;
  }) => {
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
    <AutoFormWrapper theme={theme}>
      {fieldConfigItem?.label && (
        <AutoFormLabel
          label={fieldConfigItem.label}
          isRequired={isRequired}
          theme={theme}
        />
      )}
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          disabled={isDisabled || props.disabled}
          {...props}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {values?.map((value: any) => {
            const label = labels?.[value[0]].title || value[1];
            const description = labels?.[value[0]].description;

            return (
              <FormItem
                key={value}
                className="flex items-center gap-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={value[0]} />
                </FormControl>
                <FormLabel className="flex items-center space-y-0 font-normal">
                  <span>{label}</span>

                  {description && (
                    <span className="text-muted-foreground flex flex-wrap items-center gap-1 text-sm font-normal">
                      {description}
                    </span>
                  )}
                </FormLabel>
              </FormItem>
            );
          })}
        </RadioGroup>
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
