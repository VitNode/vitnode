import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useAlertDialog } from "@/components/ui/alert-dialog";
import type { ContentDeleteActionTableNavDevPluginAdminProps } from "../content";
import { mutationApi } from "./mutation-api";

export const useDeleteNavPluginAdmin = ({
  code,
  id
}: ContentDeleteActionTableNavDevPluginAdminProps) => {
  const t = useTranslations("admin.core.plugins.dev.nav.delete");
  const tCore = useTranslations("core");
  const { setOpen } = useAlertDialog();
  const { code: pluginCode } = useParams();

  const onSubmit = async () => {
    const mutation = await mutationApi({
      id,
      pluginCode: Array.isArray(pluginCode) ? pluginCode[0] : pluginCode
    });
    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("success"), {
      description: code
    });

    setOpen(false);
  };

  return { onSubmit };
};
