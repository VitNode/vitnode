import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  Button,
  Loader,
  Dialog,
  DialogContent,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "vitnode-frontend/components";

import { ShowAdminPlugins } from "@/graphql/hooks";

export const UploadPluginActionsAdmin = (
  props: Pick<ShowAdminPlugins, "code" | "name">,
) => {
  const t = useTranslations("core");

  const Content = React.lazy(async () =>
    import("../../upload/upload").then(module => ({
      default: module.UploadPluginAdmin,
    })),
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
        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
