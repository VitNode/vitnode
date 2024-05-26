import { useTranslations } from "next-intl";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useDialog } from "@/components/ui/dialog";
import { mutationCreateApi } from "./mutation-create-api";
import { zodInput } from "@/utils/zod";
import { CreateEditForumAdminProps } from "../create-edit";
import { mutationEditApi } from "./mutation-edit-api";

export const useCreateEditFormForumAdmin = ({
  data
}: CreateEditForumAdminProps) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: zodInput.languageInput,
    description: zodInput.languageInput,
    permissions: z.object({
      can_all_view: z.boolean(),
      can_all_read: z.boolean(),
      can_all_create: z.boolean(),
      can_all_reply: z.boolean(),
      can_all_download_files: z.boolean(),
      groups: z.array(
        z.object({
          group_id: z.number(),
          can_view: z.boolean(),
          can_read: z.boolean(),
          can_create: z.boolean(),
          can_reply: z.boolean(),
          can_download_files: z.boolean()
        })
      )
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      description: data?.description ?? [],
      permissions: {
        can_all_view: data?.permissions.can_all_view ?? false,
        can_all_read: data?.permissions.can_all_read ?? false,
        can_all_create: data?.permissions.can_all_create ?? false,
        can_all_reply: data?.permissions.can_all_reply ?? false,
        can_all_download_files:
          data?.permissions.can_all_download_files ?? false,
        groups: data?.permissions.groups ?? []
      }
    },
    mode: "onTouched"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let error = false;
    if (data) {
      const mutation = await mutationEditApi({
        id: data.id,
        name: values.name,
        description: values.description,
        permissions: values.permissions
      });

      if (mutation.error) {
        error = true;
      }
    } else {
      const mutation = await mutationCreateApi({
        name: values.name,
        description: values.description,
        permissions: values.permissions
      });

      if (mutation.error) {
        error = true;
      }
    }

    if (error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    setOpen?.(false);
  };

  return { form, onSubmit };
};
