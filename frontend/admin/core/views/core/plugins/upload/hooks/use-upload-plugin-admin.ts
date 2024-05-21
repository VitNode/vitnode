import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { useDialog } from "@/components/ui/dialog";
import { mutationApi } from "./mutation-api";
import type { UploadPluginAdminProps } from "../upload";
import type { ErrorType } from "@/graphql/fetcher";

export const useUploadPluginAdmin = ({ data }: UploadPluginAdminProps) => {
  const t = useTranslations("admin.core.plugins.upload");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const formSchema = z.object({
    file: z.array(z.instanceof(File))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      file: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.file.length) return;

    const formData = new FormData();
    formData.append("file", values.file[0]);
    if (data) {
      formData.append("code", data.code);
    }
    const mutation = await mutationApi(formData);

    const error = mutation.error as ErrorType | undefined;

    if (
      error?.extensions?.code === "PLUGIN_ALREADY_EXISTS" ||
      error?.extensions?.code === "PLUGIN_VERSION_IS_LOWER"
    ) {
      form.setError("file", {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        message: t(`errors.${error?.extensions?.code}`)
      });

      return;
    }

    if (error || !mutation.data) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    setOpen?.(false);
    toast.success(t(data ? "success_update" : "success"), {
      description: mutation.data.admin__core_plugins__upload.name
    });
  };

  return { form, onSubmit };
};
