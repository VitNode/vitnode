import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import type { ShowCoreLanguages } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentDeleteActionsTableLangsCoreAdmin
  }))
);

export const DeleteActionsTableLangsCoreAdmin = (
  props: Pick<ShowCoreLanguages, "code" | "name">
) => {
  const t = useTranslations("core");
  const locale = useLocale();

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="destructiveGhost"
                size="icon"
                tooltip={t("delete")}
                disabled={locale === props.code}
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
