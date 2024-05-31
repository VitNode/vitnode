import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { ShowAdminPlugins } from "@/utils/graphql/hooks";

import { mutationEditApi } from "../../../../actions/create/hooks/mutation-edit-api";

export const useSetDefaultPluginAdmin = (data: ShowAdminPlugins) => {
  const tCore = useTranslations("core");

  const onSubmit = async () => {
    const mutation = await mutationEditApi({
      author: data.author,
      code: data.code,
      name: data.name,
      authorUrl: data.author_url,
      description: data.description,
      enabled: data.enabled,
      default: true,
      supportUrl: data.support_url
    });

    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }
  };

  return {
    onSubmit
  };
};
