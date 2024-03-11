import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ShowAdminPlugins } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentDownloadPluginActionsAdmin
  }))
);

export interface DownloadPluginActionsAdminProps
  extends Pick<
    ShowAdminPlugins,
    "code" | "name" | "version_code" | "version"
  > {}

interface Props extends DownloadPluginActionsAdminProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DownloadPluginActionsAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
