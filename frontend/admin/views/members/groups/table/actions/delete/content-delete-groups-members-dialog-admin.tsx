import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ShowAdminGroups } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDeleteGroupAdminAPI } from './hooks/use-delete-group-admin-api';
import { Button } from '@/components/ui/button';

interface Props {
  data: Pick<ShowAdminGroups, 'id' | 'name'>;
}

export const ContentDeleteGroupsMembersDialogAdmin = ({ data }: Props) => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core');
  const { convertText } = useTextLang();
  const name = convertText(data.name);
  const { isPending, mutateAsync } = useDeleteGroupAdminAPI();

  const formSchema = z.object({
    name: z.string().refine(value => value === name)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name !== name) return;

    await mutateAsync({ id: data.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{tCore('are_you_absolutely_sure')}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-4">
            <p>{t('text')}</p>
            <p>
              {t.rich('form_confirm_text', {
                text: () => <span className="font-semibold text-foreground">{name}</span>
              })}
            </p>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline">
              {tCore('cancel')}
            </Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            type="submit"
            disabled={!form.formState.isValid}
            loading={isPending}
          >
            {t('submit')}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};
