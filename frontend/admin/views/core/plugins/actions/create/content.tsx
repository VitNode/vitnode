import { useTranslations } from 'next-intl';

import { DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useCreatePluginAdmin } from './hooks/use-create-plugin-admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ContentCreateActionsPluginsAdmin = () => {
  const t = useTranslations('admin.core.plugins.create');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useCreatePluginAdmin();

  return (
    <>
      <DialogTitle>{t('title')}</DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t('name.desc')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('code.label')}</FormLabel>
                <FormControl>
                  <Input placeholder="vitnode-plugin-example" {...field} />
                </FormControl>
                <FormDescription>{t('code.desc')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="support_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('support_url.label')}</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormDescription>{t('support_url.desc')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('author.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('author_url.label')}</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {tCore('create')}
          </Button>
        </form>
      </Form>
    </>
  );
};
