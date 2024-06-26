import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { getHSLFromString, isColorBrightness } from "vitnode-shared";

import { Admin__Core_Email_Settings__ShowQuery } from "@/graphql/hooks";
import { mutationApi } from "./mutation-api";

export const useEmailSettingsFormAdmin = ({
  admin__core_email_settings__show: data,
}: Admin__Core_Email_Settings__ShowQuery) => {
  const t = useTranslations("core");

  const formSchema = z.object({
    smtp_host: z.string().min(1),
    smtp_user: z.string().min(1),
    smtp_port: z.number().int().min(1).max(999),
    smtp_secure: z.boolean(),
    smtp_password: z.string(),
    color_primary: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smtp_host: data.smtp_host || "",
      smtp_user: data.smtp_user || "",
      smtp_port: data.smtp_port || 0,
      smtp_secure: data.smtp_secure || false,
      smtp_password: "", // Password is not fetched from the server,
      color_primary: data.color_primary || "hsl(0, 0, 0)",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const primaryHSL = getHSLFromString(values.color_primary);
    if (!primaryHSL) return;

    const mutation = await mutationApi({
      smtpHost: values.smtp_host,
      smtpUser: values.smtp_user,
      smtpPort: values.smtp_port,
      smtpSecure: values.smtp_secure,
      smtpPassword: values.smtp_password,
      colorPrimary: values.color_primary,
      colorPrimaryForeground: `hsl(${isColorBrightness(primaryHSL) ? `${primaryHSL.h}, 40, 2` : `${primaryHSL.h}, 40, 98`})`,
    });

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error"),
      });

      return;
    }

    toast.success(t("saved_success"));
    form.reset(values);
  };

  return { form, onSubmit };
};
