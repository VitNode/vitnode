import { FormField } from '@/components/ui/form';
import React from 'react';
import { Control, FieldPath, FieldValues, UseFormWatch } from 'react-hook-form';
import * as z from 'zod';

import { AutoFormComponentProps } from '../../auto-form';
import resolveDependencies, {
  Dependency,
  getShapeFromSchema,
  zodToHtmlInputProps,
} from '../../utils';

export function ItemAutoForm<
  T extends
    | z.ZodEffects<z.ZodObject<z.ZodRawShape>>
    | z.ZodObject<z.ZodRawShape>,
>({
  component,
  label,
  description,
  id,
  control,
  theme,
  watch,
  dependencies,
  hideOptionalLabel,
  formSchema,
  wrapper,
}: {
  component: (props: AutoFormComponentProps) => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Record<string, any>> | undefined;
  dependencies: Dependency<z.infer<T>>[];
  description?: React.ReactNode | string;
  formSchema: T;
  hideOptionalLabel?: boolean;
  id: FieldPath<z.infer<T>>;
  label?: string;
  theme: 'horizontal' | 'vertical';
  watch: UseFormWatch<FieldValues>;
  wrapper?: (props: { children: React.ReactNode }) => React.ReactNode;
}) {
  const { isHidden, isDisabled, isRequired, overrideOptions } =
    resolveDependencies(dependencies, id, watch);
  if (isHidden) return null;

  let shape: null | z.ZodAny = null;
  const ids = id.split('.');
  for (const id of ids) {
    shape = getShapeFromSchema(
      shape ? (shape as unknown as z.ZodObject<z.ZodRawShape>) : formSchema,
      id,
    );
  }

  if (!shape) return null;
  const zodInputProps = zodToHtmlInputProps(shape);

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => {
        return (
          <>
            {component({
              field,
              label,
              theme,
              description,
              isRequired,
              isDisabled,
              hideOptionalLabel,
              overrideOptions,
              zodInputProps,
              shape,
              wrapper,
            })}
          </>
        );
      }}
    />
  );
}
