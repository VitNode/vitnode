import type { Editor } from "@tiptap/react";

import {
  LanguageSelectFooterEditor,
  type LanguageSelectFooterEditorProps
} from "./language-select";
import { FilesButtonFooterEditor } from "./files/files-button";

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
    <div className="bg-background p-1 rounded-b-md flex items-center gap-2 justify-between">
      {!disableLanguage && (
        <LanguageSelectFooterEditor
          editor={editor}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      )}

      <FilesButtonFooterEditor />
    </div>
  );
};
