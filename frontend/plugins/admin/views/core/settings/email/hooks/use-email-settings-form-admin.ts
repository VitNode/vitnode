import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Admin__Core_Email_Settings__ShowQuery } from "@/utils/graphql/hooks";
import { mutationApi } from "./mutation-api";

export const useEmailSettingsFormAdmin = ({
  admin__core_email_settings__show: data
}: Admin__Core_Email_Settings__ShowQuery) => {
  const t = useTranslations("core");

  const formSchema = z.object({
    host: z.string().min(1),
    user: z.string().min(1),
    port: z.number().int().min(1).max(999),
    secure: z.boolean(),
    password: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: data.host || "",
      user: data.user || "",
      port: data.port || 0,
      secure: data.secure || false,
      password: "" // Password is not fetched from the server
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi(values);

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("saved_success"));
    form.reset(values);
  };

  return { form, onSubmit };
};
