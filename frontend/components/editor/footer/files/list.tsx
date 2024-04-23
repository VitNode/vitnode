import type { Dispatch, SetStateAction } from "react";

import { ItemListFilesFooterEditor } from "./item";

interface Props {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export const ListFilesFooterEditor = ({ files }: Props) => {
  return (
    <ul>
      {files.map(item => {
        return (
          <ItemListFilesFooterEditor
            key={`${item.name}${item.size}${item.type}`}
          />
        );
      })}
    </ul>
  );
};
