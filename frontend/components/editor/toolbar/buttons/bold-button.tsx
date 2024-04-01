import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Bold } from "lucide-react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useUpdateStateEditor } from "../hooks/use-update-state-editor";

export const BoldButtonEditor = (): JSX.Element => {
  const t = useTranslations("core.editor.text");
  const [isBold, setIsBold] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: (): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsBold(selection.hasFormat("bold"));

      return true;
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t("bold")}
              onClick={(): boolean =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
              }
              pressed={isBold}
              className="size-9"
            >
              <Bold />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>{t("bold")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
