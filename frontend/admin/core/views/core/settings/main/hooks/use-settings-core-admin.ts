import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { zodInput } from "@/functions/zod";
import type { ConfigType } from "@/config/get-config-file";

export const useSettingsCoreAdmin = (
  data: ConfigType["settings"]["general"]
) => {
  const t = useTranslations("core");

  const formSchema = z.object({
    name: zodInput.string.min(1)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.side_name
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutationApi({
        side_name: values.name
      });

      toast.success(t("saved_success"));
      form.reset(values);
    } catch (err) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });
    }
  };

  return {
    form,
    onSubmit
  };
};
