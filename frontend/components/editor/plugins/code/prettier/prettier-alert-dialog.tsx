import { useTranslations } from "next-intl";
import { useState } from "react";

import type { PrettierFormatError } from "./prettier-button-code-action";
import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

export interface PrettierAlertDialogProps {
  prettierError: PrettierFormatError | null;
}

export const PrettierAlertDialog = ({
  prettierError
}: PrettierAlertDialogProps): JSX.Element | null => {
  const t = useTranslations("core.editor.prettier");
  const tCore = useTranslations("core");
  const [value, setValue] = useState(prettierError?.codeFrame ?? "");

  if (!prettierError) return null;

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{t("error_title")}</AlertDialogTitle>
      </AlertDialogHeader>

      <p>
        {prettierError.cause.code ?? prettierError.cause.name}:{" "}
        {prettierError.cause.reasonCode ?? prettierError.cause.reason}
      </p>

      <Textarea
        onChange={(e): void => setValue(e.target.value)}
        value={value}
      />

      <AlertDialogFooter>
        <AlertDialogCancel>{tCore("close")}</AlertDialogCancel>
      </AlertDialogFooter>
    </>
  );
};
