import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { JSONContent } from "@tiptap/react";

import { CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/functions/classnames";
import { IconItemListFilesFooterEditor } from "./icon";
import { ContentItemListFilesFooterEditor } from "./content";
import { deleteMutationApi } from "./hooks/delete-mutation-api";
import { FileStateEditor } from "@/components/editor/extensions/files/files";
import { useEditorState } from "@/components/editor/hooks/use-editor-state";
import { TextLanguage } from "@/graphql/hooks";

export interface ItemListFilesFooterEditorProps
  extends Omit<FileStateEditor, "file"> {
  file?: File;
}

export const ItemListFilesFooterEditor = ({
  data,
  error,
  file,
  id,
  isLoading
}: ItemListFilesFooterEditorProps) => {
  const t = useTranslations("core.editor.files");
  const tCore = useTranslations("core");
  const { editor, onChange, selectedLanguage, setFiles, value } =
    useEditorState();

  const handleDelete = ({
    content,
    file_id
  }: {
    content: string;
    file_id: number;
  }): string => {
    const parseValue: { content: JSONContent[]; type: string } =
      JSON.parse(content);

    const mapContent = (values: JSONContent[]): JSONContent[] => {
      return values.filter(value => {
        if (value.type === "files" && value.attrs?.id === file_id) {
          return false;
        }
        if (value.content) {
          value.content = mapContent(value.content);
        }

        return true;
      });
    };

    const valueReturn = {
      ...parseValue,
      content: mapContent(parseValue.content)
    };

    return JSON.stringify(valueReturn);
  };

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
            data?.width && data.height
              ? `${CONFIG.graphql_public_url}/${data.dir_folder}/${data.file_name}`
              : null
          }
        />
      </div>

      <div className="flex-1 min-w-0 md:truncate break-words">
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
                security_key: data.security_key ?? "",
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
            ariaLabel={tCore("delete")}
            onClick={async () => {
              // Remove files from the editor
              if (Array.isArray(value)) {
                const content: TextLanguage[] = value.map(item => ({
                  language_code: item.language_code,
                  value: handleDelete({
                    content: item.value,
                    file_id: id
                  })
                }));

                onChange(content);

                const parseContent = JSON.parse(
                  content.find(item => item.language_code === selectedLanguage)
                    ?.value ?? ""
                );

                editor.commands.clearContent();
                editor.commands.setContent(parseContent);
              } else {
                const content = handleDelete({
                  content: value,
                  file_id: id
                });

                onChange(content);
              }

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
