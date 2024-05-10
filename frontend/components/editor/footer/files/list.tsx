import { ItemListFilesFooterEditor } from "./item/item";
import { cn } from "@/functions/classnames";

import { useEditorState } from "../../hooks/use-editor-state";

export const ListFilesFooterEditor = () => {
  const { files } = useEditorState();

  return (
    <ul className="space-y-2 mt-2">
      {files.map(item => {
        return (
          <li
            key={`editor_file_${item.id}`}
            className={cn(
              "bg-card px-5 py-4 border rounded-lg flex gap-5 flex-col md:flex-row items-center shadow-sm transition-colors",
              {
                "border-destructive": item.error
              }
            )}
          >
            <ItemListFilesFooterEditor {...item} />
          </li>
        );
      })}
    </ul>
  );
};
