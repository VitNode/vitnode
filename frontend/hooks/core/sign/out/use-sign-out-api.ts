import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";

export const useSignOutAPI = (): {
  onSubmit: () => void;
} => {
  const t = useTranslations("core");

  const onSubmit = async (): Promise<void> => {
    const mutation = await mutationApi();
    if (mutation?.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });
    }
  };

  return {
    onSubmit
  };
};
