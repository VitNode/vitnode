import { AutoFormComponentProps } from '@/components/form/auto-form';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as z from 'zod';

import { getBaseSchema } from '../utils';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormRadioGroup({
  field,
  label,
  theme,
  description,
  isRequired,
  isDisabled,
  hideOptionalLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zodInputProps: _ZodInputProps,
  overrideOptions,
  labels,
  shape,
  wrapper,
  classNameWrapper,
  ...props
}: {
  labels?: Record<
    string,
    {
      description?: React.ReactNode;
      title: string;
    }
  >;
} & AutoFormComponentProps &
  Omit<React.ComponentProps<typeof RadioGroup>, 'role' | 'variant'>) {
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

  // Move 'none' to the top
  const noneValue = values.find(value => value[0] === 'none');
  if (noneValue) {
    values = values.filter(value => value[0] !== 'none');
    values.unshift(noneValue);
  }

  return (
    <AutoFormWrapper className={classNameWrapper} theme={theme}>
      {label && (
        <AutoFormLabel
          description={description}
          hideOptionalLabel={hideOptionalLabel}
          isRequired={isRequired}
          label={label}
          theme={theme}
        />
      )}

      <AutoFormInputWrapper field={field} Wrapper={wrapper}>
        <FormControl>
          <RadioGroup
            defaultValue={field.value}
            disabled={isDisabled || props?.disabled}
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
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}
