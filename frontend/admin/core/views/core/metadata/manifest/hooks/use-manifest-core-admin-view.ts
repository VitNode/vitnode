import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { Admin__Core_Manifest_Metadata__ShowQuery } from "@/graphql/hooks";

export const useManifestCoreAdminView = ({
  admin__core_manifest_metadata__show: data
}: Admin__Core_Manifest_Metadata__ShowQuery) => {
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
    // const mutation = await mutationApi({
    //   siteName: values.name,
    //   siteShortName: values.short_name,
    //   siteDescription: values.description,
    //   siteCopyright: values.copyright
    // });

    // if (mutation.error) {
    //   toast.error(t("errors.title"), {
    //     description: t("errors.internal_server_error")
    //   });

    //   return;
    // }

    // toast.success(t("saved_success"));
    form.reset(values);
  };

  return {
    form,
    onSubmit
  };
};
