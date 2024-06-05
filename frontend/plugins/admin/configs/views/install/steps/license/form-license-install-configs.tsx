"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/utils/i18n";

export const FormLicenseInstallConfigs = () => {
  const t = useTranslations("admin.configs.install.steps");
  const tCore = useTranslations("core");
  const { push } = useRouter();

  const formSchema = z.object({
    agree: z.boolean({
      required_error: tCore("forms.empty")
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agree: false
    }
  });

  const onSubmit = () => {
    push("/admin/install/database");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-start gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t("license.agree")}</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.watch("agree")}>
          {t("next_step")}
        </Button>
      </form>
    </Form>
  );
};
