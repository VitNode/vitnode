import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Subscript } from "lucide-react";
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

export const SubscriptButtonEditor = () => {
  const t = useTranslations("core.editor.text");
  const [isSubscript, setIsSubscript] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsSubscript(selection.hasFormat("subscript"));
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t("subscript")}
              onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
              }
              pressed={isSubscript}
              className="size-9"
            >
              <Subscript />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>{t("subscript")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
