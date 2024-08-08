import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import * as z from 'zod';

import { AutoFormColor } from './fields/color';
import { AutoFormFile } from './fields/file';
import { AutoFormEnum, FieldPropsAutoFormEnum } from './fields/enum';
import {
  AutoFormRadioGroup,
  FieldPropsAutoFormRadioGroup,
} from './fields/radio-group';
import { AutoFormInput } from './fields/input';
import { AutoFormSwitch } from './fields/switch';
import { AutoFormCheckbox } from './fields/checkbox';
import { AutoFormTextArea } from './fields/textarea';

export type ZodObjectOrWrapped =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | z.ZodEffects<z.ZodObject<any, any>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | z.ZodObject<any, any>;

interface FieldConfigItemRoot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: React.ReactNode | ((value: any) => React.ReactNode);
  label?: string;

  renderParent?: (props: {
    children: React.ReactNode;
  }) => React.ReactElement | null;
}

export type FieldConfigItem = FieldConfigItemRoot &
  (
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormCheckbox>,
        ) => React.ReactNode;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormColor>,
        ) => React.ReactNode;
        inputProps?: React.ComponentProps<typeof AutoFormColor>['fieldProps'];
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormEnum>,
        ) => React.ReactNode;
        inputProps?: FieldPropsAutoFormEnum;
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormFile>,
        ) => React.ReactNode;
        inputProps?: React.ComponentProps<typeof AutoFormFile>['fieldProps'];
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormInput>,
        ) => React.ReactNode;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormRadioGroup>,
        ) => React.ReactNode;
        inputProps?: FieldPropsAutoFormRadioGroup;
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormSwitch>,
        ) => React.ReactNode;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      }
    | {
        fieldType: (
          props: React.ComponentProps<typeof AutoFormTextArea>,
        ) => React.ReactNode;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
      }
  );

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<FieldValues, any>;
  fieldConfigItem: FieldConfigItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldProps: any;
  isRequired: boolean;
  zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  zodItem: z.ZodAny;
  className?: string;
}
