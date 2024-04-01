import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Code } from "lucide-react";
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

export const CodeButtonEditor = (): JSX.Element => {
  const t = useTranslations("core.editor.text");
  const [isCode, setIsCode] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: (): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsCode(selection.hasFormat("code"));

      return true;
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t("code")}
              onClick={(): boolean =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
              }
              pressed={isCode}
              className="size-9"
            >
              <Code />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>{t("code")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
