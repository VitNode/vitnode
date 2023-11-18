import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShowCoreLanguages } from '@/graphql/hooks';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEditLangsAdminAPI } from './hooks/use-edit-langs-admin-api';

export const ModalEditActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');
  const { isPending, mutateAsync } = useEditLangsAdminAPI();

  const formSchema = z.object({
    name: z
      .string({
        required_error: tCore('forms.empty')
      })
      .min(1, {
        message: tCore('forms.empty')
      }),
    timezone: z
      .string({
        required_error: tCore('forms.empty')
      })
      .min(1, {
        message: tCore('forms.empty')
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      timezone: data.timezone
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutateAsync({
      ...data,
      ...values
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data.name}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('core.langs.actions.edit.name')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('core.langs.actions.edit.timezone')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} loading={isPending}>
            {t('core.langs.actions.edit.submit')}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
};
