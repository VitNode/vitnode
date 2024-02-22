import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useDownloadThemeAdmin } from "./hooks/use-download-theme-admin";
import { Input } from "@/components/ui/input";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ActionsItemThemesAdminProps } from "../actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/functions/classnames";

export const ContentDownloadThemeActionsAdmin = ({
  id,
  version,
  version_code
}: ActionsItemThemesAdminProps) => {
  const { form, onSubmit } = useDownloadThemeAdmin({
    id,
    version,
    version_code
  });
  const t = useTranslations("admin.core.styles.themes.download");

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {version_code && (
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rebuild" id="rebuild" />
                    <Label htmlFor="rebuild">
                      {t("type.rebuild", {
                        version: `${version} (${version_code})`
                      })}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="new_version"
                      id="new_version"
                      disabled={id === 1}
                    />
                    <Label
                      htmlFor="new_version"
                      className={cn({
                        "opacity-50": id === 1
                      })}
                    >
                      {t("type.new_version")}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          )}

          {form.watch("type") === "new_version" && (
            <>
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("version.label")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("version_code.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={version_code ? version_code + 1 : 1}
                        {...field}
                      />
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
              {t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
