import { useTranslations } from "next-intl";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SubmitContentDeleteThemeActionsAdmin } from "./submit";
import { useDeleteThemeAdmin } from "./hooks/use-delete-theme-admin";
import { ShowAdminThemes } from "@/utils/graphql/hooks";

export const ContentDeleteThemeActionsAdmin = ({
  author,
  id,
  name
}: Pick<ShowAdminThemes, "author" | "id" | "name">) => {
  const t = useTranslations("admin.core.styles.themes.delete");
  const tCore = useTranslations("core");
  const { onSubmit } = useDeleteThemeAdmin({ name, id });

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore("are_you_absolutely_sure")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich("desc", {
            name: () => (
              <span className="text-foreground font-bold">{name}</span>
            ),
            author: () => (
              <span className="text-foreground font-bold">{author}</span>
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

        <SubmitContentDeleteThemeActionsAdmin />
      </AlertDialogFooter>
    </form>
  );
};
