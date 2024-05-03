import { createContext, useContext } from "react";
import type { Editor } from "@tiptap/react";

import type { FileStateEditor } from "../extensions/files/files";

interface Args {
  editor: Editor;
  files: FileStateEditor[];
  uploadFiles: ({ files }: { files: FileStateEditor[] }) => Promise<void>;
}

export const EditorStateContext = createContext<Args>({
  files: [],
  editor: {} as Editor,
  uploadFiles: async () => {}
});

export const useEditorState = () => useContext(EditorStateContext);
