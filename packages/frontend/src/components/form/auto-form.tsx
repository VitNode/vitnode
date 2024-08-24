'use client';

import { AutoFormObject } from '@/components/form/object';
import { cn } from '@/helpers/classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { Dependency, FieldConfig, ZodObjectOrWrapped } from './type';
import { getDefaultValues, getObjectFormSchema } from './utils';

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
  children?: React.ReactNode;
  className?: string;
  dependencies?: Dependency<z.infer<T>>[];
  fieldConfig: FieldConfig<z.infer<T>>;
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
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema, fieldConfig);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const values = form.watch();
  // valuesString is needed because form.watch() returns a new object every time
  const valuesString = JSON.stringify(values);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      await onSubmitProp?.(parsedValues.data as z.infer<T>, form);
    }
  };

  React.useEffect(() => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onValuesChange?.(parsedValues.data as z.infer<T>);
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
          dependencies={dependencies}
          fieldConfig={fieldConfig}
          form={form}
          schema={objectFormSchema}
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
