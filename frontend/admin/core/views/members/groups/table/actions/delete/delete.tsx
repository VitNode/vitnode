import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { Suspense, lazy } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import type { ShowAdminGroups } from "@/graphql/hooks";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Loader } from "@/components/loader";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentDeleteGroupsMembersDialogAdmin
  }))
);

export const DeleteGroupsMembersDialogAdmin = (
  props: Pick<ShowAdminGroups, "id" | "name" | "protected">
) => {
  const t = useTranslations("core");

  if (props.protected) return null;

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="destructiveGhost"
                size="icon"
                ariaLabel={t("delete")}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>

          <TooltipContent>{t("delete")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
