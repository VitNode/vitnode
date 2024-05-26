import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { ShowAdminStaffModerators } from "@/graphql/hooks";

const ContentDeleteActionsTableModeratorsStaffAdmin = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsTableModeratorsStaffAdmin
  }))
);

interface Props {
  data: Pick<ShowAdminStaffModerators, "id">;
}

export const DeleteActionsTableModeratorsStaffAdmin = (props: Props) => {
  const t = useTranslations("core");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveGhost" size="icon" ariaLabel={t("delete")}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <ContentDeleteActionsTableModeratorsStaffAdmin {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
