import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ShowCoreLanguages } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentUpdateActionsTableLangsCoreAdmin
  }))
);

interface Props extends Pick<ShowCoreLanguages, "code" | "name"> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UpdateActionsTableLangsCoreAdmin = ({
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
