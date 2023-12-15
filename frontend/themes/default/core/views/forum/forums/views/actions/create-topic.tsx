import { useTranslations } from 'next-intl';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TextLanguageInput } from '@/components/text-language-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Editor } from '@/components/editor/editor';
import { Button } from '@/components/ui/button';
import { useCreateTopic } from '@/hooks/forums/forum/topic/use-create-topic';

export const CreateTopic = () => {
  const t = useTranslations('forum.topics.create');
  const tCore = useTranslations('core');

  const { form, onSubmit } = useCreateTopic();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.title')}</FormLabel>
                <FormControl>
                  <TextLanguageInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.content')}</FormLabel>
                <FormControl>
                  <Editor id="topic_create" onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!form.formState.isValid} type="submit">
            {tCore('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
