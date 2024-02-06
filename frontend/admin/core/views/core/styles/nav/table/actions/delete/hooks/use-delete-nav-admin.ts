import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useAlertDialog } from "@/components/ui/alert-dialog";
import type { ShowCoreNav } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { mutationApi } from "./mutation-api";

export const useDeleteNavAdmin = ({
  id,
  name
}: Pick<ShowCoreNav, "id" | "name">) => {
  const t = useTranslations("admin.core.styles.nav.delete");
  const tCore = useTranslations("core");
  const { setOpen } = useAlertDialog();
  const { convertText } = useTextLang();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });
    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("success"), {
      description: convertText(name)
    });

    setOpen(false);
  };

  return { onSubmit };
};
