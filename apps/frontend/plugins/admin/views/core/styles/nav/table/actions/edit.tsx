"use client";

import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "vitnode-frontend/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "vitnode-frontend/components/ui/dialog";
import { Button } from "vitnode-frontend/components/ui/button";
import { Loader } from "vitnode-frontend/components/ui/loader";

import { ShowCoreNav } from "@/graphql/hooks";

const Content = React.lazy(async () =>
  import("../../create-edit/create-edit").then(module => ({
    default: module.ContentCreateEditNavAdmin,
  })),
);

export const EditActionTableNavAdmin = (
  props: Omit<ShowCoreNav, "children">,
) => {
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
        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
