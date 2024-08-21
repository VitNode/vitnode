'use client';

import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { cn } from '@/helpers/classnames';
import { AutoFormObject } from '@/components/form/object';
import { getDefaultValues, getObjectFormSchema } from './utils';
import { Dependency, FieldConfig, ZodObjectOrWrapped } from './type';

export function AutoForm<T extends ZodObjectOrWrapped>({
  formSchema,
  fieldConfig,
  dependencies,
  onSubmit: onSubmitProp,
  submitButton,
  children,
  className,
  theme = 'vertical',
  onValuesChange,
}: {
  fieldConfig: FieldConfig<z.infer<T>>;
  formSchema: T;
  children?: React.ReactNode;
  className?: string;
  dependencies?: Dependency<z.infer<T>>[];
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
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema, fieldConfig);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
  });
  const values = form.watch();
  // valuesString is needed because form.watch() returns a new object every time
  const valuesString = JSON.stringify(values);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      await onSubmitProp?.(parsedValues.data, form);
    }
  };

  React.useEffect(() => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onValuesChange?.(parsedValues.data);
    }
  }, [valuesString]);

  return (
    <Form {...form}>
      <form
        className={cn('space-y-6', className, {
          '@container flex flex-col items-start [&>a:last-child]:self-end [&>button:last-child]:self-end':
            theme === 'horizontal',
        })}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AutoFormObject
          schema={objectFormSchema}
          form={form}
          dependencies={dependencies}
          fieldConfig={fieldConfig}
          theme={theme}
        />
        {children}
        {submitButton ? (
          submitButton({
            disabled: !form.formState.isValid,
            loading: form.formState.isSubmitting,
            type: 'submit',
          })
        ) : (
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
          >
            {t('save')}
          </Button>
        )}
      </form>
    </Form>
  );
}
