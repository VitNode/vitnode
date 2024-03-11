import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ShowAdminPlugins } from "@/graphql/hooks";

const Content = lazy(() =>
  import("../../create-edit/create-edit").then(module => ({
    default: module.CreateEditPluginAdmin
  }))
);

interface Props extends ShowAdminPlugins {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const EditPluginActionsAdmin = ({ open, setOpen, ...props }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <Suspense fallback={<Loader />}>
          <Content data={props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
