import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { findChildren, type Editor } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";

import type { FileStateEditor } from "../button";
import { Button } from "@/components/ui/button";
import { cn } from "@/functions/classnames";
import { IconItemListFilesFooterEditor } from "./icon";
import { ContentItemListFilesFooterEditor } from "./content";
import { deleteMutationApi } from "./hooks/delete-mutation-api";
import { CONFIG } from "@/config";

export interface ItemListFilesFooterEditorProps
  extends Omit<FileStateEditor, "file"> {
  editor: Editor;
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
  file?: File;
}

export const ItemListFilesFooterEditor = ({
  data,
  editor,
  error,
  file,
  id,
  isLoading,
  setFiles
}: ItemListFilesFooterEditorProps) => {
  const t = useTranslations("core.editor.files");
  const tCore = useTranslations("core");

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
          alt={data?.file_alt ?? data?.file_name ?? file?.name ?? ""}
          src={
            data && data.width && data.height
              ? `${CONFIG.backend_public_url}/${data.dir_folder}/${data.file_name}`
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

      {!error && !isLoading && data && (
        <div className="flex gap-1 items-center flex-wrap flex-shrink-0">
          <Button
            variant="ghost"
            onClick={() => {
              editor.commands.insertFile({
                ...data,
                file_alt: data.file_alt ?? "",
                width: data.width ?? 0,
                height: data.height ?? 0,
                id
              });
              editor.commands.focus();
            }}
          >
            <Plus /> {t("insert")}
          </Button>
          <Button
            size="icon"
            variant="destructiveGhost"
            ariaLabel="Delete"
            onClick={async () => {
              const nodes: Node[] = [];
              editor.state.tr.doc.descendants(node => {
                if (node.type.name === "files" && node.attrs.id === id) {
                  nodes.push(node);
                }
              });

              editor.commands.forEach(
                nodes.map(item => item.attrs.id),
                (id, { commands, tr }) => {
                  const item = findChildren(tr.doc, node => {
                    return node.type.name === "files" && id === node.attrs.id;
                  })?.[0];

                  if (!item) {
                    return true;
                  }

                  return commands.deleteRange({
                    from: item.pos,
                    to: item.pos + item.node.nodeSize
                  });
                }
              );

              setFiles(prev => prev.filter(item => item.id !== id));
              const mutation = await deleteMutationApi({
                id,
                securityKey: data?.security_key
              });
              if (mutation.error) {
                toast.error(tCore("errors.title"), {
                  description: tCore("errors.internal_server_error")
                });
              }
            }}
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </>
  );
};
