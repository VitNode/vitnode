"use client";

import { useTranslations } from "next-intl";

import { CONFIG } from "@/config";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFieldRender,
  FormItem,
  FormLabel,
  FormWrapper
} from "@/components/ui/form";
import { useManifestCoreAdminView } from "./hooks/use-manifest-core-admin-view";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Admin__Core_Manifest_Metadata__ShowQuery } from "@/graphql/hooks";
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
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="display"
          render={({ field }) => (
            <FormFieldRender
              label={t("display.label")}
              description={t("display.desc")}
            >
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
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="start_url"
          render={({ field }) => (
            <FormFieldRender
              label={t("start_url.label")}
              description={t("start_url.desc")}
            >
              <div className="flex gap-1 items-center flex-wrap">
                <span>{CONFIG.frontend_url}</span>
                <FormControl>
                  <Input className="w-64" {...field} />
                </FormControl>
              </div>
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="theme_color"
          render={({ field }) => (
            <FormFieldRender label={t("theme_color.label")}>
              <ColorInput {...field} disableRemoveColor />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="background_color"
          render={({ field }) => (
            <FormFieldRender label={t("background_color.label")}>
              <ColorInput {...field} disableRemoveColor />
            </FormFieldRender>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {tCore("save")}
        </Button>
      </FormWrapper>
    </Form>
  );
};
