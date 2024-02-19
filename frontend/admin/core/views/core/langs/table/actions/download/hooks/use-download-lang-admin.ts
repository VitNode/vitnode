import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { queryApi } from "./query-api";
import { mutationApi } from "./mutation-api";
import { useDialog } from "@/components/ui/dialog";
import { CONFIG } from "@/config";
import type { ShowCoreLanguages } from "@/graphql/hooks";

export const useDownloadLangAdmin = ({
  code
}: Pick<ShowCoreLanguages, "code">) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();
  const query = useQuery({
    queryKey: ["Admin__Core_Plugins__Show"],
    queryFn: async () => await queryApi({})
  });

  const formSchema = z.object({
    all: z.boolean(),
    plugins: z.array(z.string())
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      all: true,
      plugins: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      code,
      all: values.all,
      plugins: values.plugins
    });

    if (mutation.error || !mutation.data) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    setOpen(false);

    window.open(
      `${CONFIG.backend_url}/files/${mutation.data.admin__core_languages__download}`,
      "_blank"
    );
  };

  return { form, onSubmit, query };
};
