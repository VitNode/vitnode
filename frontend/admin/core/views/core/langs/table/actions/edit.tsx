import { Pencil } from "lucide-react";
import { Suspense, lazy } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/loader";
import type { ShowCoreLanguages } from "@/graphql/hooks";

const Content = lazy(() =>
  import("../../create-edit/create-edit").then((module) => ({
    default: module.CreateEditLangAdmin
  }))
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
        <Suspense fallback={<Loader />}>
          <Content data={data} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
