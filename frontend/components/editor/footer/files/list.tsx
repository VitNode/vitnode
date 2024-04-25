import type { Dispatch, SetStateAction } from "react";

import { ItemListFilesFooterEditor } from "./item/item";
import type { FileStateEditor } from "./button";
import { cn } from "@/functions/classnames";

interface Props {
  files: FileStateEditor[];
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
}

export const ListFilesFooterEditor = ({ files, setFiles }: Props) => {
  return (
    <ul className="space-y-2 mt-2">
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
            <ItemListFilesFooterEditor setFiles={setFiles} {...item} />
          </li>
        );
      })}
    </ul>
  );
};
