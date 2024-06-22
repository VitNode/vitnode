"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Content = React.lazy(async () =>
  import("../create-edit/create-edit").then(module => ({
    default: module.ContentCreateEditNavAdmin,
  })),
);

export const CreateActionNavAdmin = () => {
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
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
