'use client';

import { DefaultValues, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Dependency, FieldConfig, ZodObjectOrWrapped } from './type';
import { getDefaultValues, getObjectFormSchema } from './utils';
import { Form } from '../form';
import { AutoFormObject } from './object';
import { Button } from '../button';

export function AutoForm<T extends ZodObjectOrWrapped>({
  values: valuesProp,
  formSchema,
  fieldConfig,
  dependencies,
}: {
  formSchema: T;
  dependencies?: Dependency<z.infer<T>>[];
  fieldConfig?: FieldConfig<z.infer<T>>;
  values?: Partial<z.infer<T>>;
}) {
  const t = useTranslations('core');
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema, fieldConfig);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      // onSubmitProp?.(parsedValues.data);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <AutoFormObject
          schema={objectFormSchema}
          form={form}
          dependencies={dependencies}
          fieldConfig={fieldConfig}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
