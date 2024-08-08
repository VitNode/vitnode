import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import * as z from 'zod';

export type ZodObjectOrWrapped =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | z.ZodEffects<z.ZodObject<any, any>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | z.ZodObject<any, any>;

export interface FieldConfigItem {
  fieldType: (props: AutoFormInputComponentProps) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: React.ReactNode | ((value: any) => React.ReactNode);
  label?: string;

  renderParent?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldConfig<T extends z.infer<z.ZodObject<any, any>>> = {
  [Key in keyof T]?: FieldConfigItem;
};

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BaseDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> {
  sourceField: keyof SchemaType;
  targetField: keyof SchemaType;
  type: DependencyType;
  when: (sourceFieldValue: unknown, targetFieldValue: unknown) => boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  BaseDependency<SchemaType> & {
    type:
      | DependencyType.DISABLES
      | DependencyType.HIDES
      | DependencyType.REQUIRES;
  };

export type EnumValues = readonly [string, ...string[]];

export type OptionsDependency<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SchemaType extends z.infer<z.ZodObject<any, any>>,
> = BaseDependency<SchemaType> & {
  // Partial array of values from sourceField that will trigger the dependency
  options: EnumValues;

  type: DependencyType.SETS_OPTIONS;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  | OptionsDependency<SchemaType>
  | ValueDependency<SchemaType>;

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export interface AutoFormInputComponentProps {
  autoFormProps: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<FieldValues, any>;
    fieldConfigItem: FieldConfigItem;
    isRequired: boolean;
    theme: 'horizontal' | 'vertical';
    zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
    zodItem: z.ZodAny;
  };
}
