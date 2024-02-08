import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import type { ShowCoreLanguages } from "@/graphql/hooks";
import { useDialog } from "@/components/ui/dialog";
import { mutationApi } from "./mutation-api";

interface Args {
  data: ShowCoreLanguages;
}

export const useEditLangAdmin = ({ data }: Args) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: z
      .string({
        required_error: t("forms.empty")
      })
      .min(1, {
        message: t("forms.empty")
      }),
    timezone: z
      .string({
        required_error: t("forms.empty")
      })
      .min(1, {
        message: t("forms.empty")
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      timezone: data.timezone
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      ...data,
      ...values
    });

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    toast(t("saved_success"));
    setOpen(false);
  };

  return {
    form,
    onSubmit
  };
};
