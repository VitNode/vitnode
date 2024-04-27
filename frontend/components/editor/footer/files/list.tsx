import type { Dispatch, SetStateAction } from "react";
import type { Editor } from "@tiptap/react";

import { ItemListFilesFooterEditor } from "./item/item";
import type { FileStateEditor } from "./button";
import { cn } from "@/functions/classnames";
import { AnimatePresenceClient } from "@/components/animations/animate-presence";
import { LiMotion } from "@/components/animations/div-motion";

interface Props {
  editor: Editor;
  files: FileStateEditor[];
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
}

export const ListFilesFooterEditor = ({ editor, files, setFiles }: Props) => {
  return (
    <AnimatePresenceClient key="editor_files">
      <ul className="space-y-2 mt-2">
        {files.map(item => {
          return (
            <LiMotion
              key={`editor_file_${item.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              layout
              className={cn(
                "bg-card px-5 py-4 border rounded-lg flex gap-5 flex-col md:flex-row items-center shadow-sm transition-colors",
                {
                  "border-destructive": item.error
                }
              )}
            >
              <ItemListFilesFooterEditor
                setFiles={setFiles}
                editor={editor}
                {...item}
              />
            </LiMotion>
          );
        })}
      </ul>
    </AnimatePresenceClient>
  );
};
