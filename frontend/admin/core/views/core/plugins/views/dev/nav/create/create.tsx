"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Suspense, lazy } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/loader";

const Content = lazy(() =>
  import("../create-edit/create-edit").then((module) => ({
    default: module.CreateEditNavDevPluginAdmin
  }))
);

export const CreateNavDevPluginAdmin = () => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t("create")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <Suspense fallback={<Loader />}>
          <Content />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
