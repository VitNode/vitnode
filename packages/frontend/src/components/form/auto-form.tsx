'use client';

import { cn } from '@/helpers/classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  ControllerRenderProps,
  FieldPath,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { ItemAutoForm } from './fields/utils/item';
import { Dependency, getDefaultValues, getObjectFormSchema } from './utils';

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

export interface AutoFormComponentProps {
  classNameWrapper?: string;
  description: React.ReactNode | string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<Record<string, any>>;
  hideOptionalLabel: boolean | undefined;
  isDisabled: boolean;
  isRequired: boolean;
  label: string | undefined;
  overrideOptions: undefined | z.EnumValues;
  shape: z.ZodAny;
  theme: 'horizontal' | 'vertical';
  wrapper?: (props: {
    children: React.ReactNode; // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<Record<string, any>>;
  }) => React.ReactNode;
  zodInputProps: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export function AutoForm<
  T extends
    | z.ZodEffects<z.ZodObject<z.ZodRawShape>>
    | z.ZodObject<z.ZodRawShape>,
>({
  formSchema,
  fields,
  onSubmit: onSubmitProp,
  className,
  theme = 'vertical',
  dependencies = [],
  submitButton,
  children,
}: {
  children?: React.ReactNode;
  className?: string;
  dependencies?: Dependency<z.infer<T>>[];
  fields: {
    className?: string;
    component: (props: AutoFormComponentProps) => React.ReactNode;
    description?: React.ReactNode | string;
    hideOptionalLabel?: boolean;
    id: FieldPath<z.infer<T>>;
    label?: string;
    wrapper?: (props: {
      children: React.ReactNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      field: ControllerRenderProps<Record<string, any>>;
    }) => React.ReactNode;
  }[];
  formSchema: T;
  onSubmit?: (
    values: z.infer<T>,
    form: UseFormReturn<z.infer<T>>,
  ) => Promise<void> | void;
  submitButton?: (props: {
    disabled: boolean;
    loading: boolean;
    type: 'submit';
  }) => React.ReactNode;
  theme?: 'horizontal' | 'vertical';
}) {
  const t = useTranslations('core.global');
  const objectFormSchema = React.useMemo(
    () => getObjectFormSchema(formSchema),
    [formSchema],
  );
  const defaultValues = React.useMemo(
    () => getDefaultValues(objectFormSchema),
    [objectFormSchema],
  );
  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      await onSubmitProp?.(parsedValues.data as z.infer<T>, form);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn('min-w-0 space-y-6', className, {
          '@container flex flex-col items-start [&>a:last-child]:self-end [&>button:last-child]:self-end':
            theme === 'horizontal',
        })}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map(item => {
          return (
            <ItemAutoForm
              control={form.control}
              dependencies={dependencies}
              formSchema={formSchema}
              key={item.id}
              theme={theme}
              watch={form.watch}
              {...item}
            />
          );
        })}

        {children}
        {submitButton ? (
          submitButton({
            disabled: !form.formState.isValid,
            loading: form.formState.isSubmitting,
            type: 'submit',
          })
        ) : (
          <Button
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {t('save')}
          </Button>
        )}
      </form>
    </Form>
  );
}
