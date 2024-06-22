import { useTranslations } from "next-intl";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShowAdminGroups } from "@/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDeleteGroupAdmin } from "./hooks/use-delete-group-admin";

export const ContentDeleteGroupsMembersDialogAdmin = ({
  id,
  name,
}: Pick<ShowAdminGroups, "id" | "name">) => {
  const t = useTranslations("admin.members.groups.delete");
  const tCore = useTranslations("core");
  const { convertText } = useTextLang();
  const formatName = convertText(name);
  const { form, onSubmit } = useDeleteGroupAdmin({ name, id });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {tCore("are_you_absolutely_sure")}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-4">
            <p>{t("text")}</p>
            <p>
              {t.rich("form_confirm_text", {
                text: () => (
                  <span className="text-foreground font-semibold">
                    {formatName}
                  </span>
                ),
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
