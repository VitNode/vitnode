import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import type { ShowCoreLanguages } from "@/graphql/hooks";
import { useDialog } from "@/components/ui/dialog";
import { editMutationApi } from "./edit-mutation-api";
import { createMutationApi } from "./create-mutation-api";
import { zodInput } from "@/functions/zod";

interface Args {
  data?: ShowCoreLanguages;
}

export const useCreateEditLangAdmin = ({ data }: Args) => {
  const t = useTranslations("admin.core.langs.actions");
  const tCore = useTranslations("core");
  const { setOpen } = useDialog();

  const formSchema = z.object({
    code: zodInput.string.min(1),
    name: zodInput.string.min(1),
    timezone: zodInput.string.min(1),
    default: z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: data?.code ?? "",
      name: data?.name ?? "",
      timezone: data?.timezone ?? "",
      default: data?.default ?? false
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
    } else {
      const mutation = await createMutationApi(values);

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
