'use client';

import { cn } from '@/helpers/classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import * as z from 'zod';

import { Dependency } from '../form/type';
import resolveDependencies, {
  getDefaultValues,
  getObjectFormSchema,
  zodToHtmlInputProps,
} from '../form/utils';
import { Button } from '../ui/button';
import { Form, FormField, FormItem } from '../ui/form';

type Theme = 'horizontal' | 'vertical';

export interface AutoFormItemProps<T extends FieldValues> {
  description: React.ReactNode | string | undefined;
  field: ControllerRenderProps<T>;
  isDisabled: boolean;
  isRequired: boolean;
  label: string | undefined;
  overrideOptions: undefined | z.EnumValues;
  theme: Theme;
  zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export const getShapeFromSchema = (
  schema: z.ZodObject<z.ZodRawShape>,
  id: string,
): z.ZodAny => {
  return schema.shape[id] as z.ZodAny;
};

export function AutoForm<T extends z.ZodObject<z.ZodRawShape>>({
  onSubmit: onSubmitProp,
  formSchema,
  className,
  theme = 'vertical',
  fields,
  dependencies = [],
  submitButton,
  children,
  onValuesChange,
}: {
  children?: React.ReactNode;
  className?: string;
  dependencies?: Dependency<z.infer<T>>[];
  fields: {
    childComponent?: (props: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      field: ControllerRenderProps<Record<string, any>>;
    }) => React.ReactNode;
    component: (
      props: AutoFormItemProps<Record<string, unknown>>,
    ) => JSX.Element;
    componentProps?: Record<string, unknown>;
    description?: React.ReactNode | string;
    id: FieldPath<z.infer<T>>;
    label?: string;
  }[];
  formSchema: T;
  onSubmit?: (
    values: z.infer<T>,
    form: UseFormReturn<z.infer<T>>,
  ) => Promise<void> | void;
  onValuesChange?: (values: Partial<z.infer<T>>) => void;
  submitButton?: (props: {
    disabled: boolean;
    loading: boolean;
    type: 'submit';
  }) => React.ReactNode;
  theme?: 'horizontal' | 'vertical';
}) {
  const t = useTranslations('core');
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues = getDefaultValues(objectFormSchema);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const values = form.watch();
  // valuesString is needed because form.watch() returns a new object every time
  const valuesString = JSON.stringify(values);

  React.useEffect(() => {
    onValuesChange?.(values);
  }, [valuesString]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      await onSubmitProp?.(parsedValues.data as z.infer<T>, form);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn('space-y-6', className, {
          '@container flex flex-col items-start [&>a:last-child]:self-end [&>button:last-child]:self-end':
            theme === 'horizontal',
        })}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map(item => {
          const { isHidden, isDisabled, isRequired, overrideOptions } =
            resolveDependencies(dependencies, item.id, form.watch);
          if (isHidden) return null;

          const ids = item.id.split('.');
          let shape: undefined | z.ZodAny;
          ids.forEach(id => {
            shape = getShapeFromSchema(formSchema, id);
          });
          if (!shape) return null;
          const zodInputProps = zodToHtmlInputProps(shape);

          const Component = item.component;
          const ChildComponent = item.childComponent ?? (() => null);

          return (
            <FormField
              control={form.control}
              key={item.id}
              name={item.id}
              render={({ field }) => {
                return (
                  <>
                    <Component
                      description={item.description}
                      field={field}
                      isDisabled={isDisabled}
                      isRequired={
                        (isRequired || zodInputProps.required) ?? false
                      }
                      label={item.label}
                      overrideOptions={overrideOptions}
                      theme={theme}
                      zodInputProps={zodInputProps}
                      {...item.componentProps}
                    />
                    <ChildComponent field={field} />
                  </>
                );
              }}
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
