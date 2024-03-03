import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { mutationApi } from "./mutation-api";
import { increaseVersionString } from "@/functions/increase-version-string";
import { useDialog } from "@/components/ui/dialog";
import { CONFIG } from "@/config";
import type { ShowAdminThemes } from "@/graphql/hooks";
import { zodInput } from "@/functions/zod";

export const useDownloadThemeAdmin = ({
  id,
  version,
  version_code
}: Pick<ShowAdminThemes, "id" | "version" | "version_code">) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();
  const formSchema = z.object({
    type: z.enum(["rebuild", "new_version"]),
    version: zodInput.string,
    version_code: z.coerce.number().min(version_code ? version_code + 1 : 10000)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: version_code ? "rebuild" : "new_version",
      version: version ? increaseVersionString(version) : "1.0.0",
      version_code: version_code ? version_code + 1 : 10000
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      id,
      version: values.type === "new_version" ? values.version : null,
      versionCode: values.type === "new_version" ? values.version_code : null
    });

    if (mutation.error || !mutation.data) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    setOpen?.(false);

    window.open(
      `${CONFIG.backend_url}/files/${mutation.data.admin__core_themes__download}`,
      "_blank"
    );
  };

  return { form, onSubmit };
};
