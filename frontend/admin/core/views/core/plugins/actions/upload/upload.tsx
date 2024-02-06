"use client";

import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentUploadActionsPluginsAdmin
  }))
);

export const UploadActionPluginAdmin = () => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          {t("upload")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <Suspense fallback={<Loader />}>
          <Content />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
