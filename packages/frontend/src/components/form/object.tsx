import * as z from 'zod';
import { useForm, useFormContext } from 'react-hook-form';

import { Dependency, FieldConfig } from './type';
import resolveDependencies, {
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from './utils';
import { FormField } from '../ui/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoFormObject<T extends z.ZodObject<any, any>>({
  schema,
  form,
  fieldConfig,
  path = [],
  dependencies = [],
  theme,
}: {
  fieldConfig: FieldConfig<z.infer<T>>;
  form: ReturnType<typeof useForm>;
  schema: T | z.ZodEffects<T>;
  theme: 'horizontal' | 'vertical';
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
              key={name}
              schema={item as unknown as T}
              form={form}
              dependencies={dependencies}
              fieldConfig={
                (fieldConfig?.[name] ?? {}) as FieldConfig<z.infer<typeof item>>
              }
              path={[...path, name]}
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
            key={name}
            control={form.control}
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
                  key={key}
                  autoFormProps={{
                    field,
                    fieldConfigItem,
                    isRequired:
                      isRequiredByDependency || zodInputProps.required || false,
                    zodItem: item,
                    theme,
                    isDisabled,
                  }}
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
