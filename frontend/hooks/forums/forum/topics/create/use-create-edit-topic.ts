import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { useDialog } from "@/components/ui/dialog";
import { useRouter } from "@/i18n";
import { zodInput } from "@/functions/zod";
import type { EditTopicData } from "@/themes/1/forum/views/forum/topic/create-edit/create-edit";

import { useTextLang } from "../../../../core/use-text-lang";

interface Props {
  forumId: number;
  data?: EditTopicData;
}

export const useCreateEditTopic = ({ data, forumId }: Props) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();
  const { push } = useRouter();
  const { convertNameToLink } = useTextLang();

  const formSchema = z.object({
    title: zodInput.languageInput
      .min(1, {
        message: t("errors.required")
      })
      .refine(value => value.every(item => item.value.length <= 100), {
        message: t("errors.max_length", { length: 100 })
      }),
    content: zodInput.languageInput.min(1, {
      message: t("errors.required")
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || [],
      content: data?.content || []
    },
    mode: "onTouched"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({ ...values, forumId });
    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    if (mutation.data) {
      const {
        forum_topics__create: { id, title }
      } = mutation.data;

      push(`/topic/${convertNameToLink({ id, name: title })}`);
    }

    setOpen?.(false);
  };

  return { form, onSubmit };
};
