import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { TextLanguageInput } from "@/components/text-language-input";
import { Editor } from "@/components/editor/editor";

export const MainContentCreateEditFormForumAdmin = () => {
  const t = useTranslations("admin.forum.forums.create_edit");
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("name")}</FormLabel>
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
            <FormLabel>{t("desc")}</FormLabel>
            <Editor
              id="forum_create"
              onChange={field.onChange}
              value={field.value}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
