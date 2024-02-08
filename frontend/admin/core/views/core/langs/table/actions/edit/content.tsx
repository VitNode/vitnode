import { useTranslations } from "next-intl";

import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { ShowCoreLanguages } from "@/graphql/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditLangAdmin } from "./hooks/use-edit-lang-admin";

export const ContentEditActionsTableLangsCoreAdmin = (
  data: ShowCoreLanguages
) => {
  const t = useTranslations("admin.core.langs.actions.edit");
  const { form, onSubmit } = useEditLangAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data.name}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("timezone")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <DialogFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
          >
            {t("submit")}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
};
