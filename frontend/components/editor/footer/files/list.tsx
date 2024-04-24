import type { Dispatch, SetStateAction } from "react";

import { ItemListFilesFooterEditor } from "./item";
import type { FileStateEditor } from "./button";

interface Props {
  files: FileStateEditor[];
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
}

export const ListFilesFooterEditor = ({ files }: Props) => {
  return (
    <ul className="space-y-5">
      {files.map(item => {
        return (
          <li
            key={`${item.file.name}${item.file.size}${item.file.type}`}
            className="bg-card p-2"
          >
            <ItemListFilesFooterEditor {...item} />
          </li>
        );
      })}
    </ul>
  );
};
