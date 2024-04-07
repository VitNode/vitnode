import type { Editor } from "@tiptap/react";

import {
  LanguageSelectFooterEditor,
  type LanguageSelectFooterEditorProps
} from "./language-select";

interface Props extends LanguageSelectFooterEditorProps {
  editor: Editor;
  disableLanguage?: boolean;
}

export const FooterEditor = ({
  disableLanguage,
  editor,
  selectedLanguage,
  setSelectedLanguage
}: Props) => {
  return (
    <div className="bg-background p-1 rounded-b-md">
      {!disableLanguage && (
        <LanguageSelectFooterEditor
          editor={editor}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      )}
    </div>
  );
};
