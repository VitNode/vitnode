import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { ShowCoreLanguages } from "@/graphql/hooks";

const Content = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsTableLangsCoreAdmin
  }))
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
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
