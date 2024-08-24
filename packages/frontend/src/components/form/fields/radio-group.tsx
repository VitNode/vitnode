import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as z from 'zod';

import { AutoFormInputComponentProps } from '../type';
import { getBaseSchema } from '../utils';
import { DefaultParent } from './common/children';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

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
}: {
  labels?: Record<
    string,
    {
      description?: React.ReactNode;
      title: string;
    }
  >;
} & AutoFormInputComponentProps &
  React.ComponentProps<typeof RadioGroup>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues as object);
  } else {
    values = baseValues.map(value => [value, value]);
  }

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
          <RadioGroup
            defaultValue={field.value}
            disabled={isDisabled || props.disabled}
            onValueChange={field.onChange}
            {...props}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {values.map((value: any) => {
              const label = labels?.[value[0]]?.title ?? value[1];
              const description = labels?.[value[0]]?.description;

              return (
                <FormItem
                  className="flex items-center gap-3 space-y-0"
                  key={value}
                >
                  <FormControl>
                    <RadioGroupItem value={value[0]} />
                  </FormControl>
                  <FormLabel className="flex items-center space-y-0 font-normal">
                    <span>{label}</span>

                    {description && (
                      <span className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1 text-sm font-normal">
                        {description}
                      </span>
                    )}
                  </FormLabel>
                </FormItem>
              );
            })}
          </RadioGroup>
        </FormControl>
      </ParentWrapper>
      {fieldConfigItem.description && theme === 'vertical' && (
        <AutoFormTooltip description={fieldConfigItem.description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
};
