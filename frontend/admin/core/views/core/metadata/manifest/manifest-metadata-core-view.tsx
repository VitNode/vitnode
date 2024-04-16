"use client";

import { useTranslations } from "next-intl";

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

export const ManifestMetadataCoreView = () => {
  const t = useTranslations("admin.core.metadata.manifest");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useManifestCoreAdminView();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="display"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("display.label")}</FormLabel>
              <FormDescription>{t("display.desc")}</FormDescription>
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
