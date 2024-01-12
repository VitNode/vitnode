import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodTextLanguageInputType } from '@/components/text-language-input';
import { Editor } from '@/components/editor/editor';
import { Button } from '@/components/ui/button';
import { mutationApi } from './mutation-api';
import { getIdFormString } from '@/functions/url';

export const ContentCreatePost = () => {
  const t = useTranslations('forum.topics.post');
  const tCore = useTranslations('core');
  const { id } = useParams();

  const formSchema = z.object({
    content: zodTextLanguageInputType.min(1, tCore('forms.empty'))
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      content: values.content,
      topicId: getIdFormString(id)
    });

    if (mutation.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error')
      });

      return;
    }
  };

  return (
    <Form {...form}>
      <form className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  id="post_create"
                  onChange={field.onChange}
                  value={field.value}
                  enableAutoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" loading={form.formState.isSubmitting} className="mt-5">
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
};
