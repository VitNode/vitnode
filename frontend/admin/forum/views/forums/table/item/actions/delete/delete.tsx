import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ShowForumForumsAdmin } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionForumAdmin
  }))
);

export const DeleteActionForumAdmin = (
  props: Pick<ShowForumForumsAdmin, "id" | "name">
) => {
  const t = useTranslations("core");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveGhost" size="icon" tooltip={t("delete")}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
