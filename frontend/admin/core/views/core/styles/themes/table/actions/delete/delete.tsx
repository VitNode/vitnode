import * as React from "react";

import { Loader } from "@/components/loader";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { ShowAdminThemes } from "@/graphql/hooks";

const ContentDeleteThemeActionsAdmin = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteThemeActionsAdmin
  }))
);

interface Props extends Pick<ShowAdminThemes, "author" | "id" | "name"> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DeleteThemeActionsAdmin = ({ open, setOpen, ...props }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <ContentDeleteThemeActionsAdmin {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
