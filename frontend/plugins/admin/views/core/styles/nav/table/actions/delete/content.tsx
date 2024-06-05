import { useTranslations } from "next-intl";
import { Trash } from "lucide-react";

import { ShowCoreNav } from "@/utils/graphql/hooks";
import { useDeleteNavAdmin } from "./hooks/use-delete-nav-admin";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SubmitDeleteActionTableNavAdmin } from "./submit";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ContentDeleteActionTableNavAdmin = ({
  children,
  id,
  name
}: Pick<ShowCoreNav, "children" | "id" | "name">) => {
  const t = useTranslations("admin.core.styles.nav.delete");
  const tCore = useTranslations("core");
  const { onSubmit } = useDeleteNavAdmin({ id, name });
  const { convertText } = useTextLang();

  return (
    <form action={onSubmit}>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore("are_you_sure")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t.rich("desc", {
            name: () => (
              <span className="text-foreground font-bold">
                {convertText(name)}
              </span>
            )
          })}
        </AlertDialogDescription>

        {children.length > 0 && (
          <Alert variant="destructive">
            <Trash className="size-4" />
            <AlertTitle>{tCore("hands_up")}</AlertTitle>
            <AlertDescription>{t("desc_with_children")}</AlertDescription>
          </Alert>
        )}
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel asChild>
          <Button type="button" variant="outline">
            {tCore("cancel")}
          </Button>
        </AlertDialogCancel>
        <SubmitDeleteActionTableNavAdmin />
      </AlertDialogFooter>
    </form>
  );
};
