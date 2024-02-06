import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const ContentContentCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations("admin.members.groups.create_edit.form");
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="test"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("name.label")} + test</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
