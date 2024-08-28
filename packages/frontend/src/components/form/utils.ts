import { DefaultValues, FieldValues, UseFormWatch } from 'react-hook-form';
import * as z from 'zod';

import {
  Dependency,
  DependencyType,
  FieldConfig,
  ZodObjectOrWrapped,
} from './type';

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): z.ZodObject<any, any> {
  if (schema._def.typeName === 'ZodEffects') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>;

    return getObjectFormSchema(typedSchema._def.schema);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return schema as z.ZodObject<any, any>;
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<
  ChildType extends z.AnyZodObject | z.ZodAny = z.ZodAny,
>(
  schema: ChildType | z.ZodEffects<ChildType>,
  isArray?: boolean,
): ChildType | null {
  if ('innerType' in schema._def) {
    return getBaseSchema(schema._def.innerType as ChildType);
  }
  if ('schema' in schema._def) {
    return getBaseSchema(schema._def.schema);
  }

  if ('type' in schema._def && isArray) {
    return getBaseSchema(schema._def.type as ChildType);
  }

  return schema as ChildType;
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export const getBaseType = (schema: z.ZodAny): string => {
  const baseSchema = getBaseSchema(schema);

  return baseSchema ? baseSchema._def.typeName : '';
};

/**
 * Convert a Zod schema to HTML input props to give direct feedback to the user.
 * Once submitted, the schema will be validated completely.
 */
export function zodToHtmlInputProps(
  schema:
    | z.ZodAny
    | z.ZodNumber
    | z.ZodOptional<z.ZodNumber | z.ZodString>
    | z.ZodString,
): React.InputHTMLAttributes<HTMLInputElement> {
  if (['ZodNullable', 'ZodOptional'].includes(schema._def.typeName as string)) {
    const typedSchema = schema as z.ZodOptional<z.ZodNumber | z.ZodString>;

    return {
      ...zodToHtmlInputProps(typedSchema._def.innerType),
      required: false,
    };
  }
  const typedSchema = schema as z.ZodNumber | z.ZodString;

  if (!('checks' in typedSchema._def)) {
    return {
      required: true,
    };
  }

  const { checks } = typedSchema._def;
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    required: true,
  };
  const type = getBaseType(schema as z.ZodAny);

  for (const check of checks) {
    if (check.kind === 'min') {
      if (type === 'ZodString') {
        inputProps.minLength = check.value;
      } else {
        inputProps.min = check.value;
      }
    }
    if (check.kind === 'max') {
      if (type === 'ZodString') {
        inputProps.maxLength = check.value;
      } else {
        inputProps.max = check.value;
      }
    }
  }

  return inputProps;
}

export default function resolveDependencies<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SchemaType extends z.infer<z.ZodObject<any, any>>,
>(
  dependencies: Dependency<SchemaType>[],
  currentFieldName: keyof SchemaType,
  watch: UseFormWatch<FieldValues>,
) {
  let isDisabled = false;
  let isHidden = false;
  let isRequired = false;
  let overrideOptions: undefined | z.EnumValues;

  const currentFieldValue = watch(currentFieldName as string);

  const currentFieldDependencies = dependencies.filter(
    dependency => dependency.targetField === currentFieldName,
  );

  for (const dependency of currentFieldDependencies) {
    const watchedValue = watch(dependency.sourceField as string);

    const conditionMet = dependency.when(watchedValue, currentFieldValue);

    switch (dependency.type) {
      case DependencyType.DISABLES:
        if (conditionMet) {
          isDisabled = true;
        }
        break;
      case DependencyType.REQUIRES:
        if (conditionMet) {
          isRequired = true;
        }
        break;
      case DependencyType.HIDES:
        if (conditionMet) {
          isHidden = true;
        }
        break;
      case DependencyType.SETS_OPTIONS:
        if (conditionMet) {
          overrideOptions = dependency.options;
        }
        break;
    }
  }

  return {
    isDisabled,
    isHidden,
    isRequired,
    overrideOptions,
  };
}

/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString
  >;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typedSchema._def.typeName === z.ZodFirstPartyTypeKind.ZodDefault) {
    return typedSchema._def.defaultValue();
  }

  if ('innerType' in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny,
    );
  }
  if ('schema' in typedSchema._def) {
    return getDefaultValueInZodStack(
      (
        typedSchema._def as {
          schema: z.ZodAny;
        }
      ).schema,
    );
  }

  return undefined;
}

/**
 * Get all default values from a Zod schema.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema,
) {
  const { shape } = schema;
  type DefaultValuesType = DefaultValues<Partial<z.infer<Schema>>>;
  const defaultValues = {} as DefaultValuesType;
  if (!shape) return defaultValues;

  for (const key of Object.keys(shape as object)) {
    const item = shape[key] as z.ZodAny;

    if (getBaseType(item) === 'ZodObject') {
      const defaultItems = getDefaultValues(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getBaseSchema(item) as unknown as z.ZodObject<any, any>,
      );

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (defaultItems !== null) {
        const obj: Record<string, unknown> = {};

        for (const defaultItemKey of Object.keys(defaultItems)) {
          obj[defaultItemKey] = defaultItems[defaultItemKey];
          defaultValues[key as keyof DefaultValuesType] = obj as DefaultValues<
            Partial<z.TypeOf<Schema>>
          >[keyof DefaultValues<Partial<z.TypeOf<Schema>>>];
        }
      }
    } else {
      const defaultValue = getDefaultValueInZodStack(item);

      if (defaultValue !== undefined) {
        defaultValues[key as keyof DefaultValuesType] = defaultValue;
      }
    }
  }

  return defaultValues;
}
