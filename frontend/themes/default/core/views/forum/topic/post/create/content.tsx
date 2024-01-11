import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodTextLanguageInputType } from '@/components/text-language-input';
import { Editor } from '@/components/editor/editor';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
}

export const ContentCreatePost = ({ className }: Props) => {
  const t = useTranslations('forum.topics.post');
  const tCore = useTranslations('core');

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
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button type="submit" className="mt-5">
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
};
