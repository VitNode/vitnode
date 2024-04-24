import { Loader } from "@/components/loader";
import type { FileStateEditor } from "./button";

export const ItemListFilesFooterEditor = ({
  data,
  file,
  isLoading
}: FileStateEditor) => {
  if (isLoading || !data) {
    return (
      <div>
        <Loader />
        <div>{file.name}</div>
      </div>
    );
  }

  return <div>{data.file_name}</div>;
};
