import { useTranslations } from "next-intl";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useDialog } from "@/components/ui/dialog";
import { mutationCreateApi } from "./mutation-create-api";
import { zodInput } from "@/functions/zod";
import type { CreateEditForumAdminProps } from "../create-edit";
import { mutationEditApi } from "./mutation-edit-api";

export const useCreateEditFormForumAdmin = ({
  data
}: CreateEditForumAdminProps) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: zodInput.languageInput
      .min(1, {
        message: t("errors.required")
      })
      .refine((value) => value.every((item) => item.value.length <= 50), {
        message: t("errors.max_length", { length: 50 })
      }),
    description: zodInput.languageInput,
    permissions: z.object({
      can_all_view: z.boolean(),
      can_all_read: z.boolean(),
      can_all_create: z.boolean(),
      can_all_reply: z.boolean(),
      groups: z.array(
        z.object({
          id: z.number(),
          can_view: z.boolean(),
          can_read: z.boolean(),
          can_create: z.boolean(),
          can_reply: z.boolean()
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
        can_all_view: data?.permissions.can_all_view ?? true,
        can_all_read: data?.permissions.can_all_read ?? true,
        can_all_create: data?.permissions.can_all_create ?? true,
        can_all_reply: data?.permissions.can_all_reply ?? true,
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
