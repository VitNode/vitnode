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
import { ShowAdminStaffAdministrators } from "@/graphql/hooks";

const ContentDeleteActionsTableAdministratorsStaffAdmin = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsAdministratorsStaffAdmin,
  })),
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
        <React.Suspense fallback={<Loader />}>
          <ContentDeleteActionsTableAdministratorsStaffAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
