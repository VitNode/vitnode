import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { useSessionAdmin } from "@/admin/core/hooks/use-session-admin";
import { mutationCreateApi } from "./mutation-create-api";
import { useDialog } from "@/components/ui/dialog";
import { usePathname, useRouter } from "@/utils/i18n";
import { zodInput } from "@/utils/zod";
import { ShowAdminPlugins } from "@/graphql/hooks";
import { mutationEditApi } from "./mutation-edit-api";
import { ErrorType } from "@/graphql/fetcher";

export const codePluginRegex = /^[a-z0-9-]*$/;

interface Args {
  data?: ShowAdminPlugins;
}

export const useCreateEditPluginAdmin = ({ data }: Args) => {
  const t = useTranslations("admin.core.plugins");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const pathname = usePathname();
  const { push } = useRouter();
  const { session } = useSessionAdmin();
  const formSchema = z.object({
    name: zodInput.string.min(3).max(50),
    code: zodInput.string
      .min(3)
      .max(50)
      .refine(value => codePluginRegex.test(value), {
        message: t("create.code.invalid")
      }),
    description: zodInput.string,
    support_url: zodInput.string.url(),
    author: zodInput.string.min(3).max(100),
    author_url: zodInput.string.url().or(z.literal(""))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      code: data?.code ?? "",
      description: data?.description ?? "",
      support_url: data?.support_url ?? "",
      author: data ? data.author : session?.name ?? "",
      author_url: data?.author_url ?? ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let error: ErrorType | undefined;

    if (data) {
      const mutation = await mutationEditApi({
        name: values.name,
        code: values.code,
        description: values.description,
        supportUrl: values.support_url,
        author: values.author,
        authorUrl: values.author_url,
        default: data.default
      });

      if (mutation.error) {
        error = mutation.error as ErrorType | undefined;
      }
    } else {
      const mutation = await mutationCreateApi({
        name: values.name,
        code: values.code,
        description: values.description,
        supportUrl: values.support_url,
        author: values.author,
        authorUrl: values.author_url
      });

      if (mutation.error) {
        error = mutation.error as ErrorType | undefined;
      }
    }

    if (error?.extensions?.code === "PLUGIN_ALREADY_EXISTS") {
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

    toast.success(t(data ? "edit.success" : "create.success"), {
      description: values.name
    });

    if (!data) {
      push(pathname);
      setOpen?.(false);
    }
  };

  return {
    form,
    onSubmit
  };
};
