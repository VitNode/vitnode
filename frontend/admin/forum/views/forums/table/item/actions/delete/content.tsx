import { useTranslations } from "next-intl";

import {
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useDeleteForumAdmin } from "./hooks/use-delete-forum-admin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { ForumsSelect } from "@/admin/forum/components/forums-select/forums-select";

export const ContentDeleteActionForumAdmin = () => {
  // const t = useTranslations("admin_forum.forums.delete");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useDeleteForumAdmin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{tCore("are_your_sure")}</AlertDialogTitle>
        </AlertDialogHeader>

        <FormField
          control={form.control}
          name="move_forums_to"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ForumsSelect {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
