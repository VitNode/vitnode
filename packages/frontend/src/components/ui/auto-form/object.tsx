import * as z from 'zod';
import { useForm, useFormContext } from 'react-hook-form';

import resolveDependencies, {
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from './utils';
import { FormField } from '../form';
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './config';
import { Dependency, FieldConfig, FieldConfigItem } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoFormObject<T extends z.ZodObject<any, any>>({
  schema,
  form,
  fieldConfig,
  path = [],
  dependencies = [],
}: {
  form: ReturnType<typeof useForm>;
  schema: T | z.ZodEffects<T>;
  dependencies?: Dependency<z.infer<T>>[];
  fieldConfig?: FieldConfig<z.infer<T>>;
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
        const zodBaseType = getBaseType(item);
        const key = [...path, name].join('.');

        const {
          isHidden,
          isDisabled,
          isRequired: isRequiredByDependency,
          overrideOptions,
        } = resolveDependencies(dependencies, name, watch);

        if (isHidden) return null;

        // Zod array or object

        const fieldConfigItem: FieldConfigItem = fieldConfig?.[name] ?? {};
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
              const inputType =
                fieldConfigItem.fieldType ??
                DEFAULT_ZOD_HANDLERS[zodBaseType] ??
                'fallback';

              const InputComponent =
                typeof inputType === 'function'
                  ? inputType
                  : INPUT_COMPONENTS[inputType];

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
                <div key={`${key}.parent`}>
                  {inputType.toString()} <br />
                  {zodBaseType}
                  <InputComponent
                    zodInputProps={zodInputProps}
                    field={field}
                    fieldConfigItem={fieldConfigItem}
                    label={key}
                    isRequired={isRequired}
                    zodItem={item}
                    fieldProps={fieldProps}
                    className={fieldProps.className}
                  />
                </div>
              );
            }}
          />
        );
      })}
    </>
  );
}
