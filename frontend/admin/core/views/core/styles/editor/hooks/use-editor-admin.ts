import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import type { ConfigType } from "@/config/get-config-file";
import { mutationApi } from "./mutation-api";

export interface EditorAdminArgs {
  data: ConfigType;
}

export const useEditorAdmin = ({ data }: EditorAdminArgs) => {
  const t = useTranslations("core");
  const formSchema = z.object({
    sticky: z.boolean(),
    allow_head_h1: z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sticky: data.editor.sticky,
      allow_head_h1: data.editor.allow_head_h1
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutationApi(values);

      toast.success(t("saved_success"));
      form.reset(values);
    } catch (error) {
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
