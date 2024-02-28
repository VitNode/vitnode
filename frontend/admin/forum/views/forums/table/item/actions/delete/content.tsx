import { useTranslations } from "next-intl";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useDeleteForumAdmin } from "./hooks/use-delete-forum-admin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ForumsSelect } from "@/admin/forum/components/forums-select/forums-select";
import { Button } from "@/components/ui/button";
import type { ShowForumForumsAdmin } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";

export const ContentDeleteActionForumAdmin = ({
  id,
  name
}: Pick<ShowForumForumsAdmin, "id" | "name">) => {
  const t = useTranslations("admin_forum.forums.delete");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useDeleteForumAdmin({ id, name });
  const { convertText } = useTextLang();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AlertDialogHeader>
          <AlertDialogTitle>{tCore("are_your_sure")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.rich("desc", {
              name: () => (
                <span className="font-semibold text-foreground">
                  {convertText(name)}
                </span>
              )
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <FormField
          control={form.control}
          name="move_forums_to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("move_forums_to")}</FormLabel>
              <FormControl>
                <ForumsSelect {...field} exclude={[id]} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="move_topics_to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("move_topics_to")}</FormLabel>
              <FormControl>
                <ForumsSelect {...field} exclude={[id]} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline">
              {tCore("cancel")}
            </Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            type="submit"
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
          >
            {t("submit")}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};
