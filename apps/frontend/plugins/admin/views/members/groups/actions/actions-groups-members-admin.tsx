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

const CreateEditFormGroupsMembersAdmin = React.lazy(async () =>
  import("../create-edit-form/create-edit-form-groups-members-admin").then(
    module => ({
      default: module.CreateEditFormGroupsMembersAdmin,
    }),
  ),
);

export const ActionsGroupsMembersAdmin = () => {
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
          <CreateEditFormGroupsMembersAdmin />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
