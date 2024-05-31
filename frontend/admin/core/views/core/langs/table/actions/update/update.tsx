import * as React from "react";

import { Loader } from "@/components/loader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ShowCoreLanguages } from "@/utils/graphql/hooks";

const Content = React.lazy(async () =>
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
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
