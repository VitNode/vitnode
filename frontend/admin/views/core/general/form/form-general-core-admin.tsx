'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const FormGeneralCoreAdmin = () => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');

  const formSchema = z.object({
    name: z.string().nonempty({
      message: tCore('forms.empty')
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Connect with API
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Form {...form}>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:max-w-2xl">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('core.general.main.form.name.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{tCore('save')}</Button>
        </form>
      </CardContent>
    </Form>
  );
};
