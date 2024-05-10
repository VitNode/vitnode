"use client";

import { useTranslations } from "next-intl";
import { CONFIG } from "@vitnode/shared";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useManifestCoreAdminView } from "./hooks/use-manifest-core-admin-view";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { Admin__Core_Manifest_Metadata__ShowQuery } from "@/graphql/hooks";
import { Input } from "@/components/ui/input";
import { ColorInput } from "@/components/color/color-input";

export const ManifestMetadataCoreAdminView = (
  props: Admin__Core_Manifest_Metadata__ShowQuery
) => {
  const t = useTranslations("admin.core.metadata.manifest");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useManifestCoreAdminView(props);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 sm:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="display"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("display.label")}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {["fullscreen", "standalone", "minimal-ui", "browser"].map(
                    item => (
                      <FormItem
                        key={item}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={item} />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal">
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-expect-error */}
                            {t(`display.${item}.title`)}
                          </FormLabel>
                          <FormDescription>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-expect-error */}
                            {t(`display.${item}.desc`)}
                          </FormDescription>
                        </div>
                      </FormItem>
                    )
                  )}
                </RadioGroup>
              </FormControl>
              <FormDescription>{t("display.desc")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("start_url.label")}</FormLabel>
              <div className="flex gap-1 items-center flex-wrap">
                <span>{CONFIG.frontend_url}</span>
                <FormControl>
                  <Input className="w-64" {...field} />
                </FormControl>
              </div>
              <FormDescription>{t("start_url.desc")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("theme_color.label")}</FormLabel>
              <FormControl>
                <ColorInput {...field} disableRemoveColor />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="background_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("background_color.label")}</FormLabel>
              <FormControl>
                <ColorInput {...field} disableRemoveColor />
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
