import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import * as React from "react";
import {
  Button,
  Loader,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "vitnode-frontend/components";

const CreateEditFormAdministratorsStaffAdmin = React.lazy(async () =>
  import("../create-edit-form/create-edit-form").then(module => ({
    default: module.CreateEditFormAdministratorsStaffAdmin,
  })),
);

export const CreateActionsAdministratorsStaffAdmin = () => {
  const t = useTranslations("core");

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            {t("create")}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-4xl">
          <React.Suspense fallback={<Loader />}>
            <CreateEditFormAdministratorsStaffAdmin />
          </React.Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};
