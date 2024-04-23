import type { Editor } from "@tiptap/react";
import { useState } from "react";

import {
  LanguageSelectFooterEditor,
  type LanguageSelectFooterEditorProps
} from "./language-select";
import { FilesButtonFooterEditor } from "./files/button";
import { ListFilesFooterEditor } from "./files/list";
import { Separator } from "@/components/ui/separator";

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
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="bg-background p-2 rounded-b-md">
      <div className="flex items-center gap-2 justify-between">
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
        <>
          <Separator className="my-2" />

          <ListFilesFooterEditor files={files} setFiles={setFiles} />
        </>
      )}
    </div>
  );
};
