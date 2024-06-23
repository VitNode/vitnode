import { Pencil } from "lucide-react";
import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "vitnode-frontend/components";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/loader";
import { ShowCoreLanguages } from "@/graphql/hooks";

const Content = React.lazy(async () =>
  import("../../create-edit/create-edit").then(module => ({
    default: module.CreateEditLangAdmin,
  })),
);

export const EditActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("edit")}>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content data={data} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
