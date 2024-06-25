import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Alert,
  AlertDescription,
  AlertTitle,
} from "vitnode-frontend/components";
import { CONFIG } from "vitnode-frontend/helpers";

interface Props {
  isPending: boolean;
  onClick: () => void;
  openSubmitDialog: boolean;
  setOpenSubmitDialog: (open: boolean) => void;
}

export const SubmitContentThemeEditor = ({
  isPending,
  onClick,
  openSubmitDialog,
  setOpenSubmitDialog,
}: Props) => {
  const t = useTranslations("core.theme_editor.submit");
  const tCore = useTranslations("core");

  return (
    <AlertDialog open={openSubmitDialog} onOpenChange={setOpenSubmitDialog}>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size="sm">
          {tCore("save")}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tCore("are_you_sure")}</AlertDialogTitle>
          <AlertDialogDescription>{t("desc")}</AlertDialogDescription>

          {CONFIG.node_development && (
            <Alert>
              <Check />
              <AlertTitle>{t("dev.title")}</AlertTitle>
              <AlertDescription>{t("dev.desc")}</AlertDescription>
            </Alert>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline">
              {tCore("cancel")}
            </Button>
          </AlertDialogCancel>

          <Button variant="destructive" onClick={onClick} loading={isPending}>
            {t("submit")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
