import { useTranslations } from "next-intl";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SubmitContentDeletePluginActionsAdmin } from "./submit";
import type { ActionsItemPluginsAdminProps } from "../actions";
import { useDeletePluginAdmin } from "./hooks/use-delete-plugin-admin";

export const ContentDeletePluginActionsAdmin = ({
  author,
  code,
  name
}: ActionsItemPluginsAdminProps) => {
  const t = useTranslations("admin.core.plugins.delete");
  const tCore = useTranslations("core");
  const { onSubmit } = useDeletePluginAdmin({ code, name });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore("are_you_absolutely_sure")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich("desc", {
            name: () => (
              <span className="font-bold text-foreground">{name}</span>
            ),
            author: () => (
              <span className="font-bold text-foreground">{author}</span>
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

        <SubmitContentDeletePluginActionsAdmin />
      </AlertDialogFooter>
    </form>
  );
};
