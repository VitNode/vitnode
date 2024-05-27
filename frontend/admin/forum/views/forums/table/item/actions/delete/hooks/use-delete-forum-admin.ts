import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { zodInput } from "@/utils/zod";
import { mutationApi } from "./mutation-api";
import { useAlertDialog } from "@/components/ui/alert-dialog";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ShowForumForumsAdmin } from "@/graphql/hooks";

export const useDeleteForumAdmin = ({
  id,
  name
}: Pick<ShowForumForumsAdmin, "id" | "name">) => {
  const t = useTranslations("admin_forum.forums.delete");
  const tCore = useTranslations("core");
  const { convertText } = useTextLang();
  const { setOpen } = useAlertDialog();
  const formSchema = z.object({
    move_topics_to: z
      .object({
        id: z.number().min(1),
        name: zodInput.languageInput
      })
      .optional()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      id,
      moveTopicsTo: values.move_topics_to?.id
    });
    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("success"), {
      description: convertText(name)
    });

    setOpen(false);
  };

  return { form, onSubmit };
};
