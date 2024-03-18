"use client";

import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CONFIG } from "@/config";

const Content = lazy(() =>
  import("../upload/upload").then(module => ({
    default: module.UploadPluginAdmin
  }))
);

export const UploadActionPluginAdmin = () => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={CONFIG.node_development ? "ghost" : "default"}>
          <Upload />
          {t("upload")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <Suspense fallback={<Loader />}>
          <Content />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
