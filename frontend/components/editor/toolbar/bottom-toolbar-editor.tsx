import { LanguageButtonEditor } from './buttons/language-button';

interface Props {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  disableLanguage?: boolean;
}

export const BottomToolbarEditor = ({
  disableLanguage,
  selectedLanguage,
  setSelectedLanguage
}: Props) => {
  return (
    <div className="border-t border-input p-2 bg-background rounded-b-sm flex gap-2 items-center flex-wrap justify-between">
      {!disableLanguage && (
        <LanguageButtonEditor
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      )}
    </div>
  );
};
