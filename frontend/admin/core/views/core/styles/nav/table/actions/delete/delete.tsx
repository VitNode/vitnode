import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ShowCoreNav } from "@/graphql/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Content = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionTableNavAdmin
  }))
);

export const DeleteActionTableNavAdmin = (
  props: Pick<ShowCoreNav, "children" | "id" | "name">
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
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
