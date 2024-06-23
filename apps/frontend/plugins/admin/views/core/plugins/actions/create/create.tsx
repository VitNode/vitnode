"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.CreatePluginAdmin,
  })),
);

export const CreateActionPluginAdmin = () => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t("create")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
