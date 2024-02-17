import { useTranslations } from "next-intl";

import { useCreateEditLangAdmin } from "./hooks/use-create-edit-lang-admin";
import type { ShowCoreLanguages } from "@/graphql/hooks";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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

interface Props {
  data?: ShowCoreLanguages;
}

export const CreateEditLangAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.langs.actions");
  const { form, onSubmit } = useCreateEditLangAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? data.name : "test"}</DialogTitle>
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
                <FormLabel>{t("create.name")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!data && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("create.code")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.timezone")}</FormLabel>
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
            {t(data ? "edit.submit" : "create.submit")}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
};
