import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/hooks/forum/posts/create/use-create-post";
import { Editor } from "@/components/editor/editor";

export const ContentCreatePost = () => {
  const t = useTranslations("forum.topics.post");
  const { form, onSubmit } = useCreatePost();

  // TODO: Add placeholder to Editor
  // t('placeholder')

  return (
    <Form {...form}>
      <form className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          className="mt-5"
        >
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};
