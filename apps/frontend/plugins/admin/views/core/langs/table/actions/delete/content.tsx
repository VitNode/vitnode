import { useTranslations } from "next-intl";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "vitnode-frontend/components";

import { useDeleteLangAdmin } from "./hooks/use-delete-lang-admin";
import { ShowCoreLanguages } from "@/graphql/hooks";

export const ContentDeleteActionsTableLangsCoreAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, "code" | "name">) => {
  const t = useTranslations("admin.core.langs.actions.delete");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useDeleteLangAdmin({ name, code });

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
                  <span className="text-foreground font-semibold">{name}</span>
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
