import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { zodInput } from "@/functions/zod";
import { mutationCreateApi } from "./create-mutation-api";
import type { ShowBlogCategories } from "@/graphql/hooks";
import { useDialog } from "@/components/ui/dialog";
import { useTextLang } from "@/hooks/core/use-text-lang";

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
    color: zodInput.string
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? [],
      description: data?.description ?? [],
      color: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let error = false;
    if (data) {
      const mutation = await mutationCreateApi({
        ...values
      });

      if (mutation.error) {
        error = true;
      }
    } else {
      const mutation = await mutationCreateApi({
        ...values
      });

      if (mutation.error) {
        error = true;
      }
    }

    if (error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    toast.success(t(data ? "edit.success" : "create.success"), {
      description: convertText(values.name)
    });

    setOpen?.(false);
  };

  return { form, onSubmit };
};
