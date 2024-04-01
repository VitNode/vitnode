import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import type { ShowAdminPlugins } from "@/graphql/hooks";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/loader";

export const UploadPluginActionsAdmin = (
  props: Pick<ShowAdminPlugins, "code" | "name">
) => {
  const t = useTranslations("core");

  const Content = lazy(() =>
    import("../../upload/upload").then((module) => ({
      default: module.UploadPluginAdmin
    }))
  );

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                ariaLabel={t("upload_new_version")}
              >
                <Upload />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{t("upload_new_version")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-xl">
        <Suspense fallback={<Loader />}>
          <Content data={props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
