"use client";

import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ShowCoreNav } from "@/graphql/hooks";

const Content = lazy(() =>
  import("../../create-edit/create-edit").then(module => ({
    default: module.ContentCreateEditNavAdmin
  }))
);

export const EditActionTableNavAdmin = (
  props: Omit<ShowCoreNav, "children">
) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" tooltip={t("edit")}>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <Suspense fallback={<Loader />}>
          <Content data={props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
