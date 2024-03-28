import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";

interface Props {
  id: number;
}

export const useDeletePost = ({ id }: Props) => {
  const tCore = useTranslations("core");

  const deletePost = async () => {
    const mutation = await mutationApi({ id });

    if (mutation.error) {
      let error: Error = mutation.error as Error;
      toast.error(tCore("errors.title"), {
        description: error.message
      });
    }
  };

  return { deletePost };
};
