import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
} from "vitnode-frontend/components";

import { Loader } from "@/components/loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContentDeleteActionFilesAdvancedCoreAdminProps } from "./content";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionFilesAdvancedCoreAdmin,
  })),
);

export const DeleteActionFilesAdvancedCoreAdmin = (
  props: ContentDeleteActionFilesAdvancedCoreAdminProps,
) => {
  const t = useTranslations("core");

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructiveGhost"
                size="icon"
                ariaLabel={t("delete")}
              >
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t("delete")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
