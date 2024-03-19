import { useTranslations } from "next-intl";

import {
  useCreateEditNavAdmin,
  type CreateEditNavAdminArgs
} from "./hooks/use-create-edit-nav-admin";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextLanguageInput } from "@/components/text-language-input";
import { Switch } from "@/components/ui/switch";
import { IconInput } from "@/components/icon/input/icon-input";

export const ContentCreateEditNavAdmin = ({ data }: CreateEditNavAdminArgs) => {
  const t = useTranslations("admin.core.styles.nav");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useCreateEditNavAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t("edit.title") : t("create.title")}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.name.label")}</FormLabel>
                <FormControl>
                  <TextLanguageInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>{t("create.description.label")}</FormLabel>
                <FormControl>
                  <TextLanguageInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.href.label")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t("create.href.desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>Icon</FormLabel>
                <FormControl>
                  <IconInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="external"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {t("create.external.label")}
                  </FormLabel>
                  <FormDescription>{t("create.external.desc")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {tCore(data ? "edit" : "create")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
