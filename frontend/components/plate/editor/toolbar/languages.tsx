import { focusEditor, useEditorRef } from '@udecode/plate-common';
import { ChevronDown, Languages } from 'lucide-react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useGlobals } from '@/hooks/core/use-globals';

export interface LanguagesToolbarEditorProps {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
}

export const LanguagesToolbarEditor = ({
  selectedLanguage,
  setSelectedLanguage
}: LanguagesToolbarEditorProps) => {
  const { languages } = useGlobals();
  const editor = useEditorRef();
  const currentLanguage = languages.find(language => language.id === selectedLanguage);

  if (languages.length <= 1 || !currentLanguage) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton className="w-48 p-3 justify-start gap-2">
          <Languages />
          <span className="truncate">{currentLanguage.name}</span>
          <ChevronDown className="ml-auto" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={e => {
            setSelectedLanguage(e);
            focusEditor(editor);
          }}
        >
          {languages.map(language => (
            <DropdownMenuRadioItem key={language.id} value={language.id}>
              {language.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
