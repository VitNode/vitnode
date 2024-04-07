import type { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useGlobals } from "@/hooks/core/use-globals";

export interface LanguageSelectFooterEditorProps {
  editor: Editor;
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
}

export const LanguageSelectFooterEditor = ({
  editor,
  selectedLanguage,
  setSelectedLanguage
}: LanguageSelectFooterEditorProps) => {
  const t = useTranslations("core.editor");
  const { languages } = useGlobals();

  if (languages.length <= 1) return null;

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "w-auto border-0 [&>svg]:w-5 [&>svg]:h-5 shadow-none"
              })}
            >
              <SelectValue />
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent side="top">{t("change_language")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent onCloseAutoFocus={() => editor.commands.focus()}>
        {languages.map(language => (
          <SelectItem key={language.code} value={`${language.code}`}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
