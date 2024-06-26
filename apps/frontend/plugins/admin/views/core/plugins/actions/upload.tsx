"use client";

import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "vitnode-frontend/components/ui/dialog";
import { Button } from "vitnode-frontend/components/ui/button";
import { Loader } from "vitnode-frontend/components/ui/loader";
import { CONFIG } from "vitnode-frontend/helpers/config-with-env";

const Content = React.lazy(async () =>
  import("../upload/upload").then(module => ({
    default: module.UploadPluginAdmin,
  })),
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
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
