import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import type { ShowCoreLanguages } from "@/graphql/hooks";
import { useDialog } from "@/components/ui/dialog";
import { editMutationApi } from "./edit-mutation-api";

interface Args {
  data?: ShowCoreLanguages;
}

export const useCreateEditLangAdmin = ({ data }: Args) => {
  const t = useTranslations("admin.core.langs.actions");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();

  const formSchema = z.object({
    name: z
      .string({
        required_error: tCore("forms.empty")
      })
      .min(1, {
        message: tCore("forms.empty")
      }),
    timezone: z
      .string({
        required_error: tCore("forms.empty")
      })
      .min(1, {
        message: tCore("forms.empty")
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      timezone: data?.timezone ?? ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let error = false;
    if (data) {
      const mutation = await editMutationApi({
        ...data,
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

    toast(t(data ? "edit.success" : "create.success"), {
      description: values.name
    });
    setOpen(false);
  };

  return {
    form,
    onSubmit
  };
};
