"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  Button,
  Loader,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "vitnode-frontend/components";

const Content = React.lazy(async () =>
  import("../create-edit/create-edit").then(module => ({
    default: module.CreateEditCategoryBlogAdmin,
  })),
);

export const CreateCategoryBlogAdmin = () => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t("create")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
