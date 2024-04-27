import type { Editor } from "@tiptap/react";
import { useState } from "react";

import {
  LanguageSelectFooterEditor,
  type LanguageSelectFooterEditorProps
} from "./language-select";
import { FilesButtonFooterEditor, type FileStateEditor } from "./files/button";
import { ListFilesFooterEditor } from "./files/list";

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
  const [files, setFiles] = useState<FileStateEditor[]>([]);

  return (
    <div className="bg-background p-2 rounded-b-md">
      <div className="flex items-center gap-2 justify-between flex-wrap w-full [&>*]:w-full [&>*]:sm:w-auto">
        {!disableLanguage && (
          <LanguageSelectFooterEditor
            editor={editor}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}

        <FilesButtonFooterEditor setFiles={setFiles} />
      </div>

      {files.length > 0 && (
        <ListFilesFooterEditor
          files={files}
          setFiles={setFiles}
          editor={editor}
        />
      )}
    </div>
  );
};
