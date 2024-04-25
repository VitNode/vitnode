import type { Dispatch, SetStateAction } from "react";

import { ItemListFilesFooterEditor } from "./item/item";
import type { FileStateEditor } from "./button";
import { cn } from "@/functions/classnames";

interface Props {
  files: FileStateEditor[];
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
}

export const ListFilesFooterEditor = ({ files }: Props) => {
  return (
    <ul className="space-y-5 mt-2">
      {files.map(item => {
        return (
          <li
            key={`${item.file.name}${item.file.size}${item.file.type}`}
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
