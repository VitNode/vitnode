import { useTranslations } from "next-intl";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { mutationCreateApi } from "./mutation-create-api";
import { useDialog } from "@/components/ui/dialog";
import { useRouter } from "@/i18n";
import { zodInput } from "@/functions/zod";
import type { EditTopicData } from "@/themes/1/forum/views/forum/topic/create-edit/create-edit";
import { mutationEditApi } from "./mutation-edit-api";
import type { TextLanguage } from "@/graphql/hooks";

import { useTextLang } from "../../../core/use-text-lang";

interface Props {
  forumId: number;
  data?: EditTopicData;
}

export const useCreateEditTopic = ({
  data,
  forumId
}: Props): {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
} => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();
  const { push } = useRouter();
  const { convertNameToLink } = useTextLang();

  const formSchema = z.object({
    title: zodInput.languageInput
      .min(1, {
        message: t("errors.required")
      })
      .refine(
        (value): boolean =>
          value.every((item): boolean => item.value.length <= 100),
        {
          message: t("errors.max_length", { length: 100 })
        }
      ),
    content: zodInput.languageInput.min(1, {
      message: t("errors.required")
    })
  });

  const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || [],
      content: data?.content || []
    },
    mode: "onTouched"
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    let error = false;
    let topic: {
      id: number;
      title: TextLanguage[];
    } | null = null;

    if (data) {
      const mutation = await mutationEditApi({ ...values, id: data.id });
      if (mutation.error) error = true;

      if (mutation.data) {
        const {
          forum_topics__edit: { id, title }
        } = mutation.data;
        topic = { id, title };
      }
    } else {
      const mutation = await mutationCreateApi({ ...values, forumId });
      if (mutation.error) error = true;

      if (mutation.data) {
        const {
          forum_topics__create: { id, title }
        } = mutation.data;
        topic = { id, title };
      }
    }

    if (error) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    if (!topic) return;
    push(
      `/forum/topic/${convertNameToLink({ id: topic.id, name: topic.title })}`
    );
    setOpen?.(false);
  };

  return { form, onSubmit };
};
