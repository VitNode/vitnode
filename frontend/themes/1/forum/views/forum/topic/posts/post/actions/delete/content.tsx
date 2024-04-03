import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/forum/posts/delete/use-delete-post";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { SubmitDeleteActionPost } from "./submit";

interface Props {
  id: number;
}

export const ContentDeleteActionPost = ({ id }: Props) => {
  const t = useTranslations("forum.topics.post.actions.delete");
  const tCore = useTranslations("core");
  const { onSubmit } = useDeletePost({ id: id });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{t("desc")}</AlertDialogTitle>
        <AlertDialogDescription>dupa</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="outline" ariaLabel={tCore("cancel")}>
            {t("cancel")}
          </Button>
        </AlertDialogCancel>

        <SubmitDeleteActionPost />
      </AlertDialogFooter>
    </form>
  );
};
