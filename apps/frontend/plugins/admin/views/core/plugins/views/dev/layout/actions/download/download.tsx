import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Button } from "vitnode-frontend/components";

import { Loader } from "@/components/loader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShowAdminPlugins } from "@/graphql/hooks";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDownloadActionDevPluginAdmin,
  })),
);

export const DownloadActionDevPluginAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download /> {t("download")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
