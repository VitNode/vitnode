import { useTranslations } from "next-intl";
import { formatBytes } from "@vitnode/shared";

import { ItemListFilesFooterEditorProps } from "./item";

export const ContentItemListFilesFooterEditor = ({
  data,
  error,
  file,
  isLoading,
}: Omit<ItemListFilesFooterEditorProps, "editor" | "id" | "setFiles">) => {
  const t = useTranslations("core.editor.files");

  if (isLoading) {
    return t("state.loading");
  }

  if (error) {
    return (
      <span className="text-destructive">{t("state.error", { error })}</span>
    );
  }

  return (
    <>
      <span>{formatBytes(file?.size ?? data?.file_size ?? 0)}</span>
      <span>&middot;</span>
      <span>{file?.type ?? data?.mimetype ?? "Error!"}</span>
      {data?.width && data?.height && (
        <>
          <span>&middot;</span>
          <span>
            {data.width}x{data.height}
          </span>
        </>
      )}
    </>
  );
};
