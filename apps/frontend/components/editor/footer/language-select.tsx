import { useTranslations } from "next-intl";
import {
  buttonVariants,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "vitnode-frontend/components";

import { useGlobals } from "@/plugins/core/hooks/use-globals";
import { useEditorState } from "../hooks/use-editor-state";

export interface LanguageSelectFooterEditorProps {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
}

export const LanguageSelectFooterEditor = ({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageSelectFooterEditorProps) => {
  const t = useTranslations("core.editor");
  const { languages: languagesFromGlobal } = useGlobals();
  const { editor } = useEditorState();
  const languages = languagesFromGlobal.filter(item => item.allow_in_input);

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
                className:
                  "w-auto border-0 shadow-none [&>svg]:h-5 [&>svg]:w-5",
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
