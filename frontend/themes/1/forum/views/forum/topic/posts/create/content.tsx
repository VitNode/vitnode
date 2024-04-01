import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Editor } from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { useCreatePost } from "@/hooks/forum/posts/create/use-create-post";

export interface ContentCreatePostProps {
  setOpen: (open: boolean) => void;
}

export const ContentCreatePost = ({
  setOpen
}: ContentCreatePostProps): JSX.Element => {
  const t = useTranslations("forum.topics.post");
  const { form, onSubmit } = useCreatePost({ setOpen });

  return (
    <Form {...form}>
      <form className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }): JSX.Element => (
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
