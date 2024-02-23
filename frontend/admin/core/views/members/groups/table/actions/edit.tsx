import { Pencil } from "lucide-react";
import { Suspense, lazy } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/loader";
import type { ShowAdminGroups } from "@/graphql/hooks";

const CreateEditFormGroupsMembersAdmin = lazy(() =>
  import("../../create-edit-form/create-edit-form-groups-members-admin").then(
    module => ({
      default: module.CreateEditFormGroupsMembersAdmin
    })
  )
);

interface Props {
  data: Pick<ShowAdminGroups, "id" | "name">;
}

export const EditGroupsMembersDialogAdmin = ({ data }: Props) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" tooltip={t("edit")}>
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <Suspense fallback={<Loader />}>
          <CreateEditFormGroupsMembersAdmin data={data} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
