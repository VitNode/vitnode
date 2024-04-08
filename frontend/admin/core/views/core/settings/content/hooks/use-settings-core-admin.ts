import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { zodInput } from "@/functions/zod";

export const useSettingsCoreAdmin = () => {
  const t = useTranslations("core");

  const formSchema = z.object({
    name: zodInput.string.min(1)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      sideName: values.name
    });

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("saved_success"));
  };

  return {
    form,
    onSubmit
  };
};
