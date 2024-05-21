import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import type { ShowForumForumsAdminWithChildren } from "../../hooks/use-forum-forums-admin-api";

const Content = lazy(async () =>
  import("../../../create-edit/create-edit").then(module => ({
    default: module.CreateEditForumAdmin
  }))
);

export const EditActionForumAdmin = (
  props: Omit<ShowForumForumsAdminWithChildren, "children">
) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("edit")}>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl">
        <Suspense fallback={<Loader />}>
          <Content data={props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
