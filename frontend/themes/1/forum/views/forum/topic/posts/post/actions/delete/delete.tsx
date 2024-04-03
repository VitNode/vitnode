import { Suspense, lazy } from "react";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Loader } from "@/components/loader";

const Content = lazy(() =>
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
        <Suspense fallback={<Loader />}>
          <Content id={id} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
