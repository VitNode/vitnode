import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { ColorInput } from "@/components/color/color-input";
import { TextLanguageInput } from "@/components/text-language-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const MainTabCreateEditCategoryBlogAdmin = () => {
  const t = useTranslations("blog.admin.categories");
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("create.name.label")}</FormLabel>
            <FormControl>
              <TextLanguageInput {...field} />
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
            <FormLabel optional>{t("create.description.label")}</FormLabel>
            <FormControl>
              <TextLanguageInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel optional>{t("create.color.label")}</FormLabel>
            <FormControl>
              <ColorInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
