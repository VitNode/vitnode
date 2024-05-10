import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { CONFIG } from "@vitnode/shared";

import type { Admin__Core_Manifest_Metadata__ShowQuery } from "@/graphql/hooks";
import { mutationApi } from "./mutation-api";
import { colorConverter, getHSLFromString } from "@/functions/colors";

export const useManifestCoreAdminView = ({
  admin__core_manifest_metadata__show: data
}: Admin__Core_Manifest_Metadata__ShowQuery) => {
  const t = useTranslations("core");
  const formSchema = z.object({
    display: z.enum(["fullscreen", "standalone", "minimal-ui", "browser"]),
    start_url: z.string().min(1),
    theme_color: z.string().min(1),
    background_color: z.string().min(1)
  });

  const themeColor = colorConverter.hexToHSL(data.theme_color);
  const backgroundColor = colorConverter.hexToHSL(data.background_color);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display: data.display as z.infer<typeof formSchema>["display"],
      start_url: data.start_url.replace(`${CONFIG.frontend_url}/en`, ""),
      theme_color: themeColor
        ? `hsl(${themeColor.h}, ${themeColor.s}%, ${themeColor.l}%)`
        : "",
      background_color: backgroundColor
        ? `hsl(${backgroundColor.h}, ${backgroundColor.s}%, ${backgroundColor.l}%)`
        : ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const themeColor = getHSLFromString(values.theme_color);
    const backgroundColor = getHSLFromString(values.background_color);
    const mutation = await mutationApi({
      ...values,
      startUrl: values.start_url,
      themeColor: themeColor ? colorConverter.hslToHex(themeColor) : "",
      backgroundColor: backgroundColor
        ? colorConverter.hslToHex(backgroundColor)
        : ""
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
