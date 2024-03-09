import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

export const DownloadPluginActionsAdmin = (
  props: DownloadPluginActionsAdminProps
) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("download")}>
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
