import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { useSessionAdmin } from "@/admin/core/hooks/use-session-admin";
import { mutationApi } from "./mutation-api";
import { useDialog } from "@/components/ui/dialog";
import { usePathname, useRouter } from "@/i18n";
import { zodInput } from "@/functions/zod";

export const codePluginRegex = /^[a-z0-9-]*$/;

export const useCreatePluginAdmin = () => {
  const t = useTranslations("admin.core.plugins.create");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const pathname = usePathname();
  const { push } = useRouter();
  const { session } = useSessionAdmin();
  const formSchema = z.object({
    name: zodInput.string.min(3).max(100),
    code: zodInput.string
      .min(5)
      .max(50)
      .refine(value => codePluginRegex.test(value), {
        message: t("code.invalid")
      }),
    description: zodInput.string,
    support_url: zodInput.string.url().or(z.literal("")),
    author: zodInput.string.min(3).max(100),
    author_url: zodInput.string.url()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      support_url: "",
      author: session?.name || "",
      author_url: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      name: values.name,
      code: values.code,
      description: values.description,
      supportUrl: values.support_url,
      author: values.author,
      authorUrl: values.author_url
    });

    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    push(pathname);

    toast.success(t("success"), {
      description: values.name
    });

    setOpen(false);
  };

  return {
    form,
    onSubmit
  };
};
