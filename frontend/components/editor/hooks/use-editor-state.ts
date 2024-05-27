import * as React from "react";
import { Editor } from "@tiptap/react";

import { FileStateEditor } from "../extensions/files/files";
import {
  UploadFilesHandlerArgs,
  UploadFilesHandlerEditorArgs
} from "../extensions/files/hooks/use-upload-files-handler-editor.ts";
import { TextLanguage } from "@/graphql/hooks";

interface Args extends Omit<UploadFilesHandlerEditorArgs, "value"> {
  editor: Editor;
  files: FileStateEditor[];
  onChange: (value: TextLanguage[] | string) => void;
  selectedLanguage: string;
  setFiles: React.Dispatch<React.SetStateAction<FileStateEditor[]>>;
  uploadFiles: (args: UploadFilesHandlerArgs) => Promise<void>;
  value: TextLanguage[] | string;
}

export const EditorStateContext = React.createContext<Args>({
  files: [],
  editor: {} as Editor,
  uploadFiles: async () => {},
  value: [],
  onChange: () => {},
  selectedLanguage: "",
  setFiles: () => {}
});

export const useEditorState = () => React.useContext(EditorStateContext);
