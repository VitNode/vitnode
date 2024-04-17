import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import type { Admin__Core_Manifest_Metadata__ShowQuery } from "@/graphql/hooks";
import { mutationApi } from "./mutation-api";

export const useManifestCoreAdminView = ({
  admin__core_manifest_metadata__show: data
}: Admin__Core_Manifest_Metadata__ShowQuery) => {
  const t = useTranslations("core");
  const formSchema = z.object({
    display: z.enum(["fullscreen", "standalone", "minimal-ui", "browser"])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display: data.display as z.infer<typeof formSchema>["display"]
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      ...values
    });

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("saved_success"));
    form.reset(values);
  };

  return {
    form,
    onSubmit
  };
};
