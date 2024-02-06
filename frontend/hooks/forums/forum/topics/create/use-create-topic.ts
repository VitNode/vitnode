import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { zodTextLanguageInputType } from "@/components/text-language-input";
import { mutationApi } from "./mutation-api";
import { useDialog } from "@/components/ui/dialog";
import { useRouter } from "@/i18n";

import { useTextLang } from "../../../../core/use-text-lang";

interface Props {
  forumId: number;
}

export const useCreateTopic = ({ forumId }: Props) => {
  const t = useTranslations("core");
  const { setOpen } = useDialog();
  const { push } = useRouter();
  const { convertNameToLink } = useTextLang();

  const formSchema = z.object({
    title: zodTextLanguageInputType.min(1, t("forms.empty")),
    content: zodTextLanguageInputType.min(1, t("forms.empty"))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: [],
      content: []
    }
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

    setOpen(false);
  };

  return { form, onSubmit };
};
