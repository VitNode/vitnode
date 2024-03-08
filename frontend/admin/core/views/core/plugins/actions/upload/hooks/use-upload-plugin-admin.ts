import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useDialog } from "@/components/ui/dialog";

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return { form, onSubmit };
};
