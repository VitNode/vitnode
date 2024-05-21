import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ShowCoreLanguages } from "@/graphql/hooks";

const Content = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDownloadActionsTableLangsCoreAdmin
  }))
);

export const DownloadActionsTableLangsCoreAdmin = (
  props: Pick<ShowCoreLanguages, "code">
) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("download")}>
          <Download />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
