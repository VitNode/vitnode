import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { zodInput } from "vitnode-frontend/helpers";

import { mutationCreateApi } from "./create-mutation-api";
import { ShowBlogCategories } from "@/graphql/hooks";
import { useDialog } from "@/components/ui/dialog";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";

interface Args {
  data?: ShowBlogCategories;
}

export const useCreateEditCategoryBlogAdmin = ({ data }: Args) => {
  const t = useTranslations("blog.admin.categories");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();
  const { convertText } = useTextLang();

  const formSchema = z.object({
    name: zodInput.languageInput.min(1),
    description: zodInput.languageInput,
    color: zodInput.string,
    permissions: z.object({
      can_all_read: z.boolean(),
      can_all_create: z.boolean(),
      can_all_reply: z.boolean(),
      can_all_download_files: z.boolean(),
      groups: z.array(
        z.object({
          group_id: z.number(),
          can_read: z.boolean(),
          can_create: z.boolean(),
          can_reply: z.boolean(),
          can_download_files: z.boolean(),
        }),
      ),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      description: data?.description ?? [],
      color: "",
      permissions: {
        can_all_read: false,
        can_all_create: false,
        can_all_reply: false,
        can_all_download_files: false,
        groups: [],
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let error = false;
    if (data) {
      const mutation = await mutationCreateApi(values);

      if (mutation.error) {
        error = true;
      }
    } else {
      const mutation = await mutationCreateApi(values);

      if (mutation.error) {
        error = true;
      }
    }

    if (error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error"),
      });

      return;
    }

    toast.success(t(data ? "edit.success" : "create.success"), {
      description: convertText(values.name),
    });

    setOpen?.(false);
  };

  return { form, onSubmit };
};
