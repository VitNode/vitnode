import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  useAlertDialog
} from '@/components/ui/alert-dialog';
import { ShowAdminGroups } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mutationApi } from './mutation-api';
import { useToast } from '@/components/ui/use-toast';
import { usePathname, useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

interface Props {
  data: Pick<ShowAdminGroups, 'id' | 'name'>;
}

export const ContentDeleteGroupsMembersDialogAdmin = ({ data }: Props) => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core');
  const { convertText } = useTextLang();
  const name = convertText(data.name);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setOpen } = useAlertDialog();
  const pathname = usePathname();
  const { push } = useRouter();

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

    const mutation = await mutationApi({ id: data.id });
    if (mutation.error) {
      toast({
        title: tCore('errors.title'),
        description: tCore('errors.internal_server_error'),
        variant: 'destructive'
      });
    } else {
      push(pathname);
      queryClient.refetchQueries({
        queryKey: [APIKeys.GROUPS_MEMBERS_ADMIN]
      });

      toast({
        title: t('success')
      });

      setOpen(false);
    }
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
            loading={form.formState.isSubmitting}
          >
            {t('submit')}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};
