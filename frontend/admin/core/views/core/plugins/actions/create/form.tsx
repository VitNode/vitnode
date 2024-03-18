import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<{
    author: string;
    author_url: string;
    code: string;
    description: string;
    name: string;
    support_url: string;
  }>;
  isEdit?: boolean;
}

export const FormCreateEditPluginAdmin = ({ form, isEdit }: Props) => {
  const t = useTranslations("admin.core.plugins");

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("create.name.label")}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>{t("create.name.desc")}</FormDescription>
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
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!isEdit && (
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("create.code.label")}</FormLabel>
              <FormControl>
                <Input placeholder="vitnode-plugin-example" {...field} />
              </FormControl>
              <FormDescription>{t("create.code.desc")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="support_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("create.support_url.label")}</FormLabel>
            <FormControl>
              <Input type="url" {...field} />
            </FormControl>
            <FormDescription>{t("create.support_url.desc")}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("create.author.label")}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="author_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel optional>{t("create.author_url.label")}</FormLabel>
            <FormControl>
              <Input type="url" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
