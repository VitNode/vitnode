import { Suspense } from "react";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Loader } from "@/components/loader";
import { Content } from "./content";

interface Props {
  id: number;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const Delete = ({ id, open, setOpen }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <Content id={id} setOpen={setOpen}></Content>
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
