import * as React from "react";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Loader } from "@/components/loader";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionPost
  }))
);

interface Props {
  id: number;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DeleteActionPost = ({ id, open, setOpen }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content id={id} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
