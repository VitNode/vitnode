import { useTranslations } from "next-intl";

import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/forum/posts/delete/use-delete-post";

interface Props {
  id: number;
  setOpen: (value: boolean) => void;
}

export const Content = ({ id, setOpen }: Props) => {
  const t = useTranslations("forum.topics.post.actions.delete");
  const tCore = useTranslations("core");
  const { deletePost } = useDeletePost({ id: id });

  return (
    <>
      {t("desc")}
      <DialogFooter>
        <Button
          onClick={() => setOpen(false)}
          variant="outline"
          ariaLabel={tCore("cancel")}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={deletePost}
          variant="destructive"
          ariaLabel={tCore("delete")}
        >
          {t("delete")}
        </Button>
      </DialogFooter>
    </>
  );
};
