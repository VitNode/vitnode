import { useTranslations } from "next-intl";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components//ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components//ui/tooltip";
import { useGlobals } from "@/hooks/core/use-globals";

interface Props {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
}

export const LanguageButtonEditor = ({
  selectedLanguage,
  setSelectedLanguage
}: Props): JSX.Element | null => {
  const t = useTranslations("core.editor");
  const { languages } = useGlobals();
  const [editor] = useLexicalComposerContext();

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
                className: "w-auto border-0 [&>svg]:w-5 [&>svg]:h-5"
              })}
            >
              <SelectValue />
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent side="top">{t("change_language")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent onCloseAutoFocus={(): void => editor.focus()}>
        {languages.map(
          (language): JSX.Element => (
            <SelectItem key={language.code} value={`${language.code}`}>
              {language.name}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
};
