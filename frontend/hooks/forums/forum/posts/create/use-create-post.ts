import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { getIdFormString } from "@/functions/url";
import { zodInput } from "@/functions/zod";

interface Args {
  setOpen: (value: boolean) => void;
}

export const useCreatePost = ({ setOpen }: Args) => {
  const t = useTranslations("core");
  const { id } = useParams();

  const formSchema = z.object({
    content: zodInput.languageInputRequired
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      content: values.content,
      topicId: getIdFormString(id)
    });

    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    setOpen(false);
  };

  return {
    form,
    onSubmit
  };
};
