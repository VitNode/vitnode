import { useForm, type UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { mutationDeleteApi } from "./api/mutation-delete-api";
import { useDialog } from "@/components/ui/dialog";

interface FormType {
  file: File[];
  type: "upload" | "delete";
}

export const useModalChangeAvatar = (): {
  form: UseFormReturn<FormType>;
  isPending: boolean;
  onSubmit: ({ type }: FormType) => Promise<void>;
} => {
  const [isPending, setPending] = useState(false);
  const t = useTranslations("core");
  const { setOpen } = useDialog();

  const form: UseFormReturn<FormType> = useForm<FormType>({
    defaultValues: {
      type: "upload",
      file: []
    },
    mode: "onChange"
  });

  const onSubmit = async ({ type }: FormType): Promise<void> => {
    if (type === "delete") {
      setPending(true);

      const mutation = await mutationDeleteApi();
      if (mutation.error) {
        toast.error(t("errors.title"), {
          description: t("settings.change_avatar.options.delete.error")
        });
      } else {
        toast.success(t("settings.change_avatar.options.delete.title"), {
          description: t("settings.change_avatar.options.delete.success")
        });
        setOpen?.(false);
      }

      setPending(false);
    }
  };

  return {
    form,
    onSubmit,
    isPending
  };
};
