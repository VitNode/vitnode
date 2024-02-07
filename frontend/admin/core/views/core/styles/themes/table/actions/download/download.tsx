import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ActionsItemThemesAdminProps } from "../actions";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentDownloadThemeActionsAdmin
  }))
);

export const DownloadThemeActionsAdmin = (
  props: ActionsItemThemesAdminProps
) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" tooltip={t("download")}>
          <Download />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
