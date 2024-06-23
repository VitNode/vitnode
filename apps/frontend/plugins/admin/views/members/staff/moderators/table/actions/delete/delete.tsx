import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
} from "vitnode-frontend/components";

import { Loader } from "@/components/loader";
import { ShowAdminStaffModerators } from "@/graphql/hooks";

const ContentDeleteActionsTableModeratorsStaffAdmin = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsTableModeratorsStaffAdmin,
  })),
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
        <React.Suspense fallback={<Loader />}>
          <ContentDeleteActionsTableModeratorsStaffAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
