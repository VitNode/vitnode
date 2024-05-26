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
import { ShowAdminStaffAdministrators } from "@/graphql/hooks";

const ContentDeleteActionsTableAdministratorsStaffAdmin = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsAdministratorsStaffAdmin
  }))
);

interface Props {
  data: Pick<ShowAdminStaffAdministrators, "id">;
}

export const DeleteActionsTableAdministratorsStaffAdmin = (props: Props) => {
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
          <ContentDeleteActionsTableAdministratorsStaffAdmin {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
