import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type { FileStateEditor } from "../button";
import { Button } from "@/components/ui/button";
import { cn } from "@/functions/classnames";
import { IconItemListFilesFooterEditor } from "./icon";
import { ContentItemListFilesFooterEditor } from "./content";

export interface ItemListFilesFooterEditorProps
  extends Omit<FileStateEditor, "file"> {
  file?: File;
}

export const ItemListFilesFooterEditor = ({
  data,
  error,
  file,
  isLoading
}: ItemListFilesFooterEditorProps) => {
  const t = useTranslations("core.editor.files");

  return (
    <>
      <div
        className={cn(
          "rounded-lg flex items-center size-10 justify-center relative overflow-hidden flex-shrink-0",
          {
            "w-20 h-14": data?.width && data?.height && !isLoading && !error
          }
        )}
      >
        <IconItemListFilesFooterEditor
          isLoading={isLoading}
          isError={!!error}
          src={
            data && data.width && data.height
              ? `/${data.dir_folder}/${data.file_name}`
              : null
          }
        />
      </div>

      <div className="flex-1 min-w-0 md:truncate break-all">
        <span className="leading-tight">
          {file?.name ?? data?.file_name ?? "Error!"}
        </span>

        <div className="text-sm text-muted-foreground space-x-2">
          <ContentItemListFilesFooterEditor
            data={data}
            file={file}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>

      {!error && !isLoading && (
        <div className="flex gap-1 items-center flex-wrap flex-shrink-0">
          <Button variant="ghost">
            <Plus /> {t("insert")}
          </Button>
          <Button size="icon" variant="destructiveGhost" ariaLabel="Delete">
            <Trash2 />
          </Button>
        </div>
      )}
    </>
  );
};
