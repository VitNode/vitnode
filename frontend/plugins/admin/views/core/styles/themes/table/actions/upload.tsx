import * as React from "react";

import { Loader } from "@/components/loader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ShowAdminThemes } from "@/graphql/hooks";

const Content = React.lazy(async () =>
  import("../../upload/upload").then(module => ({
    default: module.UploadThemeAdmin
  }))
);

interface Props extends Pick<ShowAdminThemes, "id" | "name"> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UploadThemeActionsAdmin = ({ open, setOpen, ...props }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
