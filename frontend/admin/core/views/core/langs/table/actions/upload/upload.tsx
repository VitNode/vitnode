import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ShowCoreLanguages } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentUploadActionsTableLangsCoreAdmin
  }))
);

interface Props extends Pick<ShowCoreLanguages, "code"> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UploadActionsTableLangsCoreAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
