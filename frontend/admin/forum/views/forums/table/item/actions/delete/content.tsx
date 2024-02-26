import { useTranslations } from "next-intl";

import {
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

export const ContentDeleteActionForumAdmin = () => {
  // const t = useTranslations("admin_forum.forums.delete");
  const tCore = useTranslations("core");

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore("are_your_sure")}</AlertDialogTitle>
      </AlertDialogHeader>
    </>
  );
};
