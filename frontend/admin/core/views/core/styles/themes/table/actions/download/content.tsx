import { useTranslations } from "next-intl";
import { DialogDescription } from "@radix-ui/react-dialog";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShowAdminThemes } from "@/utils/graphql/hooks";

export interface DownloadThemeActionsAdminProps
  extends Pick<ShowAdminThemes, "id" | "name" | "version_code" | "version"> {}

export const ContentDownloadThemeActionsAdmin = ({
  id,
  name,
  version,
  version_code
}: DownloadThemeActionsAdminProps) => {
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
        <DialogDescription className="text-muted-foreground text-sm">
          {name}
        </DialogDescription>
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

                  {id !== 1 && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new_version" id="new_version" />
                      <Label htmlFor="new_version">
                        {t("type.new_version")}
                      </Label>
                    </div>
                  )}
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
