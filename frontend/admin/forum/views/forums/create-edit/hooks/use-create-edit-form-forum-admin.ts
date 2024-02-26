import { useTranslations } from "next-intl";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useDialog } from "@/components/ui/dialog";
import { mutationCreateApi } from "./mutation-create-api";
import { APIKeys } from "@/graphql/api-keys";
import { zodInput } from "@/functions/zod";
import type { CreateEditForumAdminProps } from "../create-edit";

export const useCreateEditFormForumAdmin = ({
  data
}: CreateEditForumAdminProps) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();
  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: zodInput.languageInputRequired,
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
      name: data?.name || [],
      description: data?.description || [],
      permissions: {
        can_all_view: data?.permissions.can_all_view || false,
        can_all_read: data?.permissions.can_all_read || false,
        can_all_create: data?.permissions.can_all_create || false,
        can_all_reply: data?.permissions.can_all_reply || false,
        groups: data?.permissions.groups || []
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationCreateApi({
      name: values.name,
      description: values.description,
      permissions: values.permissions
    });

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    queryClient.refetchQueries({
      queryKey: [APIKeys.FORUMS_ADMIN]
    });

    setOpen(false);
  };

  return { form, onSubmit };
};
