import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction
} from "react";
import type { Editor } from "@tiptap/react";

import type { FileStateEditor } from "../extensions/files/files";
import type {
  UploadFilesHandlerArgs,
  UploadFilesHandlerEditorArgs
} from "../extensions/files/hooks/use-upload-files-handler-editor.ts";
import type { TextLanguage } from "@/graphql/hooks";

interface Args extends Omit<UploadFilesHandlerEditorArgs, "value"> {
  editor: Editor;
  files: FileStateEditor[];
  onChange: (value: TextLanguage[] | string) => void;
  selectedLanguage: string;
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
  uploadFiles: (args: UploadFilesHandlerArgs) => Promise<void>;
  value: string | TextLanguage[];
}

export const EditorStateContext = createContext<Args>({
  files: [],
  editor: {} as Editor,
  uploadFiles: async () => {},
  value: [],
  onChange: () => {},
  selectedLanguage: "",
  setFiles: () => {}
});

export const useEditorState = () => useContext(EditorStateContext);
