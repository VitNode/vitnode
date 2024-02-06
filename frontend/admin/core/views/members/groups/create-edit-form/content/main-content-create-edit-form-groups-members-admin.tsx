import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { TextLanguageInput } from "@/components/text-language-input";
import { Separator } from "@/components/ui/separator";
import { IconPickerInput } from "@/components/icon-pick-input/icon-pick-input";

export const MainContentCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations("admin.members.groups.create_edit.form");
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("name.label")}</FormLabel>
            <FormControl>
              <TextLanguageInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />

      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <IconPickerInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
