import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { zodInput } from "@/utils/zod";
import { useDialog } from "@/components/ui/dialog";
import { createMutationApi } from "./create-mutation-api";
import { ErrorType } from "@/graphql/fetcher";
import { ShowAdminNavPluginsObj } from "@/graphql/hooks";
import { editMutationApi } from "./edit-mutation-api";

interface Props {
  data?: ShowAdminNavPluginsObj;
}

export const useCreateNavPluginAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.plugins.dev.nav");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const { code } = useParams();
  const formSchema = z.object({
    code: zodInput.string.min(3).max(50),
    icon: z.string(),
    href: zodInput.string.min(1).max(100)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: data?.code ?? "",
      icon: data?.icon ?? "",
      href: data?.href ?? ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let error: ErrorType | undefined;
    if (data) {
      const mutation = await editMutationApi({
        ...values,
        previousCode: data.code,
        pluginCode: Array.isArray(code) ? code[0] : code
      });
      if (mutation.error) {
        error = mutation.error as ErrorType | undefined;
      }
    } else {
      const mutation = await createMutationApi({
        ...values,
        pluginCode: Array.isArray(code) ? code[0] : code
      });
      if (mutation.error) {
        error = mutation.error as ErrorType | undefined;
      }
    }

    if (error?.extensions?.code === "CODE_ALREADY_EXISTS") {
      form.setError("code", {
        message: t("create.code.exists")
      });

      return;
    }

    if (error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    toast.success(t(data ? "edit.success" : "create.success"));

    setOpen?.(false);
  };

  return {
    form,
    onSubmit
  };
};
