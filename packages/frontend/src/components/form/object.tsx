import { useForm, useFormContext } from 'react-hook-form';
import * as z from 'zod';

import { FormField } from '../ui/form';
import { Dependency, FieldConfig } from './type';
import resolveDependencies, {
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoFormObject<T extends z.ZodObject<any, any>>({
  schema,
  form,
  fieldConfig,
  path = [],
  dependencies = [],
  theme,
}: {
  dependencies?: Dependency<z.infer<T>>[];
  fieldConfig: FieldConfig<z.infer<T>>;
  form: ReturnType<typeof useForm>;
  path?: string[];
  schema: T | z.ZodEffects<T>;
  theme: 'horizontal' | 'vertical';
}) {
  const { watch } = useFormContext();
  const { shape } = getBaseSchema<T>(schema) ?? {};
  if (!shape) return null;

  return (
    <>
      {Object.keys(shape as object).map(name => {
        let item = shape[name] as z.ZodAny;
        const zodBaseType = getBaseType(item);
        const key = [...path, name].join('.');

        const {
          isHidden,
          isDisabled,
          isRequired: isRequiredByDependency,
          overrideOptions,
        } = resolveDependencies(dependencies, key, watch);
        if (isHidden) return null;

        // Zod array or object
        if (zodBaseType === 'ZodObject') {
          return (
            <AutoFormObject
              dependencies={dependencies}
              fieldConfig={
                (fieldConfig[name] ?? {}) as FieldConfig<z.infer<typeof item>>
              }
              form={form}
              key={name}
              path={[...path, name]}
              schema={item as unknown as T}
              theme={theme}
            />
          );
        }

        const fieldConfigItem = fieldConfig[name];
        if (!fieldConfigItem) return;

        const zodInputProps = zodToHtmlInputProps(item);

        if (overrideOptions) {
          item = z.enum(overrideOptions) as unknown as z.ZodAny;
        }

        return (
          <FormField
            control={form.control}
            key={name}
            name={key}
            render={({ field }) => {
              const InputComponent = fieldConfigItem.fieldType;

              if (
                InputComponent === undefined ||
                typeof InputComponent !== 'function'
              ) {
                return <></>;
              }

              return (
                <InputComponent
                  autoFormProps={{
                    field,
                    fieldConfigItem,
                    isRequired:
                      (isRequiredByDependency || zodInputProps.required) ??
                      false,
                    zodItem: item,
                    theme,
                    isDisabled,
                  }}
                  key={key}
                  {...zodToHtmlInputProps(item)}
                />
              );
            }}
          />
        );
      })}
    </>
  );
}
