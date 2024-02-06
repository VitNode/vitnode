import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Superscript } from "lucide-react";
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

export const SuperscriptButtonEditor = () => {
  const t = useTranslations("core.editor.text");
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsSuperscript(selection.hasFormat("superscript"));
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t("superscript")}
              onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
              }
              pressed={isSuperscript}
              className="size-9"
            >
              <Superscript />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>{t("superscript")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
