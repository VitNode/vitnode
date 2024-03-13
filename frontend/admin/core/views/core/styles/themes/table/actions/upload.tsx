import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { ShowAdminThemes } from "@/graphql/hooks";

const Content = lazy(() =>
  import("../../upload/upload").then(module => ({
    default: module.UploadThemeAdmin
  }))
);

export const UploadThemeActionsAdmin = (
  props: Pick<ShowAdminThemes, "id" | "name">
) => {
  const t = useTranslations("core");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" ariaLabel={t("upload_new_version")}>
          <Upload />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <Suspense fallback={<Loader />}>
          <Content data={props} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
