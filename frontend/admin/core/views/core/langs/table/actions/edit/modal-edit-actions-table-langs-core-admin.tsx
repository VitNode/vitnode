import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { DialogFooter, DialogHeader, DialogTitle, useDialog } from '@/components/ui/dialog';
import type { ShowCoreLanguages } from '@/graphql/hooks';
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
import { mutationApi } from './mutation-api';

export const ModalEditActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');
  const { setOpen } = useDialog();

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
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      ...data,
      ...values
    });
    if (mutation.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error')
      });

      return;
    }

    toast(tCore('saved_success'));
    setOpen(false);
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
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
          >
            {t('core.langs.actions.edit.submit')}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
};
