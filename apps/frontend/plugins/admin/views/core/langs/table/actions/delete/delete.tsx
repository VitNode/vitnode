import * as React from "react";
import { AlertDialog, AlertDialogContent } from "vitnode-frontend/components";

import { Loader } from "@/components/loader";
import { ShowCoreLanguages } from "@/graphql/hooks";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsTableLangsCoreAdmin,
  })),
);

interface Props extends Pick<ShowCoreLanguages, "code" | "name"> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DeleteActionsTableLangsCoreAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
