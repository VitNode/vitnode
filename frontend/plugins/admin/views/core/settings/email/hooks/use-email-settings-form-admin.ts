import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Admin__Core_Email_Settings__ShowQuery } from "@/utils/graphql/hooks";

export const useEmailSettingsFormAdmin = ({
  admin__core_email_settings__show: data
}: Admin__Core_Email_Settings__ShowQuery) => {
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
    form.reset(values);
  };

  return { form, onSubmit };
};
