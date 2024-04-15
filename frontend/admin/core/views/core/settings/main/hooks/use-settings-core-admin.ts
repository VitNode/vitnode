import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { zodInput } from "@/functions/zod";
import type { Core_General_Settings__ShowQuery } from "@/graphql/hooks";

export const useSettingsCoreAdmin = ({
  core_settings__show: data
}: Core_General_Settings__ShowQuery) => {
  const t = useTranslations("core");

  const formSchema = z.object({
    name: zodInput.string.min(1)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.site_name
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutationApi({
        site_name: values.name
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
