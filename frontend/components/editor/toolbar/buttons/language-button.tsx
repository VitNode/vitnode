import { useTranslations } from 'next-intl';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components//ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components//ui/tooltip';
import { useGlobals } from '@/hooks/core/use-globals';

interface Props {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
}

export const LanguageButtonEditor = ({ selectedLanguage, setSelectedLanguage }: Props) => {
  const t = useTranslations('core.editor');
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
                variant: 'ghost',
                className: 'w-auto border-0 [&>svg]:w-5 [&>svg]:h-5'
              })}
            >
              <SelectValue />
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">{t('change_language')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent onCloseAutoFocus={() => editor.focus()}>
        {languages.map(language => (
          <SelectItem key={language.id} value={`${language.code}`}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
