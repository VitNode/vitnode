import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { useDialog } from "@/components/ui/dialog";
import { mutationApi } from "./mutation-api";

export const useUploadPluginAdmin = () => {
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
    const mutation = await mutationApi(formData);

    if (mutation.error || !mutation.data) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    setOpen?.(false);
    toast.success(t("success"));
  };

  return { form, onSubmit };
};
