import { useTranslations } from "next-intl";

import type { ActionsItemThemesAdminProps } from "../actions";
import { useEditThemeAdmin } from "./hooks/use-edit-theme-admin";
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
import { CONFIG } from "@/config";

export const ContentEditThemeActionsAdmin = (
  props: ActionsItemThemesAdminProps
) => {
  const t = useTranslations("admin.core.styles.themes");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useEditThemeAdmin(props);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("edit.title")}</DialogTitle>
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
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t("create.name.desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {CONFIG.node_development && (
            <>
              <FormField
                control={form.control}
                name="support_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("create.support_url.label")}</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("create.support_url.desc")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("create.author.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("create.author_url.label")}</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {tCore("edit")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
