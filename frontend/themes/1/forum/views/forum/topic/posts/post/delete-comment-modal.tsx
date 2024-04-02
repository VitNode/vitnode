import { Suspense } from "react";
import { useTranslations } from "next-intl";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useDeletePost } from "@/hooks/forum/posts/delete/use-delete-post";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: number;
}

export const DeleteCommentModal = ({ open, setOpen, id, ...props }: Props) => {
  const t = useTranslations("forum.topics.post.actions.delete");
  const tCore = useTranslations("core");
  const { deletePost } = useDeletePost({ id: id });

  return (
    <AlertDialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
