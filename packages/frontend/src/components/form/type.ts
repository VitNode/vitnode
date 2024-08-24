import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import * as z from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ZodObjectOrWrapped = z.Schema<any, any>;

export interface FieldRenderParentProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<FieldValues, any>;
}

export interface FieldConfigItem {
  description?: React.ReactNode;
  fieldType: (props: AutoFormInputComponentProps) => React.ReactNode;
  label?: string;

  renderParent?: (props: FieldRenderParentProps) => null | React.ReactElement;
}

export type FieldConfig<T extends FieldValues> = {
  // If SchemaType.key is an object or array, create a nested FieldConfig, otherwise
  [Key in keyof T]?: T[Key] extends object
    ? FieldConfig<z.infer<T[Key]>>
    : FieldConfigItem;
};

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

interface BaseDependency<T extends FieldValues> {
  sourceField: keyof T | string;
  targetField: keyof T | string;
  type: DependencyType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  when: (sourceFieldValue: any, targetFieldValue: unknown) => boolean;
}

export type ValueDependency<T extends FieldValues> = {
  type:
    | DependencyType.DISABLES
    | DependencyType.HIDES
    | DependencyType.REQUIRES;
} & BaseDependency<T>;

export type EnumValues = readonly [string, ...string[]];

export type OptionsDependency<T extends FieldValues> = {
  // Partial array of values from sourceField that will trigger the dependency
  options: EnumValues;

  type: DependencyType.SETS_OPTIONS;
} & BaseDependency<T>;

export type Dependency<T extends FieldValues> =
  | OptionsDependency<T>
  | ValueDependency<T>;

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export interface AutoFormInputComponentProps {
  autoFormProps: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<FieldValues, any>;
    fieldConfigItem: Omit<FieldConfigItem, 'fieldType'>;
    isDisabled: boolean;
    isRequired: boolean;
    theme: 'horizontal' | 'vertical';
    zodItem: z.ZodAny;
  };
}
