import {
  LanguageSelectFooterEditor,
  LanguageSelectFooterEditorProps
} from "./language-select";
import { FilesButtonFooterEditor } from "./files/button";
import { ListFilesFooterEditor } from "./files/list";
import { useEditorState } from "../hooks/use-editor-state";
import { useGlobals } from "@/plugins/core/hooks/use-globals";
import { useSession } from "@/plugins/core/hooks/use-session";

interface Props extends LanguageSelectFooterEditorProps {
  disableLanguage?: boolean;
}

export const FooterEditor = ({
  disableLanguage,
  selectedLanguage,
  setSelectedLanguage
}: Props) => {
  const { files: permissionFiles } = useSession();
  const { allowUploadFiles, files } = useEditorState();
  const { config } = useGlobals();

  return (
    <div className="bg-background p-2 rounded-b-md">
      <div className="flex items-center gap-2 justify-between flex-wrap w-full [&>*]:w-full [&>*]:sm:w-auto">
        {!disableLanguage && (
          <LanguageSelectFooterEditor
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}

        {allowUploadFiles &&
          config.editor.files.allow_type !== "none" &&
          permissionFiles.allow_upload && <FilesButtonFooterEditor />}
      </div>

      {files.length > 0 && <ListFilesFooterEditor />}
    </div>
  );
};
