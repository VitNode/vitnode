"use client";

import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ShowAdminThemes } from "@/graphql/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Content = lazy(() =>
  import("./content").then((module) => ({
    default: module.ContentEditThemeActionsAdmin
  }))
);

export const EditThemeActionsAdmin = (props: ShowAdminThemes) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" ariaLabel={t("edit")}>
                <Pencil />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{t("edit")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <Suspense fallback={<Loader />}>
          <Content {...props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
