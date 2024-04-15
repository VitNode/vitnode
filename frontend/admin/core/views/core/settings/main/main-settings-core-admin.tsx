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
import type { Core_Main_Settings__ShowQuery } from "@/graphql/hooks";
import { TextLanguageInput } from "@/components/text-language-input";

export const MainSettingsCoreAdmin = (props: Core_Main_Settings__ShowQuery) => {
  const t = useTranslations("admin.core.settings.main");
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
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{t("description.label")}</FormLabel>
              <FormControl>
                <TextLanguageInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="copyright"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("copyright.label")}</FormLabel>
              <FormControl>
                <TextLanguageInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {tCore("save")}
        </Button>
      </form>
    </Form>
  );
};
