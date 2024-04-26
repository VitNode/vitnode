import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import type { ShowAdminGroups } from "@/graphql/hooks";
import { mutationCreateApi } from "./mutation-create-api";
import { mutationEditApi } from "./mutation-edit-api";
import { useDialog } from "@/components/ui/dialog";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { usePathname, useRouter } from "@/utils/i18n";
import { zodInput } from "@/functions/zod";

export interface CreateEditFormGroupsMembersAdminArgs {
  data?: Pick<ShowAdminGroups, "name" | "id">;
}

export const useCreateEditFormGroupsMembersAdmin = ({
  data
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations("admin.members.groups");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const { push } = useRouter();

  const formSchema = z.object({
    name: zodInput.languageInput.min(1),
    test: zodInput.string,
    color: zodInput.string
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      test: "",
      color: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let isError = false;
    if (data) {
      const mutationEdit = await mutationEditApi({
        id: data.id,
        name: values.name
      });

      if (mutationEdit.error) {
        isError = true;
      }
    } else {
      const mutationCreate = await mutationCreateApi({
        name: values.name
      });

      if (mutationCreate.error) {
        isError = true;
      }
    }

    if (isError) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    push(pathname);

    toast.success(data ? t("edit.success") : t("create.success"), {
      description: convertText(values.name)
    });

    setOpen?.(false);
  };

  return { form, formSchema, onSubmit };
};
