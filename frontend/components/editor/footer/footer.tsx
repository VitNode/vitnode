import {
  LanguageSelectFooterEditor,
  type LanguageSelectFooterEditorProps
} from "./language-select";
import { FilesButtonFooterEditor } from "./files/button";
import { ListFilesFooterEditor } from "./files/list";
import { useEditorState } from "../hooks/use-editor-state";

interface Props extends LanguageSelectFooterEditorProps {
  disableLanguage?: boolean;
}

export const FooterEditor = ({
  disableLanguage,
  selectedLanguage,
  setSelectedLanguage
}: Props) => {
  const { allowUploadFiles, files } = useEditorState();

  return (
    <div className="bg-background p-2 rounded-b-md">
      <div className="flex items-center gap-2 justify-between flex-wrap w-full [&>*]:w-full [&>*]:sm:w-auto">
        {!disableLanguage && (
          <LanguageSelectFooterEditor
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}

        {allowUploadFiles && <FilesButtonFooterEditor />}
      </div>

      {files.length > 0 && <ListFilesFooterEditor />}
    </div>
  );
};
