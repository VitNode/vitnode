import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@vitnode/frontend/navigation";
import { zodInput } from "@vitnode/frontend/helpers";

import { mutationApi } from "./mutation-api";
import { useDialog } from "@/components/ui/dialog";
import { useSessionAdmin } from "@/plugins/admin/hooks/use-session-admin";

export const codeThemeRegex = /^[a-z0-9-]*$/;

export const useCreateThemeAdmin = () => {
  const t = useTranslations("admin.core.styles.themes.create");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const pathname = usePathname();
  const { push } = useRouter();
  const { session } = useSessionAdmin();
  const formSchema = z.object({
    name: zodInput.string.min(3).max(50),
    support_url: zodInput.string.url(),
    author: zodInput.string.min(3).max(50),
    author_url: zodInput.string.url().or(z.literal(""))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      support_url: "",
      author: session?.name || "",
      author_url: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      name: values.name,
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

    setOpen?.(false);
  };

  return {
    form,
    onSubmit
  };
};
