import { StringLanguage } from '@/graphql/types';
import { Editor } from '@tiptap/react';
import React from 'react';

import { FileStateEditor } from '../extensions/files/files';
import {
  UploadFilesHandlerArgs,
  UploadFilesHandlerEditorArgs,
} from '../extensions/files/hooks/use-upload-files-handler-editor.ts';

interface Args extends Omit<UploadFilesHandlerEditorArgs, 'value'> {
  editor: Editor;
  files: FileStateEditor[];
  onChange: (value: string | StringLanguage[]) => void;
  selectedLanguage: string;
  setFiles: React.Dispatch<React.SetStateAction<FileStateEditor[]>>;
  uploadFiles: (args: UploadFilesHandlerArgs) => Promise<void>;
  value: string | StringLanguage[];
}

export const EditorStateContext = React.createContext<Args>({
  files: [],
  editor: {} as Editor,
  uploadFiles: async () => {},
  value: [],
  onChange: () => {},
  selectedLanguage: '',
  setFiles: () => {},
});

export const useEditorState = () => React.useContext(EditorStateContext);
