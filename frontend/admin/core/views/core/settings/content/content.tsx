"use client";

import { useTranslations } from "next-intl";

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
import { useSettingsCoreAdmin } from "./hooks/use-settings-core-admin";
import type { Admin__Settings__General__ShowQuery } from "@/graphql/hooks";

export const ContentSettingsCoreAdmin = (
  props: Admin__Settings__General__ShowQuery
) => {
  const t = useTranslations("admin");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useSettingsCoreAdmin(props);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("core.general.main.form.name.label")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" loading={form.formState.isSubmitting}>
          {tCore("save")}
        </Button>
      </form>
    </Form>
  );
};
