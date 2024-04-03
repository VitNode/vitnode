import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { useAlertDialog } from "@/components/ui/alert-dialog";

interface Props {
  id: number;
}

export const useDeletePost = ({ id }: Props) => {
  const t = useTranslations("forum.topics.post.actions.delete");
  const tCore = useTranslations("core");
  const { setOpen } = useAlertDialog();

  const onSubmit = async () => {
    const mutation = await mutationApi({ id });

    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    toast.success(t("success"));

    setOpen(false);
  };

  return { onSubmit };
};
