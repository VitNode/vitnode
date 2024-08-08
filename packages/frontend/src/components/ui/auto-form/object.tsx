import * as z from 'zod';
import { useForm, useFormContext } from 'react-hook-form';

import resolveDependencies, {
  getBaseSchema,
  zodToHtmlInputProps,
} from './utils';
import { FormField } from '../form';
import { Dependency, FieldConfig } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoFormObject<T extends z.ZodObject<any, any>>({
  schema,
  form,
  fieldConfig,
  path = [],
  dependencies = [],
}: {
  fieldConfig: FieldConfig<z.infer<T>>;
  form: ReturnType<typeof useForm>;
  schema: T | z.ZodEffects<T>;
  dependencies?: Dependency<z.infer<T>>[];
  path?: string[];
}) {
  const { watch } = useFormContext();
  if (!schema) return null;
  const { shape } = getBaseSchema<T>(schema) || {};
  if (!shape) return null;

  return (
    <>
      {Object.keys(shape).map(name => {
        let item = shape[name] as z.ZodAny;
        // const zodBaseType = getBaseType(item);
        const key = [...path, name].join('.');

        const {
          isHidden,
          isDisabled,
          isRequired: isRequiredByDependency,
          overrideOptions,
        } = resolveDependencies(dependencies, name, watch);

        if (isHidden) return null;

        // Zod array or object

        const fieldConfigItem = fieldConfig[name];
        if (!fieldConfigItem) {
          return;
        }

        const zodInputProps = zodToHtmlInputProps(item);
        const isRequired =
          isRequiredByDependency || zodInputProps.required || false;

        if (overrideOptions) {
          item = z.enum(overrideOptions) as unknown as z.ZodAny;
        }

        return (
          <FormField
            key={name}
            control={form.control}
            name={key}
            render={({ field }) => {
              const InputComponent = fieldConfigItem.fieldType;

              const value = field.value ?? '';

              const fieldProps = {
                ...zodToHtmlInputProps(item),
                ...field,
                ...fieldConfigItem.inputProps,
                disabled: fieldConfigItem.inputProps?.disabled || isDisabled,
                ref: undefined,
                value: value,
              };

              if (InputComponent === undefined) {
                return <></>;
              }

              return (
                <InputComponent
                  key={key}
                  zodInputProps={zodInputProps}
                  field={field}
                  fieldConfigItem={fieldConfigItem}
                  isRequired={isRequired}
                  zodItem={item}
                  // Override the fieldProps with the fieldProps from the fieldConfigItem
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  fieldProps={fieldProps as any}
                  className={fieldProps.className}
                />
              );
            }}
          />
        );
      })}
    </>
  );
}
