import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { usePathname, useRouter } from "vitnode-frontend/navigation";
import { useAlertDialog } from "vitnode-frontend/components";

import { mutationApi } from "./mutation-api";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { ShowAdminGroups } from "@/graphql/hooks";

export const useDeleteGroupAdmin = ({
  id,
  name,
}: Pick<ShowAdminGroups, "id" | "name">) => {
  const t = useTranslations("admin.members.groups.delete");
  const tCore = useTranslations("core");
  const { convertText } = useTextLang();
  const formatName = convertText(name);
  const { setOpen } = useAlertDialog();
  const pathname = usePathname();
  const { push } = useRouter();

  const formSchema = z.object({
    name: z.string().refine(value => value === formatName),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name !== formatName) return;

    const mutation = await mutationApi({ id });
    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error"),
      });

      return;
    }

    push(pathname);

    toast.success(t("success"));

    setOpen(false);
  };

  return { form, onSubmit };
};
