import { useTranslations } from "next-intl";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ShowAdminNavPluginsObj } from "@/graphql/hooks";
import { SubmitDeleteActionTableNavDevPluginAdmin } from "./submit";
import { useDeleteNavPluginAdmin } from "./hooks/use-delete-nav-plugin-admin";

export interface ContentDeleteActionTableNavDevPluginAdminProps
  extends Pick<ShowAdminNavPluginsObj, "code" | "id"> {}

export const ContentDeleteActionTableNavDevPluginAdmin = ({
  code,
  id
}: ContentDeleteActionTableNavDevPluginAdminProps) => {
  const t = useTranslations("admin.core.plugins.dev.nav.delete");
  const tCore = useTranslations("core");
  const { onSubmit } = useDeleteNavPluginAdmin({ code, id });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore("are_you_sure")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich("desc", {
            code: () => (
              <span className="font-bold text-foreground">{code}</span>
            )
          })}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore("cancel")}
          </Button>
        </AlertDialogCancel>
        <SubmitDeleteActionTableNavDevPluginAdmin />
      </AlertDialogFooter>
    </form>
  );
};
